

// import axios from 'axios';
// import { notFound } from 'next/navigation';
// import { Product } from '@/types/product';
// import ProductDetails from './page.client';

// // Define the expected shape of params after awaiting
// interface Params {
//   id: string;
// }

// export default async function Page({ params }: { params: Promise<Params> }) {
//   const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
//   // Await params to access its properties
//   const { id } = await params;
//   const productId = parseInt(id, 10);
//   let initialProduct: Product | null = null;

//   let productName = 'Product Not Found';
//   try {
//     const response = await axios.get(`${backendUrl}/api/products/${id}/details/`, {
//       headers: { 'Content-Type': 'application/json' },
//     });
//     const product = response.data;
//     if (product && product.name && product.price && product.main_image && product.product_description) {
//       initialProduct = product;
//       productName = product.name;
//     } else {
//       throw new Error('Invalid product data from server');
//     }
//   } catch (err: unknown) {
//     if (err instanceof Error && axios.isAxiosError(err) && err.response?.status === 404) {
//       notFound();
//     }
//     console.error('Fetch error:', err);
//   }

//   return (
//     <>
//       <title>{productName}</title>
//       <ProductDetails initialProduct={initialProduct} />
//     </>
//   );
// }

import axios from 'axios';
import { notFound } from 'next/navigation';
import { Product } from '@/types/product';
import ProductDetails from './page.client';
import { metadata as defaultMetadata } from '../../metadata';

// Define the expected shape of params after awaiting
interface Params {
  id: string;
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
  const { id } = await params;
  let productName = 'Product Not Found';
  try {
    const response = await axios.get(`${backendUrl}/api/products/${id}/details/`, {
      headers: { 'Content-Type': 'application/json' },
    });
    const product = response.data;
    productName = product.name || 'Unnamed Product';
  } catch (err) {
    console.error('Metadata fetch error:', err);
  }
  return {
    ...defaultMetadata,
    title: `${productName} | PrintShop Naija`,
    description: `Customize ${productName} at PrintShop Naija with quantity, color, and design.`,
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
  const { id } = await params;
  const productId = parseInt(id, 10);
  let initialProduct: Product | null = null;

  let productName = 'Product Not Found';
  try {
    const response = await axios.get(`${backendUrl}/api/products/${id}/details/`, {
      headers: { 'Content-Type': 'application/json' },
    });
    const product = response.data;
    if (product && product.name && product.price && product.main_image && product.product_description) {
      initialProduct = product;
      productName = product.name;
    } else {
      throw new Error('Invalid product data from server');
    }
  } catch (err: unknown) {
    if (err instanceof Error && axios.isAxiosError(err) && err.response?.status === 404) {
      notFound();
    }
    console.error('Fetch error:', err);
  }

  return (
    <>
      <title>{productName}</title>
      <ProductDetails initialProduct={initialProduct} />
    </>
  );
}