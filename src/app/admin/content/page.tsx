'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const reportedPosts = [
  { id: 'post-3', user: 'David Chen', reason: 'Spam', date: '2d ago' },
  { id: 'post-1', user: 'Samantha Lee', reason: 'Inappropriate Content', date: '4h ago' },
];

export default function AdminContentPage() {
  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Content Moderation</CardTitle>
          <CardDescription>
            Review and take action on reported posts and comments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Post ID</TableHead>
                <TableHead>Reported By</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportedPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-mono">{post.id}</TableCell>
                  <TableCell>{post.user}</TableCell>
                  <TableCell>
                    <Badge variant="destructive">{post.reason}</Badge>
                  </TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="mr-2">Review</Button>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
