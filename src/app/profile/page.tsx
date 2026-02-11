'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser, useDoc } from '@/firebase';
import { Mail, Pencil, Briefcase, Sparkles, BookOpen, UserPlus, FileText } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import Link from 'next/link';

type UserProfileData = {
  id: string;
  username: string;
  email: string;
  role: string;
  displayName: string;
  profilePictureUrl?: string;
  bio?: string;
  skills: string[];
  interests: string[];
};

function ProfileSkeleton() {
    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-6">
            <Card>
                <CardHeader className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
                    <Skeleton className="h-28 w-28 rounded-full border-4 border-primary" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-8 w-48 mx-auto md:mx-0" />
                        <Skeleton className="h-6 w-32 mx-auto md:mx-0" />
                        <Skeleton className="h-4 w-full max-w-lg mt-2 mx-auto md:mx-0" />
                        <Skeleton className="h-4 w-full max-w-md mx-auto md:mx-0" />
                    </div>
                    <Skeleton className="h-10 w-32" />
                </CardHeader>
            </Card>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-7 w-32" />
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            <Skeleton className="h-8 w-20" />
                            <Skeleton className="h-8 w-24" />
                            <Skeleton className="h-8 w-16" />
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                         <CardHeader>
                            <Skeleton className="h-7 w-32" />
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            <Skeleton className="h-8 w-20" />
                            <Skeleton className="h-8 w-24" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}


export default function ProfilePage() {
  const { user: authUser, loading: authLoading } = useUser();
  const userPath = authUser ? `users/${authUser.uid}` : undefined;
  const { data: userProfile, loading: profileLoading } = useDoc<UserProfileData>(userPath as string);

  const isLoading = authLoading || (userPath && profileLoading);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (!authUser || !userProfile) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center p-4 text-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Profile Not Found</CardTitle>
            <CardDescription>
              Please log in to view your profile. If you've just signed up, your profile is being created.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/login">Go to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-col items-center gap-6 p-6 text-center md:flex-row md:text-left">
          <Avatar className="h-28 w-28 border-4 border-primary">
            <AvatarImage src={userProfile.profilePictureUrl || undefined} alt={userProfile.displayName} />
            <AvatarFallback className="text-4xl">{userProfile.displayName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="font-headline text-2xl font-bold md:text-4xl">{userProfile.displayName}</h1>
            <p className="text-lg text-muted-foreground">@{userProfile.username}</p>
            <p className="mt-3 max-w-prose text-muted-foreground">{userProfile.bio || 'This user has not set a bio yet.'}</p>
          </div>
          <div className="flex flex-col gap-2">
             <Button>
                <Pencil className="mr-2" /> Edit Profile
            </Button>
             <Button variant="outline">
                <UserPlus className="mr-2" /> Share Profile
            </Button>
          </div>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <Tabs defaultValue="skills" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="skills"><Briefcase className="mr-2"/> Skills</TabsTrigger>
                    <TabsTrigger value="certificates"><FileText className="mr-2"/> Certificates</TabsTrigger>
                    <TabsTrigger value="posts"><BookOpen className="mr-2"/> Posts</TabsTrigger>
                </TabsList>
                <TabsContent value="skills">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Skills</CardTitle>
                            <CardDescription>Skills this user has listed on their profile.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {userProfile.skills && userProfile.skills.length > 0 ? (
                                userProfile.skills.map((skill) => (
                                <Badge key={skill} className="px-3 py-1 text-sm">{skill}</Badge>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">No skills listed yet.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="certificates">
                     <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Certificates</CardTitle>
                            <CardDescription>Official verifications and certificates earned.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">No certificates to show yet.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="posts">
                     <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Posts</CardTitle>
                            <CardDescription>Recent activity and posts from this user.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">No posts from this user yet.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>

        <div className="space-y-6 lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center"><Sparkles className="mr-2 text-primary" /> Interests</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {userProfile.interests && userProfile.interests.length > 0 ? (
                        userProfile.interests.map((interest) => (
                        <Badge key={interest} variant="secondary" className="px-3 py-1 text-sm">{interest}</Badge>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground">No interests listed yet.</p>
                    )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center"><Mail className="mr-2 text-primary"/> Contact</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button className="w-full">Contact {userProfile.displayName}</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
