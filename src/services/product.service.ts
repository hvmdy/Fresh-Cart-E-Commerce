const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

export async function getAllProducts() {
  const response = await fetch(`${baseurl}/api/v1/products`);

  const data = await response.json();

  return data;
}

export async function getProductDetails(productId: string) {
  const response = await fetch(`${baseurl}/api/v1/products/${productId}`);
  const data = await response.json();
  return data;
}

export async function getUserOrders(userId: string) {
  const response = await fetch(`${baseurl}/api/v1/orders/user/${userId}`);
  const data = await response.json();
  return data;
}
