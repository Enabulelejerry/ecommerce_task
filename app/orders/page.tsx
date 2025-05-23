import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import SectionTitle from '@/components/global/SectionTitle';
import { fetchUserOrders } from '@/utils/actions';
import { formatCurrency, formatDate } from '@/utils/format';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

async function OrdersPage() {
  const orders = await fetchUserOrders();

  return (
	   <>
         <SectionTitle text='Your Orders' />
         <Table>
             <TableCaption>Total Orders: {orders.length}</TableCaption>
             <TableHeader>
                <TableRow>
                  <TableHead>Product Quantity</TableHead>
                   <TableHead>Order TOtal</TableHead>
                    <TableHead>Tax</TableHead>
                     <TableHead>Shipping</TableHead>
                      <TableHead>paid</TableHead>
                     <TableHead>Date</TableHead>
                    <TableHead>action</TableHead> 
                </TableRow>
             </TableHeader>
             <TableBody>
              {orders.map((order) =>{
                const {id,products,orderTotal,tax,shipping,createdAt,isPaid} =  order
                return <TableRow key={order.id}>
                          <TableCell>{products}</TableCell>
                          <TableCell>{formatCurrency(orderTotal)}</TableCell>
                          <TableCell>{formatCurrency(tax)}</TableCell>
                          <TableCell>{formatCurrency(shipping)}</TableCell>
                          <TableCell>{isPaid ? <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">paid</Badge>:
                         <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">yet to pay</Badge>
                         }</TableCell>
                          <TableCell>{formatDate(createdAt)}</TableCell>
                           <TableCell><Link href={`/orders/${order.id}`} className="text-blue-500 underline">View</Link></TableCell>
                </TableRow>
              })}
             </TableBody>
         </Table>
     </>
  )
}

export default OrdersPage