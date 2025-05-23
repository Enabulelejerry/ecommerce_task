'use client';

import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
// import PaystackPop from '@paystack/inline-js';
// import { loadStripe } from '@stripe/stripe-js';
// import {
//   EmbeddedCheckoutProvider,
//   EmbeddedCheckout,
// } from '@stripe/react-stripe-js';

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
// );

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const orderId = searchParams.get('orderId');
  const cartId = searchParams.get('cartId');

  // const [clientSecret, setClientSecret] = useState<string | null>(null);

  // useEffect(() => {
  //   const createSession = async () => {
  //     try {
  //       const response = await axios.post('/api/payment', {
  //         orderId,
  //         cartId,
  //       });
  //       setClientSecret(response.data.clientSecret);
  //     } catch (err) {
  //       console.error('Error fetching client secret:', err);
  //     }
  //   };

  //   if (orderId && cartId) {
  //     createSession();
  //   }
  // }, [orderId, cartId]);

  // if (!clientSecret) {
  //   return <div>Loading Checkout...</div>;
  // }

  // return (
  //   <div id="checkout">
  //     <EmbeddedCheckoutProvider
  //       stripe={stripePromise}
  //       options={{ clientSecret }}
  //     >
  //       <EmbeddedCheckout />
  //     </EmbeddedCheckoutProvider>
  //   </div>
  // );


  const [paymentData, setPaymentData] = useState<null | {
    email: string;
    amount: number;
    reference: string;
  }>(null);

  useEffect(() => {
  const loadSession = async () => {
    try {
      const res = await fetch('/api/payment/paystack-init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, cartId }),
      });

      const data = await res.json();
      console.log('✅ Payment data loaded:', data);
      setPaymentData(data);
    } catch (error) {
      console.log('Error loading payment data:', error);
    }
  };

  if (orderId && cartId) {
    console.log('📦 Sending orderId and cartId', orderId, cartId);
    loadSession();
  }
}, [orderId, cartId]);


    const handlePayment = async () => {
      if (!paymentData) {
       alert('Payment info not loaded yet. Please wait.');
      return;
    }
      setLoading(true); // Start loading
      const { default: PaystackPop } = await import('@paystack/inline-js');
    const paystack = new PaystackPop();

    paystack.newTransaction({
  key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
  email: paymentData!.email,
  amount: paymentData!.amount * 100,
  currency: 'NGN',
  reference: paymentData!.reference,
  onSuccess: async (transaction) => {
    try{

      const res = await fetch(`/api/confirm/paystack-confirm?reference=${transaction.reference}`);
      if(res.status === 200){
        window.location.href = '/orders';
      }else{
        alert('Payment was not successful. Please contact support.');
         setLoading(false);
      }
      
    }catch(error){
        console.error('Error confirming payment:', error);
        alert('An error occurred while confirming your payment. Please try again.');
        setLoading(false);
    }
    
  },
  onCancel: () => {
    alert('Payment cancelled');
    setLoading(false); 
  },
});

  };

  if (loading) return (
  <div className="flex items-center space-x-2">
    <svg className="animate-spin h-5 w-5 text-blue-500" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
    </svg>
    <span>Processing payment...</span>
  </div>
);

  return <div className='flex flex-col items-center'>
       <Button  onClick={handlePayment}>Make Payment</Button>
      </div>
  ;

}
