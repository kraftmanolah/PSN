import { metadata as defaultMetadata } from '../../metadata';
import OrderSummaryPage from './page.client';

export const metadata = {
  ...defaultMetadata,
  title: "Order Summary | PrintShop Naija",
  description: "Confirm your order details and proceed to payment.",
};

export default function Page() {
  return <OrderSummaryPage />;
}