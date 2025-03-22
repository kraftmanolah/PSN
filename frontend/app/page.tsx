// PSN_MAIN_PROJECT/frontend/app/page.tsx
import { metadata as defaultMetadata } from './metadata'; // Import global metadata
import Home from './page.client'; // Import the client component

export const metadata = {
  ...defaultMetadata,
  title: "Home | PrintShop Naija", // Page-specific title
  description: "Explore the best printing solutions at PrintShop Naija - shop our bestsellers and featured products.", // Page-specific description
};

export default function Page() {
  return <Home />;
}