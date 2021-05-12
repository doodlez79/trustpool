export const paymentStatus = (i:string) => {
  if (i === 'completed') {
    return 'paid';
  }
  return ('unknown');
};
