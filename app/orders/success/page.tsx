"use client";

import { useSearchParams } from "next/navigation";

export default function OrderSuccessPage() {
  const params = useSearchParams();
  const orderId = params.get("orderId");

  return (
    <div className="max-w-xl mx-auto py-20 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-600">
        🎉 Payment Successful!
      </h1>
      <p className="text-lg mb-2">Thank you for your purchase.</p>
      {orderId && (
        <p className="text-muted-foreground">
          Order ID: <strong>{orderId}</strong>
        </p>
      )}
      <a
        href="/"
        className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-green-700 transition"
      >
        Go to Homepage
      </a>
    </div>
  );
}
