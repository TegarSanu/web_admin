import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/features/loading/loadingSlice";
import BaseLayout from "../BaseLayoutAdmin";
import type { RootState } from "../../../redux/app/store";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import PaymentConfigDetail from "./PaymentConfigDetail";
import { useNavigate } from "react-router-dom";

const PaymentConfig = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  const [listPayment, setListPayment] = useState<any[]>([]);
  const [dataPayment, setDataPayment] = useState<any>(null);

  const getPaymentConfig = () => {
    dispatch(setLoading(true));
    axios
      .get("admin-dashboard/payment-config")
      .finally(() => dispatch(setLoading(false)))
      .then((res) => {
        setListPayment(res.data.data);
      });
  };

  useEffect(() => {
    getPaymentConfig();
  }, []);

  return (
    <BaseLayout>
      {dataPayment ? (
        <PaymentConfigDetail
          data={dataPayment}
          onBack={() => setDataPayment(null)}
        />
      ) : (
        <div
          className={`rounded-xl shadow-md h-auto transition-all duration-200 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"
          }`}
        >
          <div className="">
            <div className="w-full p-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <p className="text-xl font-semibold">Data Payment Config</p>
              </div>
            </div>

            <div className="w-full p-4 flex justify-end">
              <button
                onClick={() => navigate("add")}
                className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none transition"
              >
                Tambah
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border-b border-gray-200 pb-10">
              <table
                className={
                  darkMode ? `min-w-full bg-gray-800` : `min-w-full bg-white`
                }
              >
                <thead className="border-b border-t bg-gray-50 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Nama
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Id
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Note
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Aktif
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listPayment.map((payment) => (
                    <tr
                      key={payment.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="flex gap-3 items-center">
                          <img
                            alt={payment.name}
                            src={payment.imageUrl}
                            className="h-5 w-12"
                          />
                          <p>{payment.name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 flex items-center gap-3">
                        {payment.id}
                      </td>
                      <td className="px-6 py-4">{payment.note}</td>
                      <td className="px-6 py-4">
                        {payment.enabled ? "Aktif" : "Tidak Aktif"}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => setDataPayment(payment)}
                          className="inline-flex items-center px-3 py-1.5 text-sm font-semibold text-white bg-green-500 rounded hover:bg-green-600 transition"
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                        {/* <button
                          onClick={() => {}}
                          className="inline-flex items-center px-3 py-1.5 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600 transition"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button> */}
                      </td>
                    </tr>
                  ))}
                  {listPayment.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-12 text-gray-500"
                      >
                        No listPayment available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </BaseLayout>
  );
};

export default PaymentConfig;
