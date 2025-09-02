"use client"

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { useCurrency } from '@/context/currency-context';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Truck, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { createPaymentIntent } from '@/lib/stripe/actions';
import { CheckoutForm } from '@/components/checkout-form';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  zip: z.string().regex(/^\d{5}$/, "Invalid ZIP code"),
  paymentMethod: z.string({ required_error: "Please select a payment method."}),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const { currency, formatPrice } = useCurrency();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { name: '', email: '', address: '', city: '', zip: '', paymentMethod: 'card' },
  });

  const paymentMethod = form.watch('paymentMethod');

  useEffect(() => {
    if (paymentMethod === 'card' && totalPrice > 0) {
      createPaymentIntent({ amount: totalPrice, currency: currency.code })
        .then(({ clientSecret }) => {
          setClientSecret(clientSecret);
        })
        .catch(error => {
          console.error(error);
          toast({
            title: "Error",
            description: "Could not initialize payment. Please try again.",
            variant: "destructive"
          });
        });
    }
  }, [paymentMethod, totalPrice, currency.code, toast]);

  const onSuccessfulCheckout = () => {
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. Your items are on their way!",
    });
    clearCart();
    // The redirect will be handled by Stripe's return_url
  };

  const handleCashCheckout = (data: CheckoutFormValues) => {
    console.log("Order placed with cash:", data);
    onSuccessfulCheckout();
    router.push('/');
  };

  if (items.length === 0) {
    return (
        <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold">Your cart is empty</h1>
            <p className="text-muted-foreground mt-2">Please add items to your cart before checking out.</p>
            <Button className="mt-6" onClick={() => router.push('/')}>
                Return to Shop
            </Button>
        </div>
    )
  }
  
  const stripeOptions: StripeElementsOptions = {
    clientSecret: clientSecret || undefined,
    appearance: { theme: 'stripe' },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold font-headline text-center mb-10">Checkout</h1>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCashCheckout)} className="grid md:grid-cols-2 gap-12 items-start">
        <Card>
            <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>Enter your details to complete the purchase.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="jane.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main Street" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Anytown" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input placeholder="12345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
            </CardContent>
        </Card>

        <div className="space-y-8">
            <Card className="bg-card">
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {items.map(item => (
                            <div key={item.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Image src={item.imageUrl} alt={item.name} width={64} height={64} className="rounded-md object-cover" data-ai-hint={item.category.toLowerCase()} />
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                            </div>
                        ))}
                        <Separator />
                        <div className="flex justify-between items-center text-lg font-bold">
                            <p>Total</p>
                            <p>{formatPrice(totalPrice)}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>Select how you'd like to pay.</CardDescription>
                </CardHeader>
                <CardContent>
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid md:grid-cols-2 gap-4">
                            <Label className="flex items-center gap-4 border rounded-md p-4 hover:bg-accent has-[input:checked]:bg-accent has-[input:checked]:border-primary transition-all cursor-pointer">
                                <RadioGroupItem value="card" id="card" />
                                <CreditCard className="w-6 h-6" />
                                <span>Credit Card</span>
                            </Label>
                            <Label className="flex items-center gap-4 border rounded-md p-4 hover:bg-accent has-[input:checked]:bg-accent has-[input:checked]:border-primary transition-all cursor-pointer">
                                <RadioGroupItem value="cash" id="cash" />
                                <Truck className="w-6 h-6" />
                                <span>Cash on Delivery</span>
                            </Label>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage className="pt-2" />
                    </FormItem>
                  )}
                />
                <div className="pt-6">
                {paymentMethod === 'card' ? (
                  clientSecret ? (
                    <Elements options={stripeOptions} stripe={stripePromise}>
                      <CheckoutForm onSuccessfulCheckout={onSuccessfulCheckout} />
                    </Elements>
                  ) : (
                    <div className="flex items-center justify-center h-24">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  )
                ) : (
                  <Button type="submit" size="lg" className="w-full">
                    Place Order (Cash)
                  </Button>
                )}
                </div>
                </CardContent>
            </Card>
        </div>
      </form>
      </Form>
    </div>
  );
}
