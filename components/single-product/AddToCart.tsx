import React from 'react'
import { Button } from '../ui/button'

function AddToCart({productId}:{productId:string}) {
  return  <Button className='capitalize mt-8' size='lg'>add to card</Button>
}

export default AddToCart