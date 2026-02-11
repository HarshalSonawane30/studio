'use client';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { users } from "@/lib/data";
import { useAuth, useFirestore } from "@/firebase";
import { trackEvent } from "@/lib/analytics";

export const PostCard = ({ post }: { post: any }) => {
  const user = users.find(u => u.id === post.userId);
  const firestore = useFirestore();
  const auth = useAuth();

  const handleLike = () => {
    if (!firestore || !auth) {
      console.log("Firestore or Auth not ready");
      return;
    }
    trackEvent(firestore, auth, 'post_like', { postId: post.id, authorId: post.userId });
  };

  if (!user) {
    return null;
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Link href={`/profile/${user.id}`} className="font-semibold hover:underline">{user.name}</Link>
          <p className="text-sm text-muted-foreground">{user.title}</p>
          <p className="text-xs text-muted-foreground">{post.createdAt}</p>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="mb-4 whitespace-pre-wrap">{post.content}</p>
        {post.imageUrl && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
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
