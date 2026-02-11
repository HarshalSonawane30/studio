'use client';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  const user = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ['/login', '/signup'];

  if (!user && !publicRoutes.includes(pathname)) {
    if (typeof window !== 'undefined') {
        router.push('/login');
    }
    return null; 
  }
  
  if (user && publicRoutes.includes(pathname)) {
     if (typeof window !== 'undefined') {
        router.push('/');
    }
    return null;
  }

  if (publicRoutes.includes(pathname)) {
    return <>{children}</>;
  }


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
