'use server';

/**
 * @fileOverview This file contains the Genkit flow for intelligent user matching based on complementary skills and shared interests.
 *
 * - intelligentMatching - A function that orchestrates the user matching process.
 * - IntelligentMatchingInput - The input type for the intelligentMatching function.
 * - IntelligentMatchingOutput - The return type for the intelligentMatching function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentMatchingInputSchema = z.object({
  userProfile: z.object({
    skills: z.array(z.string()).describe('List of skills the user possesses.'),
    interests: z.array(z.string()).describe('List of the user interests.'),
    desiredSkills: z.array(z.string()).optional().describe('List of skills the user wants to learn.'),
  }).describe('The profile of the user seeking a match.'),
  otherUserProfiles: z.array(z.object({
    userId: z.string().describe('Unique identifier of the other user.'),
    skills: z.array(z.string()).describe('List of skills the other user possesses.'),
    interests: z.array(z.string()).describe('List of the other user interests.'),
  })).describe('Profiles of other users to consider for matching.'),
});

export type IntelligentMatchingInput = z.infer<typeof IntelligentMatchingInputSchema>;

const IntelligentMatchingOutputSchema = z.array(z.object({
  userId: z.string().describe('Unique identifier of the matched user.'),
  matchScore: z.number().describe('A score indicating the strength of the match (0-1).'),
  rationale: z.string().describe('Explanation of why this user is a good match.'),
}));

export type IntelligentMatchingOutput = z.infer<typeof IntelligentMatchingOutputSchema>;

export async function intelligentMatching(input: IntelligentMatchingInput): Promise<IntelligentMatchingOutput> {
  return intelligentMatchingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentMatchingPrompt',
  input: {schema: IntelligentMatchingInputSchema},
  output: {schema: IntelligentMatchingOutputSchema},
  prompt: `You are an expert matchmaker, skilled at connecting people based on their skills and interests.

Given the following user profile:

Skills: {{userProfile.skills}}
Interests: {{userProfile.interests}}
Desired Skills: {{userProfile.desiredSkills}}

And the following list of other user profiles:

{{#each otherUserProfiles}}
User (ID: {{this.userId}}):
Skills: {{this.skills}}
Interests: {{this.interests}}
{{/each}}

Determine the best matches for the user, considering complementary skills (where one user's skills fill another's desired skills) and shared interests.

Provide a match score (0-1) and a brief rationale for each match.  A match score of 1 indicates a perfect match and 0 indicates no match at all.

Return your results as a JSON array of objects, each containing the userId, matchScore, and rationale.
`,
});

const intelligentMatchingFlow = ai.defineFlow(
  {
    name: 'intelligentMatchingFlow',
    inputSchema: IntelligentMatchingInputSchema,
    outputSchema: IntelligentMatchingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
