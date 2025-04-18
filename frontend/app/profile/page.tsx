import { metadata as defaultMetadata } from '../metadata'; // Import global metadata
import Profile from './page.client'; // Import the client component

export const metadata = {
  ...defaultMetadata,
  title: "Profile | PrintShop Naija",
  description: "View your orders and manage your account settings at PrintShop Naija.",
};

export default function Page() {
  return <Profile />;
}