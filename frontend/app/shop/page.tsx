

import { metadata as defaultMetadata } from '../metadata'; // Import global metadata
import Shop from './page.client'; // Import the client component

export const metadata = {
  ...defaultMetadata,
  title: "Shop | PrintShop Naija",
  description: "Browse and shop the latest products at PrintShop Naija.",
};

export default function Page() {
  return <Shop />;
}