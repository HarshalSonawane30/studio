import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, MoreHorizontal, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { users, posts } from "@/lib/data";

const PostCard = ({ post }: { post: any }) => {
  const user = users.find(u => u.id === post.userId);

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
            <Button variant="ghost" className="w-full justify-center">
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


const CreatePost = () => {
    const currentUser = users[0];
    return (
        <Card className="mb-6">
            <CardContent className="p-4">
                <div className="flex items-center gap-4">
                     <Avatar>
                        <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Input placeholder="Start a post..." className="h-12 flex-1 rounded-full bg-muted" />
                </div>
                <div className="mt-4 flex justify-around">
                    <Button variant="ghost" className="flex-1">
                        <ImageIcon className="mr-2 text-blue-500"/>
                        Photo
                    </Button>
                    <Button variant="ghost" className="flex-1">
                        <Share2 className="mr-2 text-green-500"/>
                        Video
                    </Button>
                     <Button variant="ghost" className="flex-1">
                        <MessageCircle className="mr-2 text-yellow-500"/>
                        Event
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <aside className="hidden lg:block lg:col-span-1">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Welcome, {users[0].name}!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Expand your network and showcase your skills.</p>
                     <Button asChild className="mt-4 w-full">
                        <Link href="/profile">View Profile</Link>
                    </Button>
                </CardContent>
            </Card>
        </aside>

      <main className="col-span-1 lg:col-span-3 space-y-6">
        <CreatePost />
        <div className="space-y-6">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
      </main>
    </div>
  );
}
