

export const formatCurrency = (amount: number | null) => {
  const value = amount || 0;
  return new Intl.NumberFormat('en-NG', {  // Nigerian English locale
    style: 'currency',
    currency: 'NGN',                        // Nigerian Naira currency code
  }).format(value);
};


  export const formatDate = (date:Date) =>{
	return new Intl.DateTimeFormat('en-us',{
		year:'numeric',month:'long',day:'numeric'
	}).format(date)
  }