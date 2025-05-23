import { getOrderWithProducts } from '@/utils/actions';
import Image from 'next/image';
import React from 'react';

async function UserOrderView({ params }: { params: { id: string } }) {
  const order = await getOrderWithProducts(params.id);

  return (
	<div className="p-6 max-w-4xl mx-auto">
	  <div className="mb-6 border-b pb-4">
		<h1 className="text-2xl font-bold mb-2">Order #{order?.id}</h1>
		<div className="text-sm text-gray-600 space-y-1">
		  <p><span className="font-medium">Status:</span> {order?.isPaid ? 'Paid' : 'Unpaid'}</p>
		  <p><span className="font-medium">Total:</span> N{order?.orderTotal}</p>

		</div>
	  </div>

	  <h2 className="text-xl font-semibold mb-4">Products in Order</h2>

	  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
		{order?.OrderItems.map((item: any) => (
		  <div key={item.id} className="flex gap-4 border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition">
			<div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
			  <Image
				src={item.product.image}
				alt={item.product.name}
				fill
				sizes="(max-width: 768px) 100vw, 200px"
				className="object-cover"
			  />
			</div>
			<div className="flex flex-col justify-between">
			  <div>
				<h3 className="text-md font-semibold text-gray-800">{item.product.name}</h3>
				<p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
				<p className="text-sm text-gray-600">Size: {item.size}</p>
				<p className="text-sm text-gray-600">Color: {item.color}</p>
			  </div>
			  <p className="text-sm font-medium text-green-600 mt-1">N{item.product.price}</p>
			</div>
		  </div>
		))}
	  </div>
	</div>
  );
}

export default UserOrderView;
