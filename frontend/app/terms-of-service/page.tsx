import { metadata as defaultMetadata } from '../metadata'; // Import global metadata
import TermsOfService from './page.client'; // Import the client component

export const metadata = {
  ...defaultMetadata,
  title: "Terms of Service | PrintShop Naija",
  description: "Understand the terms and conditions for using PrintShop Naija's custom printing services.",
};

export default function Page() {
  return <TermsOfService />;
}