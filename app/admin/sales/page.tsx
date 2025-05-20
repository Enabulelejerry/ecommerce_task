
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge'

import { fetchAdminOrders } from '@/utils/actions';
import { formatCurrency, formatDate } from '@/utils/format';
import Link from 'next/link';

async function SalesPage() {
  const orders = await fetchAdminOrders()
  return (
	    <Table>
          <TableCaption>Total Orders :{orders.length}</TableCaption>
          <TableHeader>
            <TableHead>Email</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Order Total</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead>Shipping</TableHead>
             <TableHead>paid</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>action</TableHead>
          </TableHeader>
          <TableBody>
            {orders.map((order)=>{
               const {products,orderTotal,tax,shipping,createdAt,email,isPaid} = order
               return <TableRow key={order.id}>
                         <TableCell>{email}</TableCell>
                         <TableCell>{products}</TableCell>
                         <TableCell>{formatCurrency(orderTotal)}</TableCell>
                         <TableCell>{formatCurrency(tax)}</TableCell>
                         <TableCell>{formatCurrency(shipping)}</TableCell>
                         <TableCell>{isPaid ? <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">paid</Badge>:
                         <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">yet to pay</Badge>
                         }</TableCell>
                         <TableCell>{formatDate(createdAt)}</TableCell>
                          <TableCell><Link href={`/admin/sales/${order.id}`} className="text-blue-500 underline">View</Link></TableCell>
                            
               </TableRow>
            })}
          </TableBody>
      </Table>
  )
}

export default SalesPage