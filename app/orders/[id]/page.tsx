import { getOrderWithProducts } from "@/utils/actions";
import Image from "next/image";
import React from "react";

type ShippingDetails = {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  state: string;
  deliveryType: string;
  shippingMethod: string;
};

async function UserOrderView({ params }: { params: { id: string } }) {
  const order = await getOrderWithProducts(params.id);
  const shipping = order?.shippingDetails as ShippingDetails;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Order Summary */}
      <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          🧾 Order #{order?.id}
        </h1>
        <div className="text-sm text-gray-700 grid grid-cols-2 sm:grid-cols-3 gap-3">
          <p>
            <span className="font-medium text-gray-900">Status:</span>{" "}
            {order?.isPaid ? "✅ Paid" : "❌ Unpaid"}
          </p>
          <p>
            <span className="font-medium text-gray-900">Total:</span> ₦
            {order?.orderTotal}
          </p>
          <p>
            <span className="font-medium text-gray-900">Delivery Type:</span>{" "}
            {order?.deliveryType}
          </p>
          <p>
            <span className="font-medium text-gray-900">Shipping Method:</span>{" "}
            {order?.shippingMethod}
          </p>
          <p>
            <span className="font-medium text-gray-900">Shipping Cost:</span> ₦
            {order?.shipping}
          </p>
        </div>
      </div>

      {/* Shipping Info */}
      {shipping && (
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
            🚚 Shipping Information
          </h2>
          <div className="text-sm text-gray-700 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <p>
              <span className="font-medium text-gray-900">Full Name:</span>{" "}
              {shipping.firstName} {shipping.lastName}
            </p>
            <p>
              <span className="font-medium text-gray-900">Phone:</span>{" "}
              {shipping.phone}
            </p>
            <p>
              <span className="font-medium text-gray-900">Address:</span>{" "}
              {shipping.address}
            </p>
            <p>
              <span className="font-medium text-gray-900">State:</span>{" "}
              {shipping.state}
            </p>
            <p>
              <span className="font-medium text-gray-900">Delivery Type:</span>{" "}
              {shipping.deliveryType}
            </p>
            <p>
              <span className="font-medium text-gray-900">
                Shipping Method:
              </span>{" "}
              {shipping.shippingMethod}
            </p>
          </div>
        </div>
      )}

      {/* Order Items */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          📦 Products in Order
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {order?.OrderItems.map((item: any) => (
            <div
              key={item.id}
              className="flex gap-4 border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="relative w-24 h-24 flex-shrink-0 rounded overflow-hidden border">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 200px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-md font-semibold text-gray-800">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <p className="text-sm text-gray-600">Color: {item.color}</p>
                </div>
                <p className="text-sm font-semibold text-green-600 mt-2">
                  ₦{item.product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserOrderView;
