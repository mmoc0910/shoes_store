import { useEffect, useState } from "react";
import { BrandType, CategoryType, ColorType, ProductType } from "../type";
import axios from "../api/axios";
import ProductCard from "../components/product/ProductCard";

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [colors, setColors] = useState<ColorType[]>([]);
  const [brands, setBrands] = useState<BrandType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [colorSelects, setColorSelects] = useState<string[]>([]);
  const [brandSelects, setBrandSelects] = useState<string[]>([]);
  const [categorySelects, setCategorySelects] = useState<string[]>([]);
  console.log("brand ids - ", colorSelects, brandSelects, categorySelects);
  const filterProducts =
    colorSelects.length === 0 &&
    brandSelects.length === 0 &&
    categorySelects.length === 0
      ? products
      : colorSelects.length > 0 &&
        brandSelects.length > 0 &&
        categorySelects.length > 0
      ? products.filter(
          (product) =>
            colorSelects.some((item) => Number(item) === product.color.id) &&
            brandSelects.some((item) => Number(item) === product.brand.id) &&
            categorySelects.some(
              (item) => Number(item) === product.product_category[0].category.id
            )
        )
      : products.filter((product) => {
          if (
            categorySelects.length === 0 &&
            brandSelects.length === 0 &&
            colorSelects.length > 0 &&
            colorSelects.some((item) => Number(item) === product.color.id)
          )
            return product;
          if (
            categorySelects.length > 0 &&
            brandSelects.length === 0 &&
            colorSelects.length === 0 &&
            categorySelects.some(
              (item) => Number(item) === product.product_category[0].category.id
            )
          )
            return product;
          if (
            categorySelects.length === 0 &&
            brandSelects.length > 0 &&
            colorSelects.length === 0 &&
            brandSelects.some((item) => Number(item) === product.brand.id)
          )
            return product;
          //---------------
          if (
            categorySelects.length > 0 &&
            brandSelects.length > 0 &&
            colorSelects.length === 0 &&
            brandSelects.some((item) => Number(item) === product.brand.id) &&
            categorySelects.some(
              (item) => Number(item) === product.product_category[0].category.id
            )
          )
            return product;
          if (
            categorySelects.length === 0 &&
            brandSelects.length > 0 &&
            colorSelects.length > 0 &&
            brandSelects.some((item) => Number(item) === product.brand.id) &&
            colorSelects.some((item) => Number(item) === product.color.id)
          )
            return product;
          if (
            categorySelects.length > 0 &&
            brandSelects.length === 0 &&
            colorSelects.length > 0 &&
            brandSelects.some((item) => Number(item) === product.brand.id) &&
            categorySelects.some(
              (item) => Number(item) === product.product_category[0].category.id
            )
          )
            return product;
        });
  console.log("vvvvvvvvvvvvvv - ", filterProducts);
  useEffect(() => {
    (async () => {
      try {
        const [resultProducts, resultBrands, resultColors, resultCategories] =
          await Promise.all([
            axios.get<{ content: ProductType[] }>("/product/get"),
            axios.get<{ content: BrandType[] }>("/brand/get"),
            axios.get<{ content: ColorType[] }>("/color/get"),
            axios.get<{ content: ColorType[] }>("/category/get"),
          ]);
        console.log("result products - ", resultProducts.data);
        console.log("result brands - ", resultBrands.data);
        console.log("result colors - ", resultColors.data);
        setProducts(resultProducts.data.content);
        setColors(resultColors.data.content);
        setBrands(resultBrands.data.content);
        setCategories(resultCategories.data.content);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="grid grid-cols-10 gap-10">
      <form
        className="space-y-5 col-span-2"
        onSubmit={(e) => {
          e.preventDefault();
          const brand_ids = [...e.target.elements["brand"]]
            .filter((item) => item.checked)
            .map((item) => item.value);
          const color_ids = [...e.target.elements["color"]]
            .filter((item) => item.checked)
            .map((item) => item.value);
          const category_ids = [...e.target.elements["category"]]
            .filter((item) => item.checked)
            .map((item) => item.value);
          setBrandSelects(brand_ids);
          setColorSelects(color_ids);
          setCategorySelects(category_ids);
        }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Bộ lọc</h2>
          <button
            type="submit"
            className="px-3 py-2 rounded-lg bg-primary text-white font-medium text-sm leading-none"
          >
            Áp dụng
          </button>
        </div>
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="font-medium">Thương hiệu</p>
            <div className="space-y-2">
              {brands.length > 0 &&
                brands.map((brand) => (
                  <div className="flex items-center gap-3" key={brand.id}>
                    <input
                      type="checkbox"
                      name="brand"
                      value={brand.id}
                      id={brand.name}
                    />
                    <label htmlFor={brand.name}>{brand.name}</label>
                  </div>
                ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-medium">Danh mục</p>
            <div className="space-y-2">
              {categories.length > 0 &&
                categories.map(({ id, description, name }) => (
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="category"
                      value={id}
                      id={name || description}
                    />
                    <label>{name || description}</label>
                  </div>
                ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-medium">Màu sắc</p>
            <div className="space-y-2">
              {colors.length > 0 &&
                colors.map(({ id, name, description }) => (
                  <div className="flex items-center gap-3" key={id}>
                    <input type="checkbox" name="color" value={id} id={name} />
                    <label htmlFor={name}>{name || description}</label>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </form>
      <div className="space-y-5 col-span-8">
        <h2 className="text-lg font-medium">Sản phẩm</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-14">
          {filterProducts.length > 0 &&
            filterProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
