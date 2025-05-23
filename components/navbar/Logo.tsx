import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import {VscCode} from 'react-icons/vsc'
import logo from '@/public/images/logo.jpg';
import Image from 'next/image';

function Logo() {
  return (
	
    <Link href='/'>
    <Image src={logo} alt="Logo" width={50} height={50} className="rounded-full" />
    {/* // <VscCode className='w-6 h-6' /> */}
    </Link>
  
  )
}

export default Logo