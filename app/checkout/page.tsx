'use client';

import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function CheckoutPage() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get('orderId');
  const cartId = searchParams.get('cartId');

  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const createSession = async () => {
      try {
        const response = await axios.post('/api/payment', {
          orderId,
          cartId,
        });
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        console.error('Error fetching client secret:', err);
      }
    };

    if (orderId && cartId) {
      createSession();
    }
  }, [orderId, cartId]);

  if (!clientSecret) {
    return <div>Loading Checkout...</div>;
  }

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ clientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
