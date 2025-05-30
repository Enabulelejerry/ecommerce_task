'use client';
import { useState } from 'react';
import SelectProductAmount from '../single-product/SelectProductAmount';
import { Mode } from '../single-product/SelectProductAmount';
import FormContainer from '../form/FormContainer';
import { SubmitButton } from '../form/Buttons';
import { removeCartItemAction, updateCartItemAction } from '@/utils/actions';
import { useToast } from '../ui/use-toast';

function ThirdColum({quantity,id,productQty}:{quantity:number;id:string,productQty:number}) {
  const [amount,setAmount] = useState(quantity)
  const [isLoading,setIsLoading] = useState(false);
  const {toast} = useToast()
  const handleAmountChange = async(value:number) =>{
    setIsLoading(true)
    toast({description:'Calculating...'})
    const result = await updateCartItemAction({
      amount:value,cartItemId:id
    })
     setAmount(value)
     toast({description:result.message})
  } 
  return  <div className='md:ml-8'>
             <h3>Qty</h3>
            <SelectProductAmount
              amount={amount}
              productQty={productQty}
              setAmount={handleAmountChange}
              mode={Mode.CartItem}
              isLoading={false}
            />
           <FormContainer action={removeCartItemAction}>
               <input type='hidden' name='id' value={id}  />
                <SubmitButton size='sm' className='mt-4' text='remove item ' />
            </FormContainer> 
  </div>
}

export default ThirdColum