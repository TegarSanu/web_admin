import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/features/loading/loadingSlice";
import type { RootState } from "../../../redux/app/store";
import axios from "axios";
import TextField from "../../../components/TextField";
import DropdownField from "../../../components/DropdownField";
import { formatRupiah, utcDateTime } from "../../../api/config";

const PaymentConfigDetail = ({ data, onBack }: any) => {
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  return (
    <div
      className={`rounded-xl shadow-md h-auto transition-all duration-200 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"
      }`}
    >
      <div>
        <div className="w-full p-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-xl font-semibold">Detail Payment Config</p>
          <button
            onClick={onBack}
            className="inline-flex items-center px-3 py-1 text-sm font-semibold text-gray-500 hover:text-white rounded-lg border hover:bg-gray-500 focus:outline-none transition"
          >
            Kembali
          </button>
        </div>

        {/* Form Fields */}
        <div className="w-full p-4">
          <div className="w-full grid grid-cols-4 gap-4">
            <TextField
              value={data.id}
              onChange={(e: any) => {}}
              title="Id"
              disabled
            />
            <TextField
              value={data.name}
              onChange={(e: any) => {}}
              title="Nama"
              disabled
            />
            <TextField
              value={data.type}
              onChange={(e: any) => {}}
              title="Tipe"
              disabled
            />
            <TextField
              value={data.enabled ? "Aktif" : "Tidak Aktif"}
              onChange={(e: any) => {}}
              title=""
              numberOnly
              disabled
            />
          </div>
          <div className="w-full grid grid-cols-3 gap-4 mt-4">
            <TextField
              value={formatRupiah(data.minAmount)}
              onChange={(e: any) => {}}
              title="Min Amount"
              numberOnly
              disabled
            />
            <TextField
              value={formatRupiah(data.maxAmount)}
              onChange={(e: any) => {}}
              title="Max Amount"
              numberOnly
              disabled
            />
            <TextField
              value={data.expiredInMinutes}
              onChange={(e: any) => {}}
              title="Kadaluarsa Dalam (Menit)"
              numberOnly
              disabled
            />
          </div>
          <div className="w-full grid grid-cols-2 gap-4 mt-4">
            <TextField
              value={data.note}
              onChange={(e: any) => {}}
              title="Catatan"
              disabled
              multiline
            />
            <div className="flex w-full items-center justify-center">
              <img src={data.imageUrl} alt={data.imageUrl} />
            </div>
          </div>
          <div className="font-bold mt-5">
            <p>List Biaya Admin Company</p>
          </div>
          {data?.chargeList?.map((res: any, i: number) => (
            <div
              key={i}
              className="w-full grid grid-cols-8 gap-4 items-center justify-between my-4"
            >
              <TextField
                value={formatRupiah(res.maxCharge)}
                onChange={(e: any) => {}}
                title="Max Charge"
                numberOnly
                disabled
              />
              <TextField
                value={formatRupiah(res.minCharge || 0)}
                onChange={(e: any) => {}}
                title="Min Charge"
                numberOnly
                disabled
              />
              <TextField
                value={res.type}
                onChange={(e: any) => {}}
                title="Tipe"
                className="col-span-2"
                disabled
              />
              <TextField
                value={res.value}
                onChange={(e: any) => {}}
                title="Value"
                numberOnly
                disabled
              />
              <TextField
                value={res.description}
                onChange={(e: any) => {}}
                title="Deskripsi"
                className="col-span-3"
                disabled
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentConfigDetail;
