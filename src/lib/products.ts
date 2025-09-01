import type { Product } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Laptop Pro',
    description: 'High-performance laptop for all your professional needs. Features a stunning display and a powerful processor.',
    price: 1299.99,
    imageUrl: 'https://images.unsplash.com/photo-1672241860863-fab879bd4a07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxsYXB0b3AlMjBwcm98ZW58MHx8fHwxNzU2Njg0MjkyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Electronics',
    modelNumber: 'LP-2024-A',
  },
  {
    id: '2',
    name: 'Smartphone X',
    description: 'The latest smartphone with a cutting-edge camera and all-day battery life. Stay connected in style.',
    price: 899.50,
    imageUrl: 'https://images.unsplash.com/photo-1608048974883-3c761722fe3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxTbWFydHBob25lJTIwWHxlbnwwfHx8fDE3NTY2ODQzOTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Electronics',
    modelNumber: 'SX-2024-C',
  },
  {
    id: '3',
    name: 'Wireless Headphones',
    description: 'Immerse yourself in high-fidelity sound with these noise-cancelling wireless headphones. Perfect for music lovers.',
    price: 199.00,
    imageUrl: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxXaXJlbGVzcyUyMEhlYWRwaG9uZXN8ZW58MHx8fHwxNzU2Njg0NDU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Electronics',
    modelNumber: 'WH-2024-B',
  },
  {
    id: '4',
    name: 'Premium Spark Plugs',
    description: 'Set of 4 high-performance spark plugs to improve your engine\'s efficiency and power. Built to last.',
    price: 45.00,
    imageUrl: 'https://images.unsplash.com/photo-1687946942619-9a1875eeeb45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxQcmVtaXVtJTIwU3BhcmslMjBQbHVnc3xlbnwwfHx8fDE3NTY2ODQ1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Car Parts',
    modelNumber: 'PSP-2024-D',
  },
  {
    id: '5',
    name: 'Ceramic Brake Pads',
    description: 'Front set of ceramic brake pads for superior stopping power and low dust. Ensures a quiet and smooth ride.',
    price: 75.80,
    imageUrl: 'https://images.unsplash.com/photo-1646586995332-de830c4cc0f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxDZXJhbWljJTIwQnJha2UlMjBQYWRzfGVufDB8fHx8MTc1NjY4NDY4OXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Car Parts',
    modelNumber: 'CBP-2024-F',
  },
  {
    id: '6',
    name: 'Engine Air Filter',
    description: 'High-flow engine air filter to protect your engine from contaminants and improve airflow for better performance.',
    price: 22.30,
    imageUrl: 'https://images.unsplash.com/photo-1586040661238-69c4c4a46b55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxFbmdpbmUlMjBBaXIlMjBGaWx0ZXJ8ZW58MHx8fHwxNzU2Njg0Nzc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Car Parts',
    modelNumber: 'EAF-2024-E',
  },
  {
    id: '7',
    name: 'Organic Gala Apples',
    description: 'A bag of fresh, crispy, and sweet organic Gala apples. Perfect for a healthy snack.',
    price: 5.99,
    imageUrl: 'https://images.unsplash.com/photo-1563209041-9790c0c08a45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxPcmdhbmljJTIwR2FsYSUyMEFwcGxlc3xlbnwwfHx8fDE3NTY2ODQ4MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Groceries',
    modelNumber: 'OGA-2024-G',
  },
  {
    id: '8',
    name: 'Whole Milk Gallon',
    description: 'One gallon of fresh, Grade A whole milk. Rich in calcium and vitamin D.',
    price: 3.50,
    imageUrl: 'https://images.unsplash.com/photo-1685531309627-f0c9e8656ff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxXaG9sZSUyME1pbGslMjBHYWxsb258ZW58MHx8fHwxNzU2Njg0OTE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Groceries',
    modelNumber: 'WMG-2024-H',
  },
   {
    id: '9',
    name: 'Sourdough Bread Loaf',
    description: 'Artisan sourdough loaf with a crispy crust and a chewy interior. Baked fresh daily.',
    price: 6.25,
    imageUrl: 'https://picsum.photos/seed/bread/600/600',
    category: 'Groceries',
    modelNumber: 'SBL-2024-I',
  },
];

export const categories = ['All', ...new Set(products.map(p => p.category))];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
}
