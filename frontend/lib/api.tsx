import axios from "axios";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get("/products/");
  return response.data;
};

