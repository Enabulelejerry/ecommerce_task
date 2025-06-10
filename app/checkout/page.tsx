import CheckoutUI from "@/components/checkout/CheckoutUI";
import { fetchOrCreateCart } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { use } from "react";

async function CheckOutPage({
  searchParams,
}: {
  searchParams: { orderId: string; cartId: string };
}) {
  const { userId } = auth();
  const orderId = searchParams.orderId;
  const cartId = searchParams.cartId;
  if (!userId) redirect("/");
  const cart = await fetchOrCreateCart({ userId });
  return <CheckoutUI cart={cart} orderId={orderId} cartId={cartId} />;
}

export default CheckOutPage;
