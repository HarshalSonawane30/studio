'use client';
import { useEffect, useState, useMemo } from 'react';
import { BarChart, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useCollection, useFirestore } from '@/firebase';
import { format, parseISO } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { collection } from 'firebase/firestore';

// Type definition for the analytics events coming from Firestore
type AnalyticsEvent = {
  id: string;
  eventType: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
  userId: string;
};

export default function AdminAnalyticsPage() {
  const firestore = useFirestore();
  const eventsQuery = useMemo(() => {
    if (!firestore) return null;
    return collection(firestore, 'analyticsEvents');
  }, [firestore]);

  // Use the real-time collection hook to get live analytics events
  const { data: events, loading } = useCollection<AnalyticsEvent>(eventsQuery);

  const [userGrowthData, setUserGrowthData] = useState<any[]>([]);
  const [engagementData, setEngagementData] = useState<any[]>([]);

  useEffect(() => {
    if (events && events.length > 0) {
      // --- Process User Growth Data (Logins per day) ---
      const loginsPerDay = events
        .filter(e => e.eventType === 'user_login' && e.timestamp)
        .reduce((acc, event) => {
          const day = format(new Date(event.timestamp.seconds * 1000), 'yyyy-MM-dd');
          acc[day] = (acc[day] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

      const formattedUserGrowth = Object.entries(loginsPerDay)
        .map(([date, count]) => ({
          name: format(parseISO(date), 'MMM d'),
          users: count,
          date: date,
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      setUserGrowthData(formattedUserGrowth);

      // --- Process Engagement Data (Likes and Comments per day) ---
      const engagementPerDay = events
        .filter(e => (e.eventType === 'post_like' || e.eventType === 'comment_create') && e.timestamp)
        .reduce((acc, event) => {
            const day = format(new Date(event.timestamp.seconds * 1000), 'yyyy-MM-dd');
            if (!acc[day]) {
                acc[day] = { name: format(parseISO(day), 'MMM d'), date: day, likes: 0, comments: 0 };
            }
            if (event.eventType === 'post_like') {
                acc[day].likes += 1;
            }
            // Future-proofing for when comment tracking is added
            else if (event.eventType === 'comment_create') {
                acc[day].comments += 1;
            }
            return acc;
        }, {} as Record<string, {name: string, date: string, likes: number, comments: number}>);

      const formattedEngagement = Object.values(engagementPerDay)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      setEngagementData(formattedEngagement);
    }
  }, [events]);

  // Helper function to render charts with loading and empty states
  const renderChart = (loading: boolean, data: any[], chart: React.ReactNode) => {
    if (loading) {
      return <Skeleton className="h-[300px] w-full" />;
    }
    if (data.length === 0) {
      return (
        <div className="flex h-[300px] w-full items-center justify-center rounded-lg bg-muted">
          <p className="text-center text-muted-foreground">
            No data to display yet.
            <br />
            Log in or like a post to see events in real-time.
          </p>
        </div>
      );
    }
    return (
      <ResponsiveContainer width="100%" height={300}>
        {chart}
      </ResponsiveContainer>
    );
  };

  return (
    <div className="p-4 md:p-6 grid gap-6 grid-cols-1 lg:grid-cols-2">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>User Activity</CardTitle>
          <CardDescription>Logins per day. This chart will update in real-time.</CardDescription>
        </CardHeader>
        <CardContent>
          {renderChart(loading, userGrowthData,
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" name="New Logins" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
            </LineChart>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Engagement Rate</CardTitle>
           <CardDescription>Daily likes and comments. This chart will update in real-time.</CardDescription>
        </CardHeader>
        <CardContent>
          {renderChart(loading, engagementData,
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="likes" fill="hsl(var(--primary))" />
              <Bar dataKey="comments" fill="hsl(var(--secondary))" />
            </BarChart>
          )}
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
