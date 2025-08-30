export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  modelNumber?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
