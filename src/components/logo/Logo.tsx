import { Link } from "react-router-dom";
import classNames from "../../utils/classNames";

function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to={"/"}
      className={classNames(
        "text-4xl font-bold text-primary cursor-pointer",
        className
      )}
    >
      Shoes<span className="text-lg font-semibold">_store</span>
    </Link>
  );
}

export default Logo;
