import { Outlet } from "react-router-dom";
import { Header } from "../components/header/Header";
import Footer from "../components/footer/Footer";

export const Layout = () => {
  return (
    <div className="w-full">
      <div className="lg:w-[860px] xl:w-[1200px] mx-auto px-5">
        <Header />
      </div>
      <div className="pt-3 pb-32 lg:w-[860px] xl:w-[1200px] mx-auto px-5">
        <Outlet></Outlet>
      </div>
      <div className="w-full bg-slate-500 text-white">
        <div className="lg:w-[860px] xl:w-[1200px] mx-auto px-5 py-10">
          <Footer />
        </div>
      </div>
      <div className="w-full text-center py-4 capitalize">
        Copyright © 2024 online shoes store
      </div>
    </div>
  );
};
