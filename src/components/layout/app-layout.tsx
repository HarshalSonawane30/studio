'use client';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  MessageSquare,
  Search,
  Users,
  FileCheck,
  User as UserIcon,
} from 'lucide-react';
import Logo from '@/components/logo';
import { MainHeader } from './header';
import { FirebaseClientProvider, useUser } from '@/firebase';

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/discover', icon: Search, label: 'Discover' },
  { href: '/matches', icon: Users, label: 'Matches' },
  { href: '/chat', icon: MessageSquare, label: 'Chat' },
  { href: '/assessments', icon: FileCheck, label: 'Assessments' },
  { href: '/profile', icon: UserIcon, label: 'Profile' },
];

function AuthGatedLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ['/login', '/signup'];
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthenticated = !!user;

  useEffect(() => {
    if (loading) return; // Wait for auth state

    if (!isAuthenticated && !isPublicRoute) {
      router.push('/login');
    }
    if (isAuthenticated && isPublicRoute) {
      router.push('/');
    }
  }, [isAuthenticated, isPublicRoute, loading, router]);

  // While loading, or if a redirect is imminent, show nothing to prevent flicker.
  if (loading || (!isAuthenticated && !isPublicRoute) || (isAuthenticated && isPublicRoute)) {
    return null; // Or a global loader
  }

  // If it's a public route, it means user is not authenticated. Render page without layout.
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // If we reach here, user is authenticated and on a private route. Render the full layout.
  return (
    <SidebarProvider>
      <Sidebar side="left" variant="sidebar" collapsible="icon">
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <MainHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}


export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <FirebaseClientProvider>
      <AuthGatedLayout>{children}</AuthGatedLayout>
    </FirebaseClientProvider>
  )
}
