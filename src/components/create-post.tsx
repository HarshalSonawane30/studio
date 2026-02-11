'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Video, Send } from "lucide-react";
import { useUser, useFirestore, useDoc } from "@/firebase";
import { Skeleton } from "./ui/skeleton";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export const CreatePost = () => {
    const { user: authUser, loading: userLoading } = useUser();
    const userProfilePath = authUser ? `users/${authUser.uid}` : undefined;
    const { data: userProfile, loading: profileLoading } = useDoc<any>(userProfilePath);
    const firestore = useFirestore();
    const { toast } = useToast();
    
    const [content, setContent] = useState('');
    const [isPosting, setIsPosting] = useState(false);

    const isLoading = userLoading || (authUser && profileLoading);

    const handlePost = async () => {
        if (!firestore || !authUser || !userProfile) return;
        if (!content.trim()) {
            toast({
                variant: 'destructive',
                title: 'Cannot create an empty post.',
            });
            return;
        }

        setIsPosting(true);
        try {
            const embeddedUser = {
                uid: authUser.uid,
                displayName: userProfile.displayName,
                photoURL: userProfile.profilePictureUrl || null,
            };

            await addDoc(collection(firestore, 'posts'), {
                userId: authUser.uid,
                content: content,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                likesCount: 0,
                commentsCount: 0,
                isPublic: true,
                embeddedUser: JSON.stringify(embeddedUser),
            });

            setContent('');
            toast({
                title: 'Post created!',
                description: 'Your post is now live on the feed.',
            });
        } catch (error) {
            console.error("Error creating post: ", error);
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem creating your post.',
            });
        } finally {
            setIsPosting(false);
        }
    };

    if (isLoading) {
        return (
            <Card className="mb-6">
                <CardContent className="p-4 space-y-4">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <Skeleton className="h-12 flex-1 rounded-lg" />
                    </div>
                    <div className="flex justify-end">
                        <Skeleton className="h-10 w-24" />
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (!authUser) {
        return null; // Don't show create post if not logged in
    }

    return (
        <Card className="mb-6">
            <CardContent className="p-4">
                <div className="flex items-start gap-4">
                     <Avatar>
                        <AvatarImage src={userProfile?.profilePictureUrl || undefined} alt={userProfile?.displayName || 'User'} />
                        <AvatarFallback>{userProfile?.displayName?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <Textarea 
                        placeholder={`What's on your mind, ${userProfile?.displayName}?`} 
                        className="flex-1 rounded-lg bg-muted border-none focus-visible:ring-2 focus-visible:ring-ring" 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        disabled={isPosting}
                    />
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <div className="flex gap-1">
                        <Button variant="ghost" size="icon" disabled={isPosting}>
                            <ImageIcon className="text-blue-500"/>
                        </Button>
                        <Button variant="ghost" size="icon" disabled={isPosting}>
                            <Video className="text-green-500"/>
                        </Button>
                    </div>
                    <Button onClick={handlePost} disabled={isPosting || !content.trim()}>
                        {isPosting ? 'Posting...' : 'Post'}
                        <Send className="ml-2" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
