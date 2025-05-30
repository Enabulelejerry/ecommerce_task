import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
  } from '@/components/ui/select';
  
  export enum Mode {
	SingleProduct = 'singleProduct',
	CartItem = 'cartItem',
  }
  
  type SelectProductAmountProps = {
	mode: Mode.SingleProduct;
	amount: number;
	productQty: number;
	setAmount: (value: number) => void;
  };
  
  type SelectCartItemAmountProps = {
	mode: Mode.CartItem;
	amount: number;
	productQty: number;
	setAmount: (value: number) => Promise<void>;
	isLoading: boolean;
  };
  
  function SelectProductAmount(
	props: SelectProductAmountProps | SelectCartItemAmountProps
  ) {
	const { mode, amount, setAmount,productQty } = props;
  
	const cartItem = mode === Mode.CartItem;
  
	return (
    <Select
      value={amount.toString()}
      onValueChange={(value) => setAmount(Number(value))}
    //   disabled={cartItem}
    >
      <SelectTrigger className={cartItem ? 'w-[100px]' : 'w-[150px]'}>
        <SelectValue placeholder={amount.toString()} />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: productQty }, (_, index) => {
          const selectValue = (index + 1).toString();
          return (
            <SelectItem key={index} value={selectValue}>
              {selectValue}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
  }

export default SelectProductAmount