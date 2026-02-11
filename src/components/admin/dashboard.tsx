'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Users, FileText } from 'lucide-react';
import Link from 'next/link';

const adminWidgets = [
  {
    title: 'User Management',
    description: 'View and manage platform users.',
    icon: <Users />,
    href: '/admin/users',
  },
  {
    title: 'Content Moderation',
    description: 'Review and moderate reported content.',
    icon: <FileText />,
    href: '/admin/content',
  },
  {
    title: 'Platform Analytics',
    description: 'Analyze user engagement and growth metrics.',
    icon: <BarChart />,
    href: '/admin/analytics',
  },
];

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-0">
      <header className="mb-6">
        <h1 className="font-headline text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome, Admin. Here's an overview of the platform.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {adminWidgets.map((widget) => (
          <Card key={widget.title} className="transition-all hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="font-headline text-lg">
                  {widget.title}
                </CardTitle>
                <CardDescription>{widget.description}</CardDescription>
              </div>
              <div className="rounded-lg bg-primary/10 p-3 text-primary">
                {widget.icon}
              </div>
            </CardHeader>
            <CardContent>
               <Button asChild variant="outline">
                  <Link href={widget.href}>Manage</Link>
                </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
