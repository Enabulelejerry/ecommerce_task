'use client';

import { useState } from 'react';
import { updateCartItemAction } from '@/utils/actions';
import { useToast } from '../ui/use-toast';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

type Props = {
  id: string;
  size: string | null;
  availableSizes: string[]; // Passed from parent
};

function SixColum({ size, id, availableSizes }: Props) {
  const [selectedSize, setSelectedSize] = useState<string>(
    size ?? availableSizes[0] // fallback to first color if null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSizeChange = async (newSize: string) => {
    if (newSize === selectedSize) return;

    setIsLoading(true);
    setSelectedSize(newSize);
    toast({ description: 'Updating Size...' });

    const result = await updateCartItemAction({
      cartItemId: id,
      size: newSize,
    });

    toast({ description: result.message });
    setIsLoading(false);
  };

  return (
    <div className='md:ml-8'>
      <h4 className='mb-2'>Size: </h4>
      <Select
        value={selectedSize ?? undefined}
        onValueChange={handleSizeChange}
        disabled={isLoading}
      >
        <SelectTrigger className='w-[100px]'>
          <SelectValue placeholder='Select color' />
        </SelectTrigger>
        <SelectContent>
          {availableSizes.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SixColum;