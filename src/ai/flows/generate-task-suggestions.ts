'use server';
/**
 * @fileOverview Task suggestion AI agent.
 *
 * - generateTaskSuggestions - A function that handles the task suggestion process.
 * - GenerateTaskSuggestionsInput - The input type for the generateTaskSuggestions function.
 * - GenerateTaskSuggestionsOutput - The return type for the generateTaskSuggestions function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {Location} from '@/services/location';

const GenerateTaskSuggestionsInputSchema = z.object({
  userLocation: z
    .object({
      lat: z.number().describe('Latitude of the user.'),
      lng: z.number().describe('Longitude of the user.'),
    })
    .describe('The current location of the user.'),
  pastActivities: z
    .string()
    .describe(
      'A description of the users past activities, including completed tasks and locations visited.'
    ),
  availableTasks: z
    .string()
    .describe('A description of the tasks that can be assigned to the user.'),
});

export type GenerateTaskSuggestionsInput = z.infer<
  typeof GenerateTaskSuggestionsInputSchema
>;

const GenerateTaskSuggestionsOutputSchema = z.object({
  suggestedTasks: z
    .string()
    .describe(
      'A list of tasks that are suggested for the user, based on their location and past activities.'
    ),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the task suggestions, explaining why each task is suitable for the user.'
    ),
});

export type GenerateTaskSuggestionsOutput = z.infer<
  typeof GenerateTaskSuggestionsOutputSchema
>;

export async function generateTaskSuggestions(
  input: GenerateTaskSuggestionsInput
): Promise<GenerateTaskSuggestionsOutput> {
  return generateTaskSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTaskSuggestionsPrompt',
  input: {
    schema: z.object({
      userLocation: z
        .object({
          lat: z.number().describe('Latitude of the user.'),
          lng: z.number().describe('Longitude of the user.'),
        })
        .describe('The current location of the user.'),
      pastActivities: z
        .string()
        .describe(
          'A description of the users past activities, including completed tasks and locations visited.'
        ),
      availableTasks: z
        .string()
        .describe('A description of the tasks that can be assigned to the user.'),
    }),
  },
  output: {
    schema: z.object({
      suggestedTasks: z
        .string()
        .describe(
          'A list of tasks that are suggested for the user, based on their location and past activities.'
        ),
      reasoning: z
        .string()
        .describe(
          'The reasoning behind the task suggestions, explaining why each task is suitable for the user.'
        ),
    }),
  },
  prompt: `You are an AI assistant helping administrators assign tasks to users based on their location and past activities.

  Consider the user's current location:
  Location: Lat: {{{userLocation.lat}}}, Lng: {{{userLocation.lng}}}

  Also consider the user's past activities:
  Past Activities: {{{pastActivities}}}

  And consider the available tasks:
  Available Tasks: {{{availableTasks}}}

  Suggest a list of tasks that are most suitable for the user.
  Explain your reasoning for each suggested task.
  Tasks should be returned as a string.
  Reasoning should also be returned as a string.
  `,
});

const generateTaskSuggestionsFlow = ai.defineFlow<
  typeof GenerateTaskSuggestionsInputSchema,
  typeof GenerateTaskSuggestionsOutputSchema
>(
  {
    name: 'generateTaskSuggestionsFlow',
    inputSchema: GenerateTaskSuggestionsInputSchema,
    outputSchema: GenerateTaskSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
