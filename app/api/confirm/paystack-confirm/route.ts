// /api/paystack/confirm.ts
import { NextRequest } from 'next/server';
import db from '@/utils/db';

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get('reference');

  const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    },
  });

  const data = await paystackRes.json();

  if (data.status && data.data.status === 'success') {
    const order = await db.order.findFirst({ where: { paystackReference: reference } });

    if (order) {
     await db.order.update({ where: { id: order.id }, data: { isPaid: true } });

      await db.cart.delete({ where: { id: order.cartId! } });
      const productItems = await db.orderItem.findMany({
        where: {
          orderId: order.id,
        },
        select: {
          productId: true,
          quantity:true
        },
      });

      // Loop through and update product qty
      for (const item of productItems) {
        await db.product.update({
          where: {
            id: item.productId,
          },
          data: {
            qty: {
              decrement: item.quantity ?? 0, // Decrease qty by the quantity ordered
            },
          },
        });
      }



      return Response.json({ success: true });
    }
  }

  return Response.json({ success: false }, { status: 400 });
};
