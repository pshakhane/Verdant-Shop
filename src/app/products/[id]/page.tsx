"use client"

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductById } from '@/lib/products';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useCurrency } from '@/context/currency-context';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { toast } = useToast();
  const { formatPrice } = useCurrency();
  
  useEffect(() => {
    const fetchedProduct = getProductById(params.id);
    if (fetchedProduct) {
      setProduct(fetchedProduct);
    }
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-2 gap-12">
                <Skeleton className="w-full h-[450px] rounded-lg" />
                <div className="space-y-6">
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-12 w-48" />
                </div>
            </div>
        </div>
    );
  }

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem(product);
    toast({
        title: "Added to cart",
        description: `${product.name} is now in your cart.`,
    });
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        <div className="bg-card p-4 rounded-lg shadow-sm">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={800}
            height={800}
            className="w-full h-auto object-cover rounded-md"
            data-ai-hint={`${product.category.toLowerCase()} ${product.name.toLowerCase()}`}
            priority
          />
        </div>
        <div>
          <span className="text-sm font-medium text-primary uppercase tracking-wider">{product.category}</span>
          <h1 className="text-4xl lg:text-5xl font-bold font-headline my-3">{product.name}</h1>
          {product.modelNumber && <p className="text-sm text-muted-foreground mb-4">Model No. {product.modelNumber}</p>}
          <p className="text-3xl font-semibold text-primary mb-6">{formatPrice(product.price)}</p>
          <p className="text-base text-muted-foreground leading-relaxed mb-8">
            {product.description}
          </p>
          <Button size="lg" onClick={handleAddToCart}>
            <Plus className="mr-2 h-5 w-5" /> Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
