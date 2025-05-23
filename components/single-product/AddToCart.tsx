'use client';
import { useState } from 'react';
import SelectProductAmount from './SelectProductAmount';
import { Mode } from './SelectProductAmount';
import FormContainer from '../form/FormContainer';
import { SubmitButton } from '../form/Buttons';
import { addToCartAction } from '@/utils/actions';
import { SelectItem, SelectLabel } from "@/components/ui/select"
import { SelectContent } from "@/components/ui/select"
import { SelectValue } from "@/components/ui/select"
import { SelectTrigger } from "@/components/ui/select"
import { Select } from "@/components/ui/select"
import { useAuth } from '@clerk/nextjs';
import { ProductSignInButton } from '../form/Buttons';


type AddToCartProps = {
  productId: string;
  colors: string[];
  sizes: string[];
};

function AddToCart({ productId, colors, sizes }: AddToCartProps) {
  const [amount,setAmount] = useState(1);
  const {userId} =  useAuth(); 
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  return  (
         <div className='mt-4 space-y-4'>
             {/* Color Selection */}
      {colors.length > 0 && (
        <Select onValueChange={setSelectedColor}>
          <SelectTrigger className='w-[200px]'>
            <SelectValue placeholder='Select color' />
          </SelectTrigger>
          <SelectContent>
            {colors.map((color) => (
              <SelectItem key={color} value={color}>
                {color}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Size Selection */}
      {sizes.length > 0 && (
         
        <Select onValueChange={setSelectedSize}>
          <SelectTrigger className='w-[200px]'>
            <SelectValue placeholder='Select size' />
          </SelectTrigger>
          <SelectContent>
            {sizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
            <SelectProductAmount mode={Mode.SingleProduct} amount={amount} setAmount={setAmount} />
            {userId ? 
            <FormContainer action={addToCartAction}>
               <input type='hidden' name='productId' value={productId} />
               <input type='hidden' name='amount' value={amount} />
                <input type='hidden' name='color' value={selectedColor} />
                <input type='hidden' name='size' value={selectedSize} />
               <SubmitButton text='add to cart' className='mt-8' />
            </FormContainer>:
            <ProductSignInButton/>}

         </div>
  )
}

export default AddToCart