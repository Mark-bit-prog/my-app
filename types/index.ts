// Static database

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

// types/index.ts
export type CartItemType = {
  product: {
    id: number;
    name: string;
    price: number;
  };
  quantity: number;
};

export type OrderBody = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  totalPrice: number;
  items: CartItemType[];
};
