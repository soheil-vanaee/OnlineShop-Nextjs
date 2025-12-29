import { User } from "@/auth/auth";

// Define types
export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  views: number;
  purchases: number;
  createdAt: string;
};

export type CartItem = {
  id: string;
  productId: string;
  userId: string;
  quantity: number;
  addedAt: string;
};

// Mock database - in a real app, you would use a real database
let users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "$2a$10$8K1p/a0SIkzwvNq4G/HEEe0qAGuHf11J0Ec5oYKKQqHVaW5eFJ7nK", // bcrypt hash for "admin123"
    isAdmin: true,
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@example.com",
    password: "$2a$10$8K1p/a0SIkzwvNq4G/HEEe0qAGuHf11J0Ec5oYKKQqHVaW5eFJ7nK", // bcrypt hash for "user123"
    isAdmin: false,
  },
];

let products: Product[] = [
  {
    id: "1",
    title: "MacBook pro M4",
    description: "macbook pro 2025 M4-256",
    price: 200000000,
    image: "https://dkstatics-public.digikala.com/digikala-products/631659.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90",
    views: 0,
    purchases: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "محصول دوم",
    description: "توضیحات محصول دوم",
    price: 200000,
    image: "/placeholder-product.jpg",
    views: 0,
    purchases: 0,
    createdAt: new Date().toISOString(),
  },
];

let cartItems: CartItem[] = [];

// User functions
export const getAllUsers = (): User[] => users;
export const getUserById = (id: string): User | undefined => 
  users.find(user => user.id === id);
export const getUserByEmail = (email: string): User | undefined => 
  users.find(user => user.email === email);
export const addUser = (user: Omit<User, 'id'> & { id: string }): User => {
  users.push(user);
  return user;
};

// Product functions
export const getAllProducts = (): Product[] => [...products];
export const getProductById = (id: string): Product | undefined => 
  products.find(product => product.id === id);
export const addProduct = (product: Omit<Product, 'id' | 'views' | 'purchases' | 'createdAt'>): Product => {
  const newProduct: Product = {
    id: String(products.length + 1),
    ...product,
    views: 0,
    purchases: 0,
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  return newProduct;
};
export const updateProduct = (id: string, updates: Partial<Product>): Product | undefined => {
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updates };
    return products[index];
  }
  return undefined;
};
export const deleteProduct = (id: string): boolean => {
  const initialLength = products.length;
  products = products.filter(p => p.id !== id);
  return products.length !== initialLength;
};
export const incrementProductViews = (id: string): void => {
  const product = products.find(p => p.id === id);

  if (product) {
    product.views += 1;
  }
};

// Cart functions
export const getCartItemsByUserId = (userId: string): CartItem[] => 
  cartItems.filter(item => item.userId === userId);
export const getCartItemsWithProducts = (userId: string) => {
  const userCartItems = getCartItemsByUserId(userId);
  return userCartItems.map(cartItem => {
    const product = getProductById(cartItem.productId);
    return {
      ...cartItem,
      product: product || null,
    };
  }).filter(item => item.product !== null);
};
export const addCartItem = (cartItem: Omit<CartItem, 'id' | 'addedAt'>): CartItem => {
  const existingItem = cartItems.find(
    item => item.userId === cartItem.userId && item.productId === cartItem.productId
  );
  
  if (existingItem) {
    // If item already exists, update the quantity
    existingItem.quantity += cartItem.quantity;
    return existingItem;
  } else {
    // Otherwise, add new item
    const newCartItem: CartItem = {
      id: String(cartItems.length + 1),
      ...cartItem,
      addedAt: new Date().toISOString(),
    };
    cartItems.push(newCartItem);
    return newCartItem;
  }
};
export const updateCartItemQuantity = (userId: string, productId: string, quantity: number): CartItem | undefined => {
  const cartItem = cartItems.find(
    item => item.userId === userId && item.productId === productId
  );
  
  if (cartItem) {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      cartItems = cartItems.filter(
        item => !(item.userId === userId && item.productId === productId)
      );
      return undefined;
    } else {
      cartItem.quantity = quantity;
      return cartItem;
    }
  }
  return undefined;
};
export const removeCartItem = (userId: string, productId: string): boolean => {
  const initialLength = cartItems.length;
  cartItems = cartItems.filter(
    item => !(item.userId === userId && item.productId === productId)
  );
  return cartItems.length !== initialLength;
};
export const clearUserCart = (userId: string): void => {
  cartItems = cartItems.filter(item => item.userId !== userId);
};