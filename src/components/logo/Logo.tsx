import { Link } from "react-router-dom";
import classNames from "../../utils/classNames";
import logo from "../../assets/logo1.png";

function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to={"/"}
      className={classNames(
        "text-4xl font-bold text-primary cursor-pointer",
        className
      )}
    >
      {/* Shoes<span className="text-lg font-semibold">_store</span> */}
      <img src={logo} style={{width:"150px"}}/>
    </Link>
  );
}

export default Logo;
