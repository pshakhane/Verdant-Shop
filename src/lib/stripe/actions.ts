'use server';

import { stripe } from '@/lib/stripe';
import { z } from 'zod';

const createPaymentIntentSchema = z.object({
  amount: z.number().positive(),
  currency: z.string(),
});

export async function createPaymentIntent(data: { amount: number; currency: string }) {
  const validation = createPaymentIntentSchema.safeParse(data);
  if (!validation.success) {
    throw new Error('Invalid input for createPaymentIntent');
  }

  const { amount, currency } = validation.data;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Amount in cents
      currency: currency.toLowerCase(),
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error('Error creating PaymentIntent:', error);
    throw new Error('Could not create payment intent.');
  }
}
