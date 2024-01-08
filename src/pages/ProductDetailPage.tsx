import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import { ProductType } from "../type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/configureStore";
import { toast } from "react-toastify";
import { setCart } from "../store/cart/cartSlice";

const ProductDetailPage = () => {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const dispath = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const [product, setProduct] = useState<ProductType>();
  //   const [qty, setQty] = useState(1);
  console.log("product id - ", product_id);
  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get<{ content: ProductType }>(
          `/product/view-detail/${product_id}`
        );
        console.log("result - ", result.data);
        setProduct(result.data.content);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [product_id]);
  const handleAddProductToCart = async (quantity: number) => {
    if (token) {
      if (quantity < 1) {
        toast.warning("Số lượng không đủ");
      } else {
        await axios.post(
          "/api/cart/addToCart",
          { productId: Number(product_id) },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await axios.get<{
          totalAmount: number;
          quantityCart: number;
        }>("/api/cart/sum-total-price", {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispath(setCart(result.data));
        console.log("result - ", result.data);
        toast.success("Thêm giỏ hàng thành công");
      }
    } else {
      navigate("/sign-in");
    }
  };
  if (product) {
    const {
      product_name,
      product_description,
      quantity,
      export_price,
      image_url,
      size: { size_number },
      brand: { name: brand_name },
      color: { name: color_name },
    } = product;
    return (
      <div className="w-full grid grid-cols-10 gap-7">
        <img
          src={image_url}
          alt={product_name}
          className="col-span-5 h-[350px] w-full object-cover rounded-xl"
        />
        <div className="col-span-5 space-y-2">
          <h2 className="text-xl font-semibold">{product_name}</h2>
          <p className="text-xl font-semibold">${export_price}</p>
          <div className="w-full">
            <table className="table-auto border-collapse border-2 border-slate-400 rounded-xl">
              <thead>
                <tr>
                  <td className="font-medium text-start text-primary20 border-collapse border border-slate-400 px-2 py-1">
                    Thương hiệu
                  </td>
                  <td className="font-medium text-start text-primary20 border-collapse border border-slate-400 px-2 py-1">
                    màu sắc
                  </td>
                  <td className="font-medium text-start text-primary20 border-collapse border border-slate-400 px-2 py-1">
                    Size
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-start border-collapse border border-slate-400 px-2 py-1">
                    {brand_name}
                  </td>
                  <td className="text-start border-collapse border border-slate-400 px-2 py-1">
                    {color_name}
                  </td>
                  <td className="text-start border-collapse border border-slate-400 px-2 py-1">
                    {size_number}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="">{product_description}</p>
          {/* <div className="flex items-center border border-black rounded-sm w-fit">
            <span
              className="py-1 border-r border-r-black px-1"
              onClick={() => setQty((prev) => (prev > 1 ? prev - 1 : prev))}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="w-10 text-center leading-none">{qty}</span>
            <span
              className="py-1 border-l border-l-black px-1"
              onClick={() =>
                setQty((prev) => (prev < quantity ? prev + 1 : prev))
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div> */}
          <div className="flex items-center gap-5 pt-5">
            <button
              className="bg-primary rounded-lg px-4 py-3 leading-none text-white font-medium"
              onClick={() => handleAddProductToCart(quantity)}
            >
              Thêm giỏ hàng
            </button>
            <button
              className="bg-primary rounded-lg px-4 py-3 leading-none text-white font-medium"
              onClick={async () => {
                await handleAddProductToCart(quantity);
                navigate("/cart");
              }}
            >
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    );
  }
  return;
};

export default ProductDetailPage;
