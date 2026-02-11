'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, MessageCircle, Share2 } from "lucide-react";
import { useUser } from "@/firebase";
import { Skeleton } from "./ui/skeleton";

export const CreatePost = () => {
    const { user, loading } = useUser();

    if (loading) {
        return (
            <Card className="mb-6">
                <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <Skeleton className="h-12 flex-1 rounded-full" />
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (!user) {
        return null; // Don't show create post if not logged in
    }

    return (
        <Card className="mb-6">
            <CardContent className="p-4">
                <div className="flex items-center gap-4">
                     <Avatar>
                        <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                        <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <Input placeholder={`What's on your mind, ${user.displayName}?`} className="h-12 flex-1 rounded-full bg-muted" />
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
