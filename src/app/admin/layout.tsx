'use client';

import { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LoginForm from '@/components/admin/login-form';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
  Bell,
  Home,
  Users,
  FileText,
  BarChart,
  TrendingUp,
  Flag,
  Server,
  Briefcase,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';


const adminNavItems = [
  { href: '/admin', icon: Home, label: 'Overview' },
  { href: '/admin/analytics', icon: BarChart, label: 'Analytics' },
  { href: '/admin/users', icon: Users, label: 'Users' },
  { href: '/admin/content', icon: FileText, label: 'Content' },
  { href: '/admin/skills', icon: Briefcase, label: 'Skills & Tests' },
  { href: '/admin/engagement', icon: TrendingUp, label: 'Engagement' },
  { href: '/admin/reports', icon: Flag, label: 'Reports' },
  { href: '/admin/system', icon: Server, label: 'System Health' },
];


function AdminSidebar() {
    const pathname = usePathname();

    const handleLogout = () => {
        sessionStorage.removeItem('admin_authenticated');
        window.location.reload();
    };

    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Logo />
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {adminNavItems.map(item => (
                             <Link
                                key={item.label}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                    pathname === item.href && "bg-muted text-primary"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="mt-auto p-4">
                     <Button size="sm" className="w-full" variant="outline" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    )
}

function AdminSkeleton() {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
        <Skeleton className="h-96 w-full max-w-sm" />
      </div>
    );
}


export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for auth status in session storage
    const authStatus = sessionStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = () => {
    sessionStorage.setItem('admin_authenticated', 'true');
    setIsAuthenticated(true);
     toast({
        title: 'Login Successful',
        description: 'Welcome to the Admin Panel.',
    });
  };

  if (loading) {
    return <AdminSkeleton />;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <AdminSidebar />
        <div className="flex flex-col">
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                <div className='flex-1'>
                    {/* Mobile nav trigger can go here */}
                </div>
                 <Button variant="ghost" size="icon" className="rounded-full">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Toggle notifications</span>
                </Button>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
              {children}
            </main>
        </div>
    </div>
  );
}
