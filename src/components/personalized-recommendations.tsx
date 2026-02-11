'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser, useDoc } from '@/firebase';
import { getPersonalizedLearningRecommendations, PersonalizedLearningRecommendationsInput } from '@/ai/flows/personalized-learning-recommendations';
import { Skeleton } from "@/components/ui/skeleton";
import { Lightbulb, BookOpen } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

export function PersonalizedRecommendations() {
  const { toast } = useToast();
  const { user: authUser, loading: authLoading } = useUser();
  const userProfilePath = authUser ? `users/${authUser.uid}` : undefined;
  const { data: userProfile, loading: profileLoading } = useDoc<any>(userProfilePath);

  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGetRecommendations = async () => {
    if (!userProfile) {
      toast({
        variant: 'destructive',
        title: 'Profile not loaded',
        description: 'Please wait for your profile to load before getting recommendations.',
      });
      return;
    }
    
    setIsGenerating(true);
    setRecommendations([]);

    try {
      const input: PersonalizedLearningRecommendationsInput = {
        userSkills: userProfile.skills || [],
        userInterests: userProfile.interests || [],
        learningGoals: 'I want to expand my current skillset, find complementary skills for my career, and explore new, emerging technologies.'
      };

      const result = await getPersonalizedLearningRecommendations(input);
      setRecommendations(result.recommendedLearningPaths);
      setHasGenerated(true);

    } catch (error) {
      console.error('Error getting learning recommendations:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'An error occurred while generating your learning paths. Please try again.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const isLoading = authLoading || profileLoading;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="font-headline text-lg flex items-center">
              <Lightbulb className="mr-2 text-primary" />
              AI Learning Paths
            </CardTitle>
            <CardDescription>Personalized recommendations based on your profile.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ) : isGenerating ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Analyzing your profile and finding the best learning paths for you...</p>
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-4/5" />
            </div>
        ) : recommendations.length > 0 ? (
          <ul className="space-y-2">
            {recommendations.map((path, index) => (
              <li key={index} className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
                <span className="text-sm text-foreground">{path}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-muted-foreground text-sm p-4">
            {hasGenerated 
              ? "We couldn't generate any specific recommendations right now. Try adding more skills and interests to your profile!"
              : "Click the button to generate your personalized learning paths!"
            }
          </div>
        )}
      </CardContent>
      <div className="p-6 pt-0">
          <Button className="w-full" onClick={handleGetRecommendations} disabled={isGenerating || isLoading}>
            {isGenerating ? 'Generating...' : hasGenerated ? 'Regenerate' : 'Generate Recommendations'}
          </Button>
      </div>
    </Card>
  );
}
