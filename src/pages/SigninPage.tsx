import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import LayoutAuthentication from "../layouts/LayoutAuthentication";
import { Link, useNavigate } from "react-router-dom";
import { useToogleValue } from "../hooks/useToogleValue";
import { Label } from "../components/label";
import { Input } from "../components/input";
import Button from "../components/button/Button";
import ButtonGoogle from "../components/button/ButtonGoogle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/configureStore";
import axios from "../api/axios";
import { setAuth } from "../store/auth/authSlice";
import { useEffect } from "react";
import IconEyeToogle from "../icons/IconEyeToogle";
import { setCart } from "../store/cart/cartSlice";

const schema = yup
  .object({
    userName: yup.string().required("Tên đăng nhập không được để trống"),
    password: yup
      .string()
      .required("Mật khẩu không được để trống")
      .min(8, "Mật khẩu tối thiểu 8 ký tự"),
  })
  .required();
function SigninPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  console.log("auth - ", auth);
  const { value: tooglePassword, handleToogleValue: handleTooglePassword } =
    useToogleValue();
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  useEffect(() => {
    if (auth.token) {
      (async () => {
        try {
          const result = await axios.get<{
            totalAmount: number;
            quantityCart: number;
          }>("/api/cart/sum-total-price", {
            headers: { Authorization: `Bearer ${auth.token}` },
          });
          dispatch(setCart(result.data));
        } catch (error) {
          console.log(error);
        }
      })();
      navigate("/");
    }
  }, [navigate, auth]);
  const onSubmit = async (data: { userName: string; password: string }) => {
    try {
      console.log("data - ", data);
      const result = await axios.post("/account/login", data);
      console.log("result - ", result.data);
      dispatch(setAuth({ userName: data.userName, token: result.data.data }));
    } catch (error) {
      console.log(error);
    }
  };
  if (auth.token) return;
  return (
    <LayoutAuthentication>
      <p className="mb-[25px] md:mb-[30px] text-xs font-normal text-center md:text-sm md:font-medium text-text3">
        Bạn chưa có tài khoản?{" "}
        <Link
          to={"/sign-up"}
          className="inline font-medium underline text-primary"
        >
          Đăng ký
        </Link>
      </p>
      <ButtonGoogle text="Đăng nhập với google" />
      <form
        className="space-y-[15px] md:space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-[10px]">
          <Label htmlFor="email">Tên đăng nhập*</Label>
          <Input
            name="userName"
            placeholder={"Tên đăng nhập"}
            control={control}
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <Label htmlFor="password">Mật khẩu*</Label>
          <Input
            type={tooglePassword ? "text" : "password"}
            name="password"
            placeholder={"Nhập mật khẩu"}
            control={control}
          >
            <IconEyeToogle
              className="absolute -translate-y-1/2 cursor-pointer right-5 top-1/2"
              open={tooglePassword}
              onClick={handleTooglePassword}
            ></IconEyeToogle>
          </Input>
        </div>
        <div className="flex justify-end">
          <p className="text-sm font-medium cursor-pointer select-none text-primary">
            Quên mật khẩu
          </p>
        </div>
        <Button type="submit" className="w-full text-white bg-primary">
          Đăng nhập
        </Button>
      </form>
    </LayoutAuthentication>
  );
}

export default SigninPage;
