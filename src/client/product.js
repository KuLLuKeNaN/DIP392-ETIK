import { getToken } from './utils.js';

export async function getAllProducts() {
  const res = await fetch('https://dip392-etik.onrender.com/api/products');
  return await res.json();
}

export async function createProduct(productData) {
  const token = getToken();
  const res = await fetch('https://dip392-etik.onrender.com/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  });
  return await res.json();
}
