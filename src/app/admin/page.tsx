'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  FileText,
  Flag,
  Server,
  TrendingUp,
  Users,
  Briefcase,
} from 'lucide-react';
import Link from 'next/link';

const adminWidgets = [
  {
    title: 'Users',
    description: 'Manage and search for users.',
    icon: <Users />,
    href: '/admin/users',
  },
  {
    title: 'Content',
    description: 'Moderate posts and comments.',
    icon: <FileText />,
    href: '/admin/content',
  },
  {
    title: 'Analytics',
    description: 'Deep dive into platform analytics.',
    icon: <BarChart />,
    href: '/admin/analytics',
  },
  {
    title: 'Skills & Assessments',
    description: 'Manage skills and assessments.',
    icon: <Briefcase />,
    href: '/admin/skills',
  },
  {
    title: 'Engagement',
    description: 'Track user interaction metrics.',
    icon: <TrendingUp />,
    href: '/admin/engagement',
  },
  {
    title: 'Reports',
    description: 'Review user-submitted reports.',
    icon: <Flag />,
    href: '/admin/reports',
  },
  {
    title: 'System Health',
    description: 'Monitor API and server status.',
    icon: <Server />,
    href: '/admin/system',
  },
];

export default function AdminOverviewPage() {
  return (
    <>
      <header className="mb-6">
        <h1 className="font-headline text-3xl font-bold">Admin Overview</h1>
        <p className="text-muted-foreground">
          Welcome, Admin. Here's a high-level overview of the platform.
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
    </>
  );
}
