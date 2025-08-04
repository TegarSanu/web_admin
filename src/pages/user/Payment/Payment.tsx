import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/features/loading/loadingSlice";
import type { RootState } from "../../../redux/app/store";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { formatRupiah, utcDateTime } from "../../../api/config";
import BarChart from "../../../components/BarChart";
import moment from "moment";
import TextField from "../../../components/TextField";
import DatePickerField from "../../../components/DateTimePicker";
import SearchablePickerField from "../../../components/SearchablePicker";
import BaseLayout from "../BaseLayoutCompany";
import PaymentDetail from "./PaymentDetail";
import Pagination from "../../../components/Pagination";
import DropdownField from "../../../components/DropdownField";

const Payment = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  const [listPayment, setListPayment] = useState<any[]>([]);
  const [dataAnalytic, setDataAnalytic] = useState<any>({});
  const [dataPayment, setDataPayment] = useState<any>(null);
  const nameRef: any = useRef(null);
  const [paging, setPaging] = useState({
    page: 1,
    size: 10,
    totalElements: 0,
    totalPages: 1,
  });
  const [filter, setFilter] = useState({
    type: null,
    startDate: null,
    endDate: null,
    status: null,
    page: 1,
    size: 10,
    sortBy: "-createdDate",
  });
  const [filterAnalytic, setFilterAnalytic] = useState({
    startDate: null,
    endDate: null,
    status: null,
  });

  const getPayment = () => {
    dispatch(setLoading(true));
    axios
      .get("company-dashboard/payment", { params: filter })
      .finally(() => dispatch(setLoading(false)))
      .then((res) => {
        setPaging(res.data.paging);
        setListPayment(res.data.data);
      });
  };

  const paymentAnalytic = () => {
    dispatch(setLoading(true));
    axios
      .get(`company-dashboard/payment/payment-by-date`, {
        params: filterAnalytic,
      })
      .finally(() => dispatch(setLoading(false)))
      .then((res) => {
        const labels = res.data.data.map(
          (item: any) => `${item.date} (${item.count})`
        );
        const totalCount = res.data.data.reduce(
          (acc: any, item: any) => acc + item.count,
          0
        );
        const totalCharge = res.data.data.reduce(
          (acc: any, item: any) => acc + item.charge,
          0
        );
        const totalTotal = res.data.data.reduce(
          (acc: any, item: any) => acc + item.total,
          0
        );
        setDataAnalytic({
          labels,
          dataset: res.data.data,
          totalCount,
          totalCharge,
          totalTotal,
        });
      });
  };

  useEffect(() => {
    getPayment();
  }, [filter.endDate, filter.page, filter.size, filter.status]);

  useEffect(() => {
    paymentAnalytic();
  }, [filterAnalytic.endDate, filterAnalytic.status]);

  const handleFilterChange = (key: any, value: any) => {
    if (nameRef.current) {
      clearTimeout(nameRef.current);
    }
    nameRef.current = setTimeout(() => {
      setFilter((prevFilter) => ({
        ...prevFilter,
        [key]: value,
        page: 1,
      }));
    }, 600);
  };

  const handleFilterAnalyticChange = (key: any, value: any) => {
    if (nameRef.current) {
      clearTimeout(nameRef.current);
    }
    nameRef.current = setTimeout(() => {
      setFilterAnalytic((prevFilter) => ({
        ...prevFilter,
        [key]: value,
      }));
    }, 600);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= paging.totalPages) {
      setFilter((prev) => ({
        ...prev,
        page,
      }));
    }
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value, 10);
    setFilter((prev) => ({
      ...prev,
      size: newSize,
      page: 1, // Reset ke page 1 agar aman
    }));
  };

  return (
    <BaseLayout>
      {dataPayment ? (
        <PaymentDetail data={dataPayment} onBack={() => setDataPayment(null)} />
      ) : (
        <>
          <div
            className={`rounded-xl shadow-md h-auto transition-all duration-200 mb-5 ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"
            }`}
          >
            <div className="">
              <div className="w-full p-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <p className="text-xl font-semibold">Analitik Payment</p>
                </div>
              </div>
              <div className="w-full p-4">
                <div className="grid grid-cols-3 gap-4">
                  <DatePickerField
                    title="Start Date"
                    onChange={(val) =>
                      handleFilterAnalyticChange("startDate", val)
                    }
                    mode="datetime"
                    value={filterAnalytic.startDate as any}
                  />
                  <DatePickerField
                    title="End Date"
                    onChange={(val) =>
                      handleFilterAnalyticChange("endDate", val)
                    }
                    mode="datetime"
                    value={filterAnalytic.endDate as any}
                  />
                  <DropdownField
                    title="Status"
                    placeHolder="Status"
                    value={filterAnalytic.status as any}
                    onChange={(e: any) =>
                      handleFilterAnalyticChange(
                        "status",
                        e == "ALL" ? null : e
                      )
                    }
                    options={[
                      { label: "All", value: "ALL" },
                      { label: "REQUESTED", value: "REQUESTED" },
                      { label: "PAID", value: "PAID" },
                    ]}
                  />
                </div>
              </div>
              <div className="p-4">
                <BarChart
                  labels={dataAnalytic.labels}
                  datasets={[
                    {
                      label: "Total (Rp)",
                      data: dataAnalytic.dataset?.map(
                        (item: any) => item.total
                      ),
                      color: "#3b82f6",
                    },
                  ]}
                  title="Grafik Total & Count per Tanggal"
                  summaryItems={[
                    {
                      title: "Total Transaksi",
                      value: dataAnalytic.totalCount,
                    },
                    {
                      title: "Total Pendapatan",
                      value: formatRupiah(dataAnalytic.totalTotal),
                    },
                  ]}
                />
              </div>
            </div>
          </div>
          <div
            className={`rounded-xl shadow-md h-auto transition-all duration-200 ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"
            }`}
          >
            <div className="">
              <div className="w-full p-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <p className="text-xl font-semibold">Data Payment</p>
                </div>
              </div>
              <div className="w-full p-4">
                <div className="grid grid-cols-3 gap-4">
                  <DatePickerField
                    title="Start Date"
                    onChange={(val) => handleFilterChange("startDate", val)}
                    mode="datetime"
                    value={filter.startDate as any}
                  />
                  <DatePickerField
                    title="End Date"
                    onChange={(val) => handleFilterChange("endDate", val)}
                    mode="datetime"
                    value={filter.endDate as any}
                  />
                  <DropdownField
                    title="Status"
                    placeHolder="Status"
                    value={filter.status as any}
                    onChange={(e: any) =>
                      handleFilterChange("status", e == "ALL" ? null : e)
                    }
                    options={[
                      { label: "All", value: "ALL" },
                      { label: "REQUESTED", value: "REQUESTED" },
                      { label: "PAID", value: "PAID" },
                    ]}
                  />
                </div>
              </div>
              {/* Table */}
              <div className="overflow-x-auto border-b border-gray-200">
                <table
                  className={
                    darkMode ? `min-w-full bg-gray-800` : `min-w-full bg-white`
                  }
                >
                  <thead className="border-b border-t bg-gray-50 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                        Id Transaksi
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                        Metode Pembayaran
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                        Nominal
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                        Charge Company
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                        Charge Aggregator
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                        Nominal Settlement
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                        Expired Dalam
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                        Status
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
                        <td className="px-6 py-4 flex items-center gap-3">
                          {payment.transactionId}
                        </td>
                        <td className="px-6 py-4">{payment.paymentMethod}</td>
                        <td className="px-6 py-4">
                          {formatRupiah(payment.amount)}
                        </td>
                        <td className="px-6 py-4">
                          {formatRupiah(payment.amountChargeCompany)}
                        </td>
                        <td className="px-6 py-4">
                          {formatRupiah(payment.amountChargeAggregator)}
                        </td>
                        <td className="px-6 py-4">
                          {formatRupiah(payment.amountSettlement)}
                        </td>
                        <td className="px-6 py-4">
                          {utcDateTime(payment.expiredAt)}
                        </td>
                        <td className="px-6 py-4">{payment.status}</td>
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

              {/* Pagination Control */}
              <Pagination
                totalItems={paging.totalElements}
                currentPage={paging.page}
                totalPages={paging.totalPages}
                pageSize={filter.size}
                onPageChange={handlePageChange}
                onSizeChange={handleSizeChange}
              />
            </div>
          </div>
        </>
      )}
    </BaseLayout>
  );
};

export default Payment;
