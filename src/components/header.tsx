"use client"

import Link from 'next/link';
import { Leaf, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '@/context/cart-context';
import CartSheet from './cart-sheet';
import { useState } from 'react';

export default function Header() {
  const { cartCount, isInitialized } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary font-headline">
            <Leaf className="w-7 h-7" />
            Verdant Shop
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:flex" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant="ghost" className="relative" size="icon" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="h-6 w-6" />
              {isInitialized && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Open cart</span>
            </Button>
          </div>
        </div>
      </header>
      <CartSheet isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}
