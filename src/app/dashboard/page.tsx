'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BarChart, Calendar, Briefcase } from 'lucide-react';
import { PersonalizedRecommendations } from '@/components/personalized-recommendations';
import { useUser, useDoc } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';

const widgets = [
    { title: "Upcoming Sessions", description: "View your scheduled learning and teaching sessions.", icon: <Calendar/>, href:"/dashboard/sessions" },
    { title: "Skill Progress", description: "Track your analytics and progress on assessments.", icon: <BarChart/>, href:"/dashboard/progress" },
    { title: "My Skills", description: "Manage your skills and take new assessments.", icon: <Briefcase/>, href:"/assessments" },
];

function DashboardHeader({ name, loading }: { name?: string; loading: boolean }) {
  if (loading) {
    return (
      <header className="space-y-2">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-5 w-full max-w-lg" />
      </header>
    );
  }

  return (
      <header>
        <h1 className="font-headline text-3xl font-bold">Welcome, {name || 'User'}!</h1>
        <p className="text-muted-foreground">
          This is your personal workspace. Track your progress, manage sessions, and stay productive.
        </p>
      </header>
  );
}


export default function DashboardPage() {
  const { user: authUser, loading: authLoading } = useUser();
  const userProfilePath = authUser ? `users/${authUser.uid}` : undefined;
  const { data: userProfile, loading: profileLoading } = useDoc<any>(userProfilePath);
  
  const isLoading = authLoading || (authUser && profileLoading);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader name={userProfile?.displayName} loading={isLoading} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PersonalizedRecommendations />
        
        {widgets.map(widget => (
             <Card key={widget.title}>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="font-headline text-lg">{widget.title}</CardTitle>
                        <CardDescription>{widget.description}</CardDescription>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        {widget.icon}
                    </div>
                </CardHeader>
                <CardContent>
                    <Button asChild variant="outline">
                        <Link href={widget.href}>View</Link>
                    </Button>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
