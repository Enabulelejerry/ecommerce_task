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
  color: string | null;
  availableColors: string[]; // Passed from parent
};

function FifthColum({ color, id, availableColors }: Props) {
  const [selectedColor, setSelectedColor] = useState<string>(
    color ?? availableColors[0] // fallback to first color if null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleColorChange = async (newColor: string) => {
    if (newColor === selectedColor) return;

    setIsLoading(true);
    setSelectedColor(newColor);
    toast({ description: 'Updating color...' });

    const result = await updateCartItemAction({
      cartItemId: id,
      color: newColor,
    });

    toast({ description: result.message });
    setIsLoading(false);
  };

  return (
    <div className='md:ml-8'>
      <h4 className='mb-2'>Color : </h4>
      <Select
        value={selectedColor ?? undefined}
        onValueChange={handleColorChange}
        disabled={isLoading}
      >
        <SelectTrigger className='w-[100px]'>
          <SelectValue placeholder='Select color' />
        </SelectTrigger>
        <SelectContent>
          {availableColors.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default FifthColum;
