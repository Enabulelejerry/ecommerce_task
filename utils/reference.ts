export function generatePaystackReference() {
  const timestamp = Date.now(); // current time in milliseconds
  const random = Math.floor(Math.random() * 100000); // random 5-digit number
  return `PSK-${timestamp}-${random}`;
}