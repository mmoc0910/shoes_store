import React, { FC } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/logo/Logo";

type LayoutAuthenticationProps = {
  children: React.ReactNode;
  heading?: string;
};

const LayoutAuthentication: FC<LayoutAuthenticationProps> = ({
  children,
  heading = "",
}) => {
  return (
    <div className="w-full overflow-hidden xl:h-auto xl:overflow-auto">
      <div className="w-full min-h-screen p-6 md:p-10 bg-lite dark:bg-darkbg">
        <Link to={"/"} className="inline-block mb-5 md:mb-16">
          <Logo />
        </Link>
        <div className="w-full sm:w-[556px] rounded-xl bg-white px-[20px] py-[30px] sm:px-[60px] sm:py-[20px] mx-auto relative z-[1] dark:bg-dark-secondary">
          <h1 className="text-lg font-semibold md:text-xl text-text1 mb-[5px] md:mb-[10px] text-center dark:text-white">
            {heading}
          </h1>
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutAuthentication;
