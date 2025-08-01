import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { setLoading } from "../../redux/features/loading/loadingSlice";
import BaseLayout from "./BaseLayoutCompany";
import type { RootState } from "../../redux/app/store";
import DatePickerField from "../../components/DateTimePicker";
import { formatRupiah } from "../../api/config";
import BarChart from "../../components/BarChart";

const CompanyDashboard = () => {
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
    page: 1,
    size: 10,
    sortBy: "-createdDate",
  });
  const [filterAnalytic, setFilterAnalytic] = useState({
    startDate: null,
    endDate: null,
  });

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
    paymentAnalytic();
  }, [filterAnalytic.endDate]);

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

  return (
    <BaseLayout>
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
                onChange={(val) => handleFilterAnalyticChange("startDate", val)}
                mode="datetime"
                value={filter.startDate as any}
              />
              <DatePickerField
                title="End Date"
                onChange={(val) => handleFilterAnalyticChange("endDate", val)}
                mode="datetime"
                value={filter.endDate as any}
              />
            </div>
          </div>
          <div className="p-4">
            <BarChart
              labels={dataAnalytic.labels}
              datasets={[
                {
                  label: "Total (Rp)",
                  data: dataAnalytic.dataset?.map((item: any) => item.total),
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
    </BaseLayout>
  );
};

export default CompanyDashboard;
