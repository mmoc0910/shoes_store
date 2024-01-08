import Logo from "../logo/Logo";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-3">
        <Logo className="text-white" />
      </div>
      <div className="col-span-3 space-y-3">
        <p className="text-lg font-medium uppercase">Liên kết</p>
        <div className="space-y-2 flex flex-col">
          <Link to="/">Facebook online shoes store</Link>
          <Link to="/">Facebook Sole station</Link>
          <Link to="/">Chính sách đổi trả</Link>
          <Link to="/">Liên hệ</Link>
        </div>
      </div>
      <div className="col-span-3 space-y-3">
        <p className="text-lg font-medium uppercase">Thông tin liên hệ</p>
        <div className="space-y-2 flex flex-col">
          <Link to="/">
            P. Phùng Khoang, Trung Văn, Nam Từ Liêm, Hà Nội, Việt Nam
          </Link>
          <Link to="/">0123456789</Link>
          <Link to="/">email@gmail.com</Link>
        </div>
      </div>
      <div className="col-span-3 space-y-3">
        <p className="text-lg font-medium uppercase">Facebook online store</p>
        <div className="w-full bg-white h-[120px]" />
      </div>
    </div>
  );
}
