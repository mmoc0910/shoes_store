import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/configureStore";
import { useSelector } from "react-redux";

const OrderPage = () => {
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!auth?.token) {
      navigate("/sign-in");
    }
  }, [navigate, auth]);

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-medium">Tiến độ đơn hàng</h2>
      <div className="grid grid-cols-10">
        <div className="space-y-2 col-span-5">
          <div className="grid grid-cols-12">
            <p className="col-span-3 xl:col-span-3 font-medium">
              Mã đơn hàng:{" "}
            </p>
            <p className="col-span-9 xl:col-span-9">123456789</p>
          </div>
          <div className="grid grid-cols-12">
            <p className="col-span-3 xl:col-span-3 font-medium">Người nhận: </p>
            <p className="col-span-9 xl:col-span-9">Nguyen Van A</p>
          </div>
          <div className="grid grid-cols-12">
            <p className="col-span-3 xl:col-span-3 font-medium">
              Số điện thoại:{" "}
            </p>
            <p className="col-span-9 xl:col-span-9">0123456789</p>
          </div>
          <div className="grid grid-cols-12">
            <p className="col-span-3 xl:col-span-3 font-medium">Địa chỉ: </p>
            <p className="col-span-9 xl:col-span-9">
              Số 6 ngách .................
            </p>
          </div>
          <div className="grid grid-cols-12">
            <p className="col-span-3 xl:col-span-3 font-medium">Ghi chú: </p>
            <p className="col-span-9 xl:col-span-9">Ghi chú đơn hàng</p>
          </div>
          <div className="grid grid-cols-12">
            <p className="col-span-3 xl:col-span-3 font-medium">Tổng tiền: </p>
            <p className="col-span-9 xl:col-span-9">$5</p>
          </div>
          <div className="grid grid-cols-12">
            <p className="col-span-3 xl:col-span-3 font-medium">Trạng thái: </p>
            <p className="col-span-9 xl:col-span-9">Đang vận chuyển</p>
          </div>
        </div>
        <div className="col-span-5">
          <table className="table-auto w-full">
            <thead>
              <tr>
                {/* <th className="font-medium text-start px-4"></th> */}
                <th className="font-medium text-start px-4 pl-0">Hình ảnh</th>
                <th className="font-medium text-start px-4">Tên</th>
                <th className="font-medium text-start px-4">Số lượng</th>
                <th className="font-medium text-start px-4">Tổng</th>
                <th className="font-medium text-start px-4"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-4 px-4 pl-0">
                  <img
                    src={
                      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNob2VzfGVufDB8MHwwfHx8MA%3D%3D"
                    }
                    alt={"productName"}
                    className="w-16 aspect-square object-cover rounded-md"
                  />
                </td>
                <td className="py-4 px-4 font-medium">
                  Lorem, ipsum dolor. x $5
                </td>
                <td className="py-4 px-4 text-center">4</td>
                <td className="py-4 px-4 font-medium">$50</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
