import type { Product } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Monstera Deliciosa',
    description: 'A classic houseplant with iconic split leaves. Easy to care for and a great statement piece. Thrives in bright, indirect light and loves humidity.',
    price: 35.00,
    imageUrl: 'https://picsum.photos/600/600?random=1',
    category: 'Indoor Plants',
  },
  {
    id: '2',
    name: 'Snake Plant',
    description: 'Known for its air-purifying qualities and low maintenance needs. Perfect for beginners, it tolerates low light and infrequent watering.',
    price: 25.00,
    imageUrl: 'https://picsum.photos/600/600?random=2',
    category: 'Indoor Plants',
  },
  {
    id: '3',
    name: 'Fiddle Leaf Fig',
    description: 'A trendy plant with large, violin-shaped leaves. Requires bright, consistent, indirect light and stable temperatures to flourish.',
    price: 55.00,
    imageUrl: 'https://picsum.photos/600/600?random=3',
    category: 'Indoor Plants',
  },
  {
    id: '4',
    name: 'Classic Terracotta Pot',
    description: 'Classic porous terracotta pot that allows soil to breathe, preventing root rot. Includes a drainage hole and matching saucer.',
    price: 12.50,
    imageUrl: 'https://picsum.photos/600/600?random=4',
    category: 'Pots & Accessories',
  },
  {
    id: '5',
    name: 'Minimalist Ceramic Planter',
    description: 'A stylish glazed ceramic planter in a soft cream color with a matte finish. Adds a touch of modern elegance to any plant.',
    price: 22.00,
    imageUrl: 'https://picsum.photos/600/600?random=5',
    category: 'Pots & Accessories',
  },
  {
    id: '6',
    name: 'Elegant Watering Can',
    description: 'A sleek, long-spout watering can for precise watering of your beloved plants. Made from durable, dark olive stainless steel.',
    price: 28.00,
    imageUrl: 'https://picsum.photos/600/600?random=6',
    category: 'Pots & Accessories',
  },
  {
    id: '7',
    name: 'Organic Houseplant Potting Mix',
    description: 'A nutrient-rich, well-draining potting mix perfect for a wide variety of houseplants. Promotes healthy root growth and vibrant foliage.',
    price: 15.00,
    imageUrl: 'https://picsum.photos/600/600?random=7',
    category: 'Soil & Care',
  },
  {
    id: '8',
    name: 'All-Purpose Plant Food',
    description: 'Gentle liquid plant food to give your green friends the essential nutrients they need to thrive during the growing season.',
    price: 10.00,
    imageUrl: 'https://picsum.photos/600/600?random=8',
    category: 'Soil & Care',
  },
   {
    id: '9',
    name: 'Golden Pothos Plant',
    description: 'A versatile and nearly foolproof trailing plant with heart-shaped, green and yellow leaves. Great for hanging baskets or shelves.',
    price: 20.00,
    imageUrl: 'https://picsum.photos/600/600?random=9',
    category: 'Indoor Plants',
  },
];

export const categories = ['All', ...new Set(products.map(p => p.category))];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
}
