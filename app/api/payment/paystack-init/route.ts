
import { NextRequest } from 'next/server';
import db from '@/utils/db';

import { generatePaystackReference } from '@/utils/reference';

export const POST = async (req: NextRequest) => {
  const { orderId, cartId } = await req.json();
  const order = await db.order.findUnique({ where: { id: orderId } });

  if (!order) {
    return new Response('Order not found', { status: 404 });
  }

  const reference = generatePaystackReference(); // unique Paystack reference

  await db.order.update({
    where: { id: orderId },
    data: { 
		paystackReference: reference,
		cartId
		 },
  });

  return Response.json({
    email: order.email,
    amount: order.orderTotal + order.tax + order.shipping,
    reference,
  });
};
