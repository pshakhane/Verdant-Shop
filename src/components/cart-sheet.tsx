"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AlertCircle, ArrowRight, Loader2, Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { useCart } from '@/context/cart-context';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { getUpsellRecommendations } from '@/ai/flows/upsell-recommendations';
import { Skeleton } from './ui/skeleton';
import { products } from '@/lib/products';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface CartSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

function QuantitySelector({
  itemId,
  quantity,
}: {
  itemId: string;
  quantity: number;
}) {
  const { updateQuantity } = useCart();
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7"
        onClick={() => updateQuantity(itemId, quantity - 1)}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-6 text-center">{quantity}</span>
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7"
        onClick={() => updateQuantity(itemId, quantity + 1)}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}

function UpsellRecommendations() {
    const { items: cartItems, addItem } = useCart();
    const [recommendations, setRecommendations] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      if (cartItems.length > 0) {
        setIsLoading(true);
        const cartItemNames = cartItems.map(item => item.name);
        getUpsellRecommendations({ cartItems: cartItemNames })
          .then(result => setRecommendations(result.recommendations))
          .catch(error => console.error("Error fetching recommendations:", error))
          .finally(() => setIsLoading(false));
      } else {
        setRecommendations([]);
      }
    }, [cartItems]);
  
    const recommendedProducts = products.filter(p => recommendations.includes(p.name));
  
    if (cartItems.length === 0) return null;
  
    return (
      <div className="mt-6">
        <h4 className="text-md font-semibold mb-3">You might also like...</h4>
        {isLoading ? (
          <div className="space-y-3">
             {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-md" />
                    <div className="space-y-2 flex-grow">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/4" />
                    </div>
                </div>
             ))}
          </div>
        ) : recommendedProducts.length > 0 ? (
          <div className="space-y-3">
            {recommendedProducts.map(product => (
              <div key={product.id} className="flex items-center gap-4">
                <Image src={product.imageUrl} alt={product.name} width={64} height={64} className="rounded-md object-cover" data-ai-hint={`${product.category.toLowerCase()}`} />
                <div className="flex-grow">
                  <h5 className="font-medium text-sm">{product.name}</h5>
                  <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => addItem(product)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            ))}
          </div>
        ) : (
            <Alert variant="default" className="bg-muted">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>No suggestions</AlertTitle>
              <AlertDescription>
                We couldn't find any specific recommendations for your current items.
              </AlertDescription>
            </Alert>
        )}
      </div>
    );
  }

export default function CartSheet({ isOpen, onOpenChange }: CartSheetProps) {
  const { items, removeItem, totalPrice, cartCount, clearCart } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="pr-14">
          <SheetTitle>Your Cart ({cartCount})</SheetTitle>
        </SheetHeader>
        <Separator />
        {items.length > 0 ? (
          <>
            <ScrollArea className="flex-grow pr-4 -mr-6">
              <div className="space-y-6">
                {items.map(item => (
                  <div key={item.id} className="flex items-start gap-4">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                      data-ai-hint={item.category.toLowerCase()}
                    />
                    <div className="flex-grow">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                      <div className="mt-2">
                        <QuantitySelector itemId={item.id} quantity={item.quantity} />
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground h-8 w-8" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Separator className="my-6"/>
              <UpsellRecommendations />
            </ScrollArea>
            <Separator />
            <SheetFooter className="mt-auto">
              <div className="w-full space-y-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <Button asChild size="lg" className="w-full" onClick={() => onOpenChange(false)}>
                  <Link href="/checkout">
                    Checkout <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" onClick={clearCart}>Clear Cart</Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-grow text-center">
            <ShoppingCart className="h-20 w-20 text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-semibold">Your cart is empty</h3>
            <p className="text-muted-foreground">Add some items to get started.</p>
            <Button asChild className="mt-6" onClick={() => onOpenChange(false)}>
              <Link href="/">Start Shopping</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
