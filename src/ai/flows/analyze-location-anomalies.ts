'use server';
/**
 * @fileOverview This file defines a Genkit flow for analyzing location anomalies.
 *
 * - analyzeLocationAnomalies - Analyzes location data for anomalies.
 * - AnalyzeLocationAnomaliesInput - The input type for the analyzeLocationAnomalies function.
 * - AnalyzeLocationAnomaliesOutput - The return type for the analyzeLocationAnomalies function.
 */

import {ai} from '@/ai/ai-instance';
import {Location} from '@/services/location';
import {z} from 'genkit';

const AnalyzeLocationAnomaliesInputSchema = z.object({
  userId: z.string().describe('The ID of the user whose location data is being analyzed.'),
  locations: z.array(
    z.object({
      lat: z.number().describe('The latitude of the location.'),
      lng: z.number().describe('The longitude of the location.'),
      timestamp: z.number().describe('The timestamp of the location.'),
    })
  ).describe('An array of location data points with latitude, longitude, and timestamp.'),
  expectedRoute: z.array(
    z.object({
      lat: z.number().describe('The latitude of the location.'),
      lng: z.number().describe('The longitude of the location.'),
    })
  ).optional().describe('The expected route of the user, if available.'),
});

export type AnalyzeLocationAnomaliesInput = z.infer<typeof AnalyzeLocationAnomaliesInputSchema>;

const AnalyzeLocationAnomaliesOutputSchema = z.object({
  hasAnomalies: z.boolean().describe('Whether or not any anomalies were detected in the location data.'),
  anomalyExplanation: z.string().describe('A detailed explanation of the detected anomalies, if any.'),
});

export type AnalyzeLocationAnomaliesOutput = z.infer<typeof AnalyzeLocationAnomaliesOutputSchema>;

export async function analyzeLocationAnomalies(input: AnalyzeLocationAnomaliesInput): Promise<AnalyzeLocationAnomaliesOutput> {
  return analyzeLocationAnomaliesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeLocationAnomaliesPrompt',
  input: {
    schema: z.object({
      userId: z.string().describe('The ID of the user whose location data is being analyzed.'),
      locations: z.array(
        z.object({
          lat: z.number().describe('The latitude of the location.'),
          lng: z.number().describe('The longitude of the location.'),
          timestamp: z.number().describe('The timestamp of the location.'),
        })
      ).describe('An array of location data points with latitude, longitude, and timestamp.'),
      expectedRoute: z.array(
        z.object({
          lat: z.number().describe('The latitude of the location.'),
          lng: z.number().describe('The longitude of the location.'),
        })
      ).optional().describe('The expected route of the user, if available.'),
    }),
  },
  output: {
    schema: z.object({
      hasAnomalies: z.boolean().describe('Whether or not any anomalies were detected in the location data.'),
      anomalyExplanation: z.string().describe('A detailed explanation of the detected anomalies, if any.'),
    }),
  },
  prompt: `You are an expert in detecting anomalies in location data.

You are provided with location data for a specific user. Your task is to analyze this data and identify any unusual deviations from expected routes or patterns.

User ID: {{{userId}}}
Location Data: {{{JSON.stringify(locations)}}
Expected Route (if available): {{{JSON.stringify(expectedRoute)}}}

Based on this information, determine if there are any anomalies in the user's location data.

Consider factors such as:
- Unexpected changes in direction or speed
- Deviations from the expected route (if provided)
- Locations that are far from the user's typical areas

Return whether anomalies were detected and provide a detailed explanation of any anomalies found.
`,
});

const analyzeLocationAnomaliesFlow = ai.defineFlow<
  typeof AnalyzeLocationAnomaliesInputSchema,
  typeof AnalyzeLocationAnomaliesOutputSchema
>({
  name: 'analyzeLocationAnomaliesFlow',
  inputSchema: AnalyzeLocationAnomaliesInputSchema,
  outputSchema: AnalyzeLocationAnomaliesOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
