import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { users } from '@/lib/data';
import { BarChart, BookOpen, Calendar, MessageSquare, Briefcase } from 'lucide-react';

const widgets = [
    { title: "Upcoming Sessions", description: "View your scheduled learning and teaching sessions.", icon: <Calendar/>, href:"/dashboard/sessions" },
    { title: "Skill Progress", description: "Track your analytics and progress on assessments.", icon: <BarChart/>, href:"/dashboard/progress" },
    { title: "Saved Posts", description: "Revisit articles and resources you've saved.", icon: <BookOpen/>, href:"/dashboard/saved" },
    { title: "Inbox", description: "Manage your conversations and messages.", icon: <MessageSquare/>, href:"/chat" },
    { title: "My Skills", description: "Manage your skills and take new assessments.", icon: <Briefcase/>, href:"/assessments" },
]

export default function DashboardPage() {
  const user = users[0];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <header>
        <h1 className="font-headline text-3xl font-bold">Welcome, {user.name}!</h1>
        <p className="text-muted-foreground">
          This is your personal workspace. Track your progress, manage sessions, and stay productive.
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
