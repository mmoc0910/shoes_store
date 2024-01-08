import { FC } from "react";
import Logo from "../logo/Logo";
import { Link, NavLink, useNavigate } from "react-router-dom";
import classNames from "../../utils/classNames";
import IconShoppingBag from "../../icons/IconShoppingBag";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { setAuth } from "../../store/auth/authSlice";
import { setCart } from "../../store/cart/cartSlice";

interface HeaderProps {}

const menu = [
  { to: "/", title: "Trang chủ" },
  { to: "/product/list-product", title: " Sản phẩm" },
  // { to: "/order", title: "Vận chuyển" },
];

export const Header: FC<HeaderProps> = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const { token, userName } = useSelector((state: RootState) => state.auth);
  const { quantityCart } = useSelector((state: RootState) => state.cart);
  return (
    <div className="py-10 flex items-center justify-between">
      <Logo />
      <div className="flex items-center gap-5">
        {menu.map(({ to, title }) => (
          <NavLink
            key={title}
            to={to}
            className={({ isActive }: { isActive: boolean }) =>
              classNames(
                "font-medium capitalize px-2",
                isActive ? "text-primary" : ""
              )
            }
          >
            {title}
          </NavLink>
        ))}
      </div>
      {token ? (
        <div className="flex items-stretch gap-7">
          <div className="flex items-center">
            <Link to="/cart" className="relative">
              <div className="text-xs leading-none font-bold text-primary absolute -top-1 left-full -translate-x-1">
                {quantityCart}
              </div>
              <IconShoppingBag />
            </Link>
          </div>

          <div className="flex items-center">
            <div className="w-9 h-9 rounded-full bg-slate-600" />
            <div className="ml-2">
              <span className="text-sm font-medium leading-none">
                👋 {userName}
              </span>
              <div
                className="text-sm text-primary underline cursor-pointer"
                onClick={() => {
                  dispath(setAuth({ token: undefined, userName: undefined }));
                  dispath(
                    setCart({ quantityCart: undefined, totalAmount: undefined })
                  );
                  navigate("/sign-in");
                }}
              >
                Đăng xuất
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-5">
          <Link to={"/sign-in"} className="text-primary underline">
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  );
};
