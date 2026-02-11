'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminEngagementPage() {
  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Engagement Metrics</CardTitle>
          <CardDescription>
            Detailed view of user engagement trends. This page is under construction.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Top creators, likes per day, and more will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
