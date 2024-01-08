import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { ProductType } from "../../type";
import axios from "../../api/axios";

const ProductHomePage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get<{ content: ProductType[] }>(
          "/product/get"
        );
        console.log("result - ", result.data);
        setProducts(result.data.content);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="mt-10">
      <h2 className="font-semibold text-xl mb-5">Sản phẩm</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-14">
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default ProductHomePage;
