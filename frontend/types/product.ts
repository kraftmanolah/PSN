export interface ProductCategory {
  id: number;
  name: string;
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  currency: string;
  description: string;
  product_description: string;
  colors: any[]; // Keep for design selection
  features: any[]; // Keep for specifications
  product_category: {
    id: number;
    name: string;
    created_at: string;
  };
  created_at: string;
  thumbnails: {
    id: number;
    image: string; // URL
    is_main: boolean;
  }[];
  main_image: string | null; // URL or null
  increment_step?: number; // Optional field, default to 1 if not provided
}

export interface Cart {
  id: number;
  user: number; // User ID
  items: CartItem[];
  created_at: string;
  total: number | string; // Allow string to handle Decimal serialization
  item_count: number;
}

export interface CartItem {
  id: number;
  cart: number; // Or Cart object if serialized
  product: Product;
  quantity: number;
  design_file: string | null; // URL or null if no file
  additional_info: string | null;
  color: string | null;
  item_total: number; // Added item_total
}

export interface Delivery {
  address: string; // Remove null, require string
  city: string;   // Remove null, require string
  state: string;  // Remove null, provide default
  postcode: string | null; // Keep null as optional, but handle in input
}

export interface Order {
  id: number;
  user: number; // User ID
  items: OrderItem[];
  total_amount: number;
  status: string;
  created_at: string;
  transaction_id: string | null;
  delivery_option: 'pickup' | 'delivery';
  design_file: string | null; // URL or null for uploaded design
  delivery: Delivery | null; // New field for delivery details
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
  design_file?: string | null;
  additional_info?: string | null;
  color?: string | null;
}