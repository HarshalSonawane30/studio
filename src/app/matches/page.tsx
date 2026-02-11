'use client';

import { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake, Zap } from "lucide-react";
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser, useDoc, useCollection, useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';
import { intelligentMatching, IntelligentMatchingInput } from '@/ai/flows/intelligent-matching';
import { useToast } from '@/hooks/use-toast';

// Define the type for the match result
type Match = {
  user: any; // user object from firestore
  matchScore: number;
  rationale: string;
};

export default function MatchesPage() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user: authUser, loading: authLoading } = useUser();
  const userProfilePath = authUser ? `users/${authUser.uid}` : undefined;
  
  // Fetch current user's full profile
  const { data: currentUserProfile, loading: profileLoading } = useDoc<any>(userProfilePath);
  
  // Fetch all users on the platform
  const usersCollection = useMemo(() => firestore ? collection(firestore, 'users') : null, [firestore]);
  const { data: allUsers, loading: usersLoading } = useCollection<any>(usersCollection);

  const [matches, setMatches] = useState<Match[]>([]);
  const [isMatching, setIsMatching] = useState(false);

  const handleStartMatching = async () => {
    if (!currentUserProfile || !allUsers || allUsers.length < 2) {
      toast({
        variant: 'destructive',
        title: 'Not enough data',
        description: 'We need more information or more users on the platform to find matches.',
      });
      return;
    }

    setIsMatching(true);
    setMatches([]); // Clear previous matches

    try {
      // Prepare the input for the AI flow
      const otherUserProfiles = allUsers
        .filter(user => user.id !== currentUserProfile.id)
        .map(user => ({
          userId: user.id,
          skills: user.skills || [],
          interests: user.interests || [],
        }));

      const input: IntelligentMatchingInput = {
        userProfile: {
          skills: currentUserProfile.skills || [],
          interests: currentUserProfile.interests || [],
          // desiredSkills is optional, can add later
        },
        otherUserProfiles: otherUserProfiles,
      };

      const aiMatches = await intelligentMatching(input);

      // Map AI results back to full user profiles
      const populatedMatches = aiMatches.map(match => {
        const user = allUsers.find(u => u.id === match.userId);
        return { user, ...match };
      }).filter(match => match.user); // Filter out any matches where user wasn't found

      setMatches(populatedMatches as Match[]);

      if (populatedMatches.length === 0) {
        toast({
            title: 'No strong matches found',
            description: 'We couldn\'t find any strong matches for you right now. Try updating your profile skills and interests!',
        });
      }

    } catch (error) {
      console.error('Error during intelligent matching:', error);
      toast({
        variant: 'destructive',
        title: 'Matching Failed',
        description: 'An error occurred while trying to find your matches. Please try again.',
      });
    } finally {
      setIsMatching(false);
    }
  };

  const isLoading = authLoading || profileLoading || usersLoading;

  return (
    <div className="p-4 md:p-6">
      <header className="mb-6">
        <h1 className="font-headline text-2xl font-bold md:text-3xl">Intelligent Matching</h1>
        <p className="text-muted-foreground">Let our AI find the best collaborators, mentors, and peers for you.</p>
      </header>
      
      <Card className="mb-6 bg-gradient-to-r from-primary/80 to-primary text-primary-foreground">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Find Your Perfect Match</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Click the button to have our AI analyze your profile against the community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button size="lg" variant="secondary" className="text-primary hover:bg-secondary/90" onClick={handleStartMatching} disabled={isMatching || isLoading}>
            {isMatching ? 'Analyzing...' : (
              <>
                <Zap className="mr-2" />
                Start Matching Process
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="font-headline text-xl font-bold">Your Top Matches</h2>
        <p className="text-muted-foreground mb-4">Results from our AI based on your profile.</p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isMatching && (
            <>
              <MatchCardSkeleton />
              <MatchCardSkeleton />
              <MatchCardSkeleton />
            </>
          )}

          {!isMatching && matches.length > 0 && matches.map((match, index) => (
            <MatchCard key={index} match={match} />
          ))}

          {!isMatching && matches.length === 0 && (
             <Card className="md:col-span-3 flex items-center justify-center h-64 border-2 border-dashed">
                <div className="text-center">
                    <p className="text-lg font-medium text-muted-foreground">Your AI matches will appear here.</p>
                    <p className="text-sm text-muted-foreground">Click the "Start Matching Process" button to begin.</p>
                </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}


function MatchCard({ match }: { match: Match }) {
  if (!match.user) {
    return null;
  }
  return (
      <Card className="flex flex-col">
        <CardHeader className="flex flex-row items-center gap-4">
          <Image
            src={match.user.profilePictureUrl || `https://picsum.photos/seed/${match.user.id}/64/64`}
            alt={match.user.displayName}
            width={64}
            height={64}
            className="rounded-full border-2 border-primary"
            data-ai-hint="person face"
          />
          <div>
            <CardTitle className="font-headline text-lg">{match.user.displayName}</CardTitle>
            <CardDescription>{match.user.title || 'Community Member'}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-1 space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-muted p-3">
            <span className="font-semibold">Match Score</span>
            <Badge className="bg-accent text-accent-foreground text-base">
              {Math.round(match.matchScore * 100)}%
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground italic">"{match.rationale}"</p>
          <Separator />
           <div>
              <h4 className="mb-2 text-sm font-semibold">Shared Interests</h4>
              <div className="flex flex-wrap gap-2">
                  {match.user.interests?.slice(0, 3).map((interest: string) => <Badge key={interest} variant="outline">{interest}</Badge>)}
              </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Handshake className="mr-2" />
            Connect
          </Button>
        </CardFooter>
      </Card>
  )
}

function MatchCardSkeleton() {
  return (
    <Card>
       <CardHeader className="flex flex-row items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
         <div className="space-y-2">
           <Skeleton className="h-5 w-32" />
           <Skeleton className="h-4 w-40" />
         </div>
       </CardHeader>
       <CardContent className="space-y-4">
         <div className="flex items-center justify-between rounded-lg bg-muted p-3">
           <Skeleton className="h-5 w-24" />
           <Skeleton className="h-7 w-16 rounded-full" />
         </div>
         <Skeleton className="h-4 w-full" />
         <Skeleton className="h-4 w-5/6" />
         <Separator />
         <div className="space-y-2">
             <Skeleton className="h-4 w-20" />
             <div className="flex flex-wrap gap-2">
                 <Skeleton className="h-6 w-16 rounded-full" />
                 <Skeleton className="h-6 w-20 rounded-full" />
             </div>
         </div>
       </CardContent>
       <CardFooter>
         <Skeleton className="h-10 w-full" />
       </CardFooter>
     </Card>
  )
}
