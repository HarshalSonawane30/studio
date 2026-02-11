'use client';
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useAuth, useFirestore, useDoc } from "@/firebase";
import { trackEvent } from "@/lib/analytics";
import { formatDistanceToNow } from 'date-fns';

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

type EmbeddedUser = {
  uid: string;
  displayName: string;
  photoURL?: string;
};

export const PostCard = ({ post }: { post: Post }) => {
  const firestore = useFirestore();
  const auth = useAuth();
  const user: EmbeddedUser = useMemo(() => {
    try {
      return JSON.parse(post.embeddedUser);
    } catch (e) {
      console.error("Failed to parse embeddedUser", e);
      return { uid: post.userId, displayName: "Unknown User" };
    }
  }, [post.embeddedUser, post.userId]);
  
  const { data: authorProfile } = useDoc<any>(`users/${user.uid}`);

  const handleLike = () => {
    if (!firestore || !auth) {
      console.log("Firestore or Auth not ready");
      return;
    }
    trackEvent(firestore, auth, 'post_like', { postId: post.id, authorId: post.userId });
  };

  const formattedDate = post.createdAt
    ? formatDistanceToNow(new Date(post.createdAt.seconds * 1000), { addSuffix: true })
    : 'Just now';

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={user.photoURL} alt={user.displayName} />
          <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold hover:underline cursor-pointer">{user.displayName}</p>
          <p className="text-sm text-muted-foreground">{authorProfile?.title || 'Community Member'}</p>
          <p className="text-xs text-muted-foreground">{formattedDate}</p>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="mb-4 whitespace-pre-wrap">{post.content}</p>
        {post.imageUrl && (
          <div className="relative aspect-square w-full overflow-hidden rounded-lg">
            <Image
                src={post.imageUrl}
                alt="Post image"
                fill
                className="object-cover"
                data-ai-hint={post.imageHint}
              />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <div className="flex w-full items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Heart className="size-4" />
            {post.likesCount} Likes
          </div>
          <div>{post.commentsCount} Comments</div>
        </div>
         <div className="flex w-full border-t pt-2">
            <Button variant="ghost" className="w-full justify-center" onClick={handleLike}>
              <Heart className="mr-2" /> Like
            </Button>
            <Button variant="ghost" className="w-full justify-center">
              <MessageCircle className="mr-2" /> Comment
            </Button>
            <Button variant="ghost" className="w-full justify-center">
              <Share2 className="mr-2" /> Share
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
