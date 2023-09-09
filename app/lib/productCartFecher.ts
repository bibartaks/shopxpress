export default function getProductData() {
  const res = fetch('https://fakestoreapi.com/products')
  return res.then((response) => response.json())
}
