'use server';

/**
 * @fileOverview Provides AI-driven recommendations for learning paths based on user's skills and interests.
 *
 * - getPersonalizedLearningRecommendations - A function that retrieves personalized learning recommendations.
 * - PersonalizedLearningRecommendationsInput - The input type for the getPersonalizedLearningRecommendations function.
 * - PersonalizedLearningRecommendationsOutput - The return type for the getPersonalizedLearningRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedLearningRecommendationsInputSchema = z.object({
  userSkills: z
    .array(z.string())
    .describe('A list of the user\'s current skills.'),
  userInterests: z
    .array(z.string())
    .describe('A list of the user\'s interests.'),
  learningGoals: z
    .string()
    .describe('A description of the user\'s learning goals.'),
});
export type PersonalizedLearningRecommendationsInput = z.infer<
  typeof PersonalizedLearningRecommendationsInputSchema
>;

const PersonalizedLearningRecommendationsOutputSchema = z.object({
  recommendedLearningPaths: z.array(z.string()).describe(
    'A list of recommended learning paths based on the user\'s skills, interests, and learning goals.'
  ),
});
export type PersonalizedLearningRecommendationsOutput = z.infer<
  typeof PersonalizedLearningRecommendationsOutputSchema
>;

export async function getPersonalizedLearningRecommendations(
  input: PersonalizedLearningRecommendationsInput
): Promise<PersonalizedLearningRecommendationsOutput> {
  return personalizedLearningRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedLearningRecommendationsPrompt',
  input: {schema: PersonalizedLearningRecommendationsInputSchema},
  output: {schema: PersonalizedLearningRecommendationsOutputSchema},
  prompt: `You are an AI learning path recommender.

Based on the user's current skills, interests, and learning goals, recommend a list of learning paths that would be most helpful for them.

Current Skills: {{#if userSkills}}{{#each userSkills}}- {{{this}}}\n{{/each}}{{else}}No skills listed.{{/if}}

Interests: {{#if userInterests}}{{#each userInterests}}- {{{this}}}\n{{/each}}{{else}}No interests listed.{{/if}}

Learning Goals: {{{learningGoals}}}

Recommended Learning Paths:`,
});

const personalizedLearningRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedLearningRecommendationsFlow',
    inputSchema: PersonalizedLearningRecommendationsInputSchema,
    outputSchema: PersonalizedLearningRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
