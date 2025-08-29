'use server';

/**
 * @fileOverview An AI agent that recommends complementary items based on the products in the cart.
 *
 * - getUpsellRecommendations - A function that suggests complementary items.
 * - UpsellRecommendationsInput - The input type for the getUpsellRecommendations function.
 * - UpsellRecommendationsOutput - The return type for the getUpsellRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const UpsellRecommendationsInputSchema = z.object({
  cartItems: z
    .array(z.string())
    .describe('An array of product names currently in the cart.'),
});
export type UpsellRecommendationsInput = z.infer<typeof UpsellRecommendationsInputSchema>;

const UpsellRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('An array of product names that complement the items in the cart.'),
});
export type UpsellRecommendationsOutput = z.infer<typeof UpsellRecommendationsOutputSchema>;

export async function getUpsellRecommendations(input: UpsellRecommendationsInput): Promise<UpsellRecommendationsOutput> {
  return upsellRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'upsellRecommendationsPrompt',
  input: {schema: UpsellRecommendationsInputSchema},
  output: {schema: UpsellRecommendationsOutputSchema},
  prompt: `Suggest complementary items based on the products in the cart.

  Cart items: {{cartItems}}

  Recommendations:`,
});

const upsellRecommendationsFlow = ai.defineFlow(
  {
    name: 'upsellRecommendationsFlow',
    inputSchema: UpsellRecommendationsInputSchema,
    outputSchema: UpsellRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
