import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import LayoutAuthentication from "../layouts/LayoutAuthentication";
import { Link, useNavigate } from "react-router-dom";
import { useToogleValue } from "../hooks/useToogleValue";
import { Label } from "../components/label";
import { Input } from "../components/input";
import IconEyeToogle from "../icons/IconEyeToogle";
import Button from "../components/button/Button";
import ButtonGoogle from "../components/button/ButtonGoogle";
import axios from "../api/axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
import { useEffect } from "react";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email không được để trống")
      .email("Sai định dạng email"),
    userName: yup.string().required("Tên đăng nhập không được để trống"),
    password: yup
      .string()
      .required("Mật khẩu không được để trống")
      .min(8, "Mật khẩu tối thiểu 8 ký tự"),
  })
  .required();
function SignupPage() {
  const auth = useSelector((state: RootState) => state.auth);
  console.log("auth - ", auth);
  const navigate = useNavigate();
  const { value: tooglePassword, handleToogleValue: handleTooglePassword } =
    useToogleValue();
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  useEffect(() => {
    if (auth.token) {
      navigate("/");
    }
  }, [navigate, auth]);
  const onSubmit = async (data: {
    email: string;
    userName: string;
    password: string;
  }) => {
    try {
      console.log("data - ", data);
      const result = await axios.post("/account/register", data);
      console.log("result - ", result.data);
      toast.success("Đăng ký tài khoản thành công");
      navigate("/sign-in");
      //   dispatch(login(data));
    } catch (error) {
      console.log(error);
    }
  };
  if (auth.token) return;
  return (
    <LayoutAuthentication>
      <p className="mb-[25px] md:mb-[30px] text-xs font-normal text-center md:text-sm md:font-medium text-text3">
        Bạn đã có tài khoản?{" "}
        <Link
          to={"/sign-in"}
          className="inline font-medium underline text-primary"
        >
          Đăng nhập
        </Link>
      </p>
      <ButtonGoogle text="Đăng ký với google" />
      <form
        className="space-y-[15px] md:space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-[10px]">
          <Label htmlFor="email">Email*</Label>
          <Input
            name="email"
            placeholder={"example@gmail.com"}
            control={control}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <Label htmlFor="userName">Tên đăng nhập*</Label>
          <Input
            name="userName"
            placeholder={"your username"}
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
        <Button type="submit" className="w-full text-white bg-primary">
          Đăng ký
        </Button>
      </form>
    </LayoutAuthentication>
  );
}

export default SignupPage;
