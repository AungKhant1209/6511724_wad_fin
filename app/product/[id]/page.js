import { useEffect, useState } from "react";

export default function ProductDetailPage({ params }) {
  const [product, setProduct] = useState(null);
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(`${API_BASE}/product/${params.id}`, { cache: "no-store" });
      const productData = await response.json();
      setProduct(productData);
    }

    fetchProduct();
  }, [params.id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="m-4">
      <h1>Product Details</h1>
      <p className="font-bold text-xl text-blue-800">{product.name}</p>
      <p>{product.description}</p>
      <p>{product.price} Baht</p>
      <p>Category: {product.category.name}</p>
    </div>
  );
}
