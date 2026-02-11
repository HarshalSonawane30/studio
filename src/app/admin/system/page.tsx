'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminSystemPage() {
  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
          <CardDescription>
            Monitor server uptime, API latency, and error logs. This page is under construction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Real-time system metrics will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
