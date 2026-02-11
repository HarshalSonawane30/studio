'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminReportsPage() {
  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Abuse Reports</CardTitle>
          <CardDescription>
            Review user-submitted reports and automated moderation alerts. This page is under construction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">A table of flagged users and content will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
