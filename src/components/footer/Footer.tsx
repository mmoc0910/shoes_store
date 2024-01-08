import Logo from "../logo/Logo";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faFacebook,faInstagram,faTiktok} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-3 space-y-3">
        <p className="text-lg font-medium uppercase">Mạng xã hội</p>
        <div className="space-y-2 flex flex-col">
          <Link to="/"><FontAwesomeIcon style={{fontSize:"20px",marginRight:"20px"}} icon={faFacebook}/>Facebook</Link>
          <Link to="/"><FontAwesomeIcon style={{fontSize:"20px",marginRight:"20px"}} icon={faInstagram} />Instagram</Link>
          <Link to="/"><FontAwesomeIcon style={{fontSize:"20px",marginRight:"20px"}} icon={faTiktok} />Tiktok</Link>
        </div>
      </div>
      <div className="col-span-3 space-y-3">
        <p className="text-lg font-medium uppercase">Thông tin chung</p>
        <div className="space-y-2 flex flex-col">
          <Link to="/">Chính sách bảo hành</Link>
          <Link to="/">Chính sách đổi trả</Link>
          <Link to="/">Về chúng tôi</Link>
        </div>
      </div>
      <div className="col-span-3 space-y-3">
        <p className="text-lg font-medium uppercase">Thông tin liên hệ</p>
        <div className="space-y-2 flex flex-col">
          <Link to="/">
           Địa chỉ: Số 7 Thiền Quang, Nguyễn Du, Hai bà Trưng, Hà Nội, Việt Nam
          </Link>
          <Link to="/">SĐT: 0123456789</Link>
          <Link to="/">Email: email@gmail.com</Link>
        </div>
      </div>
      <div className="col-span-3 space-y-3">
        <p className="text-lg font-medium uppercase">Facebook online store</p>
        <Logo className="text-white" />
        {/* <div className="w-full bg-white h-[120px]" /> */}
      </div>
    </div>
  );
}
