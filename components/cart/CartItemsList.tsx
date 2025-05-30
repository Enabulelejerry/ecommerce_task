'use client'
import { Card } from '@/components/ui/card';
import { FirstColumn, SecondColumn, FourthColumn } from './CartItemColumns';
import { CartItemWithProduct } from '@/utils/types';
import ThirdColum from './ThirdColum';
import FifthColum from './FifthColum';
import SixColumn from './SixColumn';

function CartItemsList({cartItems}:{cartItems:CartItemWithProduct[]}) {
  return <div>
       {cartItems.map((cartItem) =>{
          const {id,amount,size,color} = cartItem
          const {image,name,company,price,id:productId,colors,sizes,qty} = cartItem.product
          const colorArray: string[] = JSON.parse(colors || '[]');
           const sizeArray: string[] = JSON.parse(sizes || '[]');
           const productQty = qty
        
          return  <Card key={id} className='flex flex-col gap-y-4 md:flex-row flex-wrap p-6 mb-8 gap-x-4'>
                    <FirstColumn image={image} name={name}  />
                    <SecondColumn name={name} company={company} productId={productId} price={price}  />
                    <FifthColum  color={color} id={id} availableColors={colorArray}  />
                    <SixColumn size={size} id={id} availableSizes={sizeArray} /> 
                    <ThirdColum id={id} quantity={amount} productQty={productQty}  />
                    {/* <FourthColumn price={price} /> */}
          </Card>
       })}
  </div>
}

export default CartItemsList