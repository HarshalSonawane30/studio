import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake, Zap } from "lucide-react";
import Image from 'next/image';
import { users } from '@/lib/data';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const mockMatches = [
  { user: users[1], score: 0.92, rationale: "Strong skill overlap in design and shared interest in EdTech. Great for collaborative projects." },
  { user: users[4], score: 0.85, rationale: "Complementary skills in development and project management. Potential for a great mentor/mentee relationship." },
];

export default function MatchesPage() {
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
            Answer a few questions about your goals, and we'll connect you with the right people.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button size="lg" variant="secondary" className="text-primary hover:bg-secondary/90">
            <Zap className="mr-2" />
            Start Matching Process
          </Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="font-headline text-xl font-bold">Your Top Matches</h2>
        <p className="text-muted-foreground mb-4">Based on your profile and goals.</p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockMatches.map((match, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4">
                <Image
                  src={match.user.avatarUrl}
                  alt={match.user.name}
                  width={64}
                  height={64}
                  className="rounded-full border-2 border-primary"
                  data-ai-hint={match.user.imageHint}
                />
                <div>
                  <CardTitle className="font-headline text-lg">{match.user.name}</CardTitle>
                  <CardDescription>{match.user.title}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                  <span className="font-semibold">Match Score</span>
                  <Badge className="bg-accent text-accent-foreground text-base">
                    {Math.round(match.score * 100)}%
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground italic">"{match.rationale}"</p>
                <Separator />
                 <div>
                    <h4 className="mb-2 text-sm font-semibold">Shared Interests</h4>
                    <div className="flex flex-wrap gap-2">
                        {match.user.interests.map(interest => <Badge key={interest} variant="outline">{interest}</Badge>)}
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
          ))}
          {/* Skeleton Loader */}
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
        </div>
      </div>
    </div>
  );
}
