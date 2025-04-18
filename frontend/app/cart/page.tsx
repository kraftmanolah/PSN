import { metadata as defaultMetadata } from '../metadata'; // Import global metadata
import CartPage from './page.client'; // Import the client component

export const metadata = {
  ...defaultMetadata,
  title: "Your Cart | PrintShop Naija",
  description: "Review and manage the items in your PrintShop Naija cart before proceeding to checkout.",
};

export default function Page() {
  return <CartPage />;
}