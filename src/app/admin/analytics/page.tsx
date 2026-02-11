'use client';
import { BarChart, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const userGrowthData = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 300 },
  { name: 'Mar', users: 500 },
  { name: 'Apr', users: 700 },
  { name: 'May', users: 600 },
  { name: 'Jun', users: 800 },
];

const engagementData = [
  { name: 'Week 1', likes: 1200, comments: 400 },
  { name: 'Week 2', likes: 1500, comments: 500 },
  { name: 'Week 3', likes: 1100, comments: 350 },
  { name: 'Week 4', likes: 1800, comments: 600 },
];


export default function AdminAnalyticsPage() {
  return (
    <div className="p-4 md:p-6 grid gap-6 grid-cols-1 lg:grid-cols-2">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
          <CardDescription>Monthly new users.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Engagement Rate</CardTitle>
           <CardDescription>Weekly likes and comments.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
             <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="likes" fill="hsl(var(--primary))" />
                <Bar dataKey="comments" fill="hsl(var(--secondary))" />
              </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
        <Card>
        <CardHeader>
          <CardTitle>Skill Popularity</CardTitle>
          <CardDescription>Placeholder for skill usage heatmap.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px] bg-muted rounded-lg">
          <p className="text-muted-foreground">Heatmap Coming Soon</p>
        </CardContent>
      </Card>
    </div>
  );
}
