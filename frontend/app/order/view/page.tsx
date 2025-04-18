import { Metadata } from "next";
import OrderViewPage from "./page.client";

export const metadata: Metadata = {
  title: "Order View | Your Store",
  description: "View the details of your order, including items, delivery options, and total amount.",
};

export default function Page() {
  return <OrderViewPage />;
}