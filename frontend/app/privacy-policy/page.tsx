import { metadata as defaultMetadata } from '../metadata'; // Import global metadata
import PrivacyPolicy from './page.client'; // Import the client component

export const metadata = {
  ...defaultMetadata,
  title: "Privacy Policy | PrintShop Naija",
  description: "Learn how PrintShop Naija collects, uses, and protects your personal information.",
};

export default function Page() {
  return <PrivacyPolicy />;
}