import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/configureStore";
import { Label } from "../components/label";
import { Input, Textarea } from "../components/input";
import Button from "../components/button/Button";
import { CartType, PaymentType } from "../type";
import axios from "../api/axios";
import _ from "lodash";
import { toast } from "react-toastify";
import { setCart } from "../store/cart/cartSlice";

const schema = yup
  .object({
    receiverName: yup.string().required("Họ và tên không được để trống"),
    receiverPhone: yup.string().required("Số điện thoại không được để trống"),
    receiverAddress: yup.string().required("Địa chỉ không được để trống"),
    orderDescription: yup.string(),
    paymentId: yup
      .number()
      .required("Phương thức thanh toán không được để trống"),
  })
  .required();

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const [payments, setPayments] = useState<PaymentType[]>([]);
  const [carts, setCarts] = useState<CartType[]>([]);
  // console.log("auth - ", auth);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  useEffect(() => {
    if (!auth?.token) {
      navigate("/sign-in");
    }
  }, [navigate, auth]);
  useEffect(() => {
    if (auth?.token) {
      (async () => {
        try {
          fetchDataCart();
          const result = await axios.get<{ content: PaymentType[] }>(
            "/order/method/get-all"
          );
          console.log("result payments - ", result.data);
          setPayments(result.data.content);
        } catch (error) {
          console.log("error - ", error);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  const fetchDataCart = async () => {
    try {
      const result = await axios.get("/api/cart/user", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      console.log("result carts - ", result.data);
      setCarts(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (data: {
    receiverName: string;
    receiverPhone: string;
    receiverAddress: string;
    orderDescription?: string;
    paymentId: number;
  }) => {
    try {
      console.log("data - ", data);
      await axios.post(
        "/order/check-out",
        { ...data, shipPrice: 20000 },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      const result = await axios.get<{
        totalAmount: number;
        quantityCart: number;
      }>("/api/cart/sum-total-price", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      dispatch(setCart(result.data));
      console.log("result checkout - ", result.data);
      toast.success("Đặt hàng thành công");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateQuantity = _.debounce(
    async (_id: number, quantity: number) => {
      console.log("abc - ", _id, quantity);
      try {
        const result = await axios.put(
          `/api/cart/update-quantity/${_id}?quantity=${quantity}`,
          undefined,
          { headers: { Authorization: `Bearer ${auth.token}` } }
        );
        fetchDataCart();
        console.log("result update quantity - ", result.data);
      } catch (error) {
        console.log(error);
        toast.error("Xảy ra lỗi khi trong khi cập nhập giỏ hàng");
      }
    },
    750
  );
  return (
    <div className="grid grid-cols-10 gap-5">
      <div className="col-span-7 space-y-7">
        <h2 className="text-lg font-medium">Giỏ hàng</h2>
        {carts.length > 0 && (
          <>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  {/* <th className="font-medium text-start px-4"></th> */}
                  <th className="font-medium text-start px-4">Hình ảnh</th>
                  <th className="font-medium text-start px-4">Tên</th>
                  <th className="font-medium text-start px-4">Số lượng</th>
                  <th className="font-medium text-start px-4">Tổng</th>
                  <th className="font-medium text-start px-4"></th>
                </tr>
              </thead>
              <tbody>
                {carts.map(
                  ({
                    image,
                    price,
                    productName,
                    quantity,
                    total,
                    productId,
                  }) => (
                    <tr key={productId}>
                      {/* <td className="py-4 px-4">
                        <input type="checkbox" value={1} />
                      </td> */}
                      <td className="py-4 px-4">
                        <img
                          src={image}
                          alt={productName}
                          className="w-16 aspect-square object-cover rounded-md"
                        />
                      </td>
                      <td className="py-4 px-4 font-medium">
                        {productName} x ${price}
                      </td>
                      <td className="py-4 px-4">
                        <input
                          type="number"
                          min={1}
                          defaultValue={quantity}
                          className="outline-none border border-gray-700 rounded-lg w-14 px-2 py-2 leading-none"
                          onChange={(e) => {
                            console.log("e - ", e.target.value);
                            handleUpdateQuantity(
                              productId,
                              Number(e.target.value)
                            );
                          }}
                        />
                      </td>
                      <td className="py-4 px-4 font-medium">${total}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-4">
                          <span
                            className="text-primary underline decoration-primary font-medium cursor-pointer"
                            onClick={async () => {
                              try {
                                await axios.delete(`/api/cart/${productId}`, {
                                  headers: {
                                    Authorization: `Bearer ${auth.token}`,
                                  },
                                });
                                const result = await axios.get<{
                                  totalAmount: number;
                                  quantityCart: number;
                                }>("/api/cart/sum-total-price", {
                                  headers: {
                                    Authorization: `Bearer ${auth.token}`,
                                  },
                                });
                                dispatch(setCart(result.data));
                                fetchDataCart();
                              } catch (error) {
                                console.log("error - ", error);
                                toast.error("Xảy ra lỗi trong quá trình xử lý");
                              }
                            }}
                          >
                            Xóa
                          </span>
                          {/* <span className="text-primary underline decoration-primary font-medium cursor-pointer">
                            Cập nhật
                          </span> */}
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <div>
              <p className="font-medium text-lg">
                Tổng tiền: $
                {carts
                  .map((cart) => cart.total)
                  .reduce((prev, curr) => prev + curr)}
              </p>
            </div>
          </>
        )}
        {carts.length === 0 && <div>Chưa có sản phẩm nào trong giỏ hàng</div>}
      </div>
      <div className="col-span-3 space-y-7">
        <h2 className="text-lg font-medium">Thanh toán</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-[15px] md:space-y-5"
        >
          <div className="flex flex-col gap-[10px]">
            <Label htmlFor="receiverName">Họ và tên*</Label>
            <Input
              name="receiverName"
              placeholder={"Họ và tên"}
              control={control}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <Label htmlFor="receiverPhone">Số điện thoại*</Label>
            <Input
              name="receiverPhone"
              placeholder={"Số điện thoại"}
              control={control}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <Label htmlFor="receiverAddress">Địa chỉ*</Label>
            <Input
              name="receiverAddress"
              placeholder={"Địa chỉ"}
              control={control}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <Label htmlFor="receiverAddress">Phương thức thanh toán*</Label>
            {payments.length > 0 &&
              payments.map(({ id, method_name }) => (
                <div className="flex items-center gap-2" key={id}>
                  <input
                    {...register("paymentId")}
                    type="radio"
                    value={id}
                    id={method_name}
                  />
                  <label htmlFor={method_name}>{method_name}</label>
                </div>
              ))}
            {errors?.paymentId?.message && (
              <p className="text-sm bg-white dark:bg-dark-secondary leading-none text-error">
                {errors.paymentId.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-[10px]">
            <Label htmlFor="orderDescription">Ghi chú*</Label>
            <Textarea
              name="orderDescription"
              control={control}
              placeholder="Ghi chú"
              className="!min-h-[90px] outline-none"
            />
          </div>
          <Button type="submit" className="w-full text-white bg-primary">
            Đặt hàng
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CartPage;
