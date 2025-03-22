"use client";

import useSWR from "swr";
import { Product } from "@/types/product";

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}, text: ${res.statusText}`);
  }
  return res.json();
});

export function useProducts(url: string = `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'}/api/products/`) {
  const { data, error, isLoading } = useSWR<Product[]>(url, fetcher);
  return { products: data, error, isLoading };
}