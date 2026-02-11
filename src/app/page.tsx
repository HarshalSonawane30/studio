'use client';

import { useMemo } from 'react';
import { useCollection, useFirestore } from '@/firebase';
import { CreatePost } from '@/components/create-post';
import { PostCard } from '@/components/post-card';
import { collection, query, orderBy } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

type Post = {
  id: string;
  content: string;
  createdAt: { seconds: number, nanoseconds: number };
  imageUrl?: string;
  imageHint?: string;
  likesCount: number;
  commentsCount: number;
  userId: string;
  embeddedUser: string;
};

function FeedSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="space-y-4 rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
      </div>
      <Skeleton className="aspect-square h-auto w-full" />
    </div>
  )
}

export default function HomePage() {
  const firestore = useFirestore();
  const postsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'posts'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: posts, loading } = useCollection<Post>(postsQuery);

  return (
    <div className="mx-auto max-w-3xl p-4 md:p-6">
      <main className="space-y-6">
        <CreatePost />
        {loading ? (
          <FeedSkeleton />
        ) : (
          <div className="space-y-6">
            {posts && posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
         {!loading && posts?.length === 0 && (
            <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 text-center">
                <h3 className="text-xl font-semibold">Welcome to your feed!</h3>
                <p className="text-muted-foreground">There are no posts to show right now.</p>
                <p className="text-muted-foreground">Be the first to share something with the community.</p>
            </div>
        )}
      </main>
    </div>
  );
}
