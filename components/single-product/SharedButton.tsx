'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '../ui/button';
import { LuShare2 } from 'react-icons/lu';

import {
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  EmailIcon,
  LinkedinIcon,
} from 'react-share';

import React from 'react'

function SharedButton({productId,name}:{productId:string;name:string}) {
  const url  =  process.env.NEXT_PUBLIC_WEBSITE_URL;
  const shareLink = `${url}/products/${productId}`

  return <Popover>
         <PopoverTrigger asChild>
           <Button variant='outline'size='icon'className='p-3'>
             <LuShare2 />
           </Button>
         </PopoverTrigger>
         <PopoverContent side='top' align='end' sideOffset={10} className='flex items-center gap-x-2 justify-center w-full'>
            <TwitterShareButton url={shareLink} title={name}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton url={shareLink} title={name}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>

            <FacebookShareButton url={shareLink} title={name}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
           </PopoverContent>
        </ Popover>

  
}
export default SharedButton
