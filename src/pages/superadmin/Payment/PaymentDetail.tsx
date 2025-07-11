import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/features/loading/loadingSlice";
import type { RootState } from "../../../redux/app/store";
import axios from "axios";
import TextField from "../../../components/TextField";
import DropdownField from "../../../components/DropdownField";
import { utcDateTime } from "../../../api/config";

const PaymentDetail = ({ data, onBack }: any) => {
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  console.log(data);

  return (
    <div
      className={`rounded-xl shadow-md h-auto transition-all duration-200 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"
      }`}
    >
      <div>
        <div className="w-full p-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-xl font-semibold">Detail Payment</p>
          <button
            onClick={onBack}
            className="inline-flex items-center px-3 py-1 text-sm font-semibold text-gray-500 hover:text-white rounded-lg border hover:bg-gray-500 focus:outline-none transition"
          >
            Kembali
          </button>
        </div>

        {/* Form Fields */}
        <div className="w-full p-4">
          <div className="w-full grid grid-cols-3 gap-4">
            <TextField
              value={data.companyName}
              onChange={(e: any) => {}}
              title="Nama Company"
              disabled
            />
            <TextField
              value={data.companyInitial}
              onChange={(e: any) => {}}
              title="Initial"
              disabled
            />
            <TextField
              value={data.paymentMethod}
              onChange={(e: any) => {}}
              title="Metode Pembayaran"
              disabled
            />
          </div>
          <div className="w-full grid grid-cols-4 gap-4 mt-4">
            <TextField
              value={data.amount}
              onChange={(e: any) => {}}
              title="Amount"
              numberOnly
              disabled
            />
            <TextField
              value={data.amountChargeAggregator}
              onChange={(e: any) => {}}
              title="Amount Charge Aggregator"
              numberOnly
              disabled
            />
            <TextField
              value={data.amountChargeCompany}
              onChange={(e: any) => {}}
              title="Amount Charge Company"
              numberOnly
              disabled
            />
            <TextField
              value={data.amountSettlement}
              onChange={(e: any) => {}}
              title="Amount Settlemen"
              numberOnly
              disabled
            />
          </div>
          <div className="w-full grid grid-cols-2 gap-4 mt-4">
            <TextField
              value={data.transactionId}
              onChange={(e: any) => {}}
              title="Id Transaksi"
              numberOnly
              disabled
            />
            <TextField
              value={data.transactionType}
              onChange={(e: any) => {}}
              title="Tipe Transaksi"
              numberOnly
              disabled
            />
          </div>
          <div className="w-full grid grid-cols-3 gap-4 mt-4">
            <TextField
              value={data.profit}
              onChange={(e: any) => {}}
              title="Profit"
              numberOnly
              disabled
            />
            <TextField
              value={utcDateTime(data.expiredAt)}
              onChange={(e: any) => {}}
              title="Expired Dalam"
              disabled
            />
            <TextField
              value={data.status}
              onChange={(e: any) => {}}
              title="Status"
              numberOnly
              disabled
            />
          </div>
          <div className="font-bold mt-5">
            <p>List Biaya Admin Company</p>
          </div>
          {data?.companyChargeList?.map((res: any, i: number) => (
            <div
              key={i}
              className="w-full grid grid-cols-8 gap-4 items-center justify-between my-4"
            >
              <TextField
                value={res.maxCharge}
                onChange={(e: any) => {}}
                title="Max Charge"
                numberOnly
                disabled
              />
              <TextField
                value={res.minCharge}
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
          <div className="font-bold mt-5">
            <p>Config Payment Method</p>
            <p className="mt-4 text-sm font-semibold">Data Config</p>
          </div>
          <div className="w-full grid grid-cols-3 gap-4 mt-4">
            <TextField
              value={data.paymentMethodConfig?.maxAmount}
              onChange={(e: any) => {}}
              title="Nominal Maksimal"
              numberOnly
              disabled
            />
            <TextField
              value={data.paymentMethodConfig?.minAmount}
              onChange={(e: any) => {}}
              title="Nominal Minimal"
              numberOnly
              disabled
            />
            <TextField
              value={data.paymentMethodConfig?.type}
              onChange={(e: any) => {}}
              title="Tipe"
              disabled
            />
          </div>
          <div className="w-full grid grid-cols-3 gap-4 mt-4">
            <TextField
              value={data.paymentMethodConfig?.enabled ? "Iya" : "Tidak"}
              onChange={(e: any) => {}}
              title="Aktif"
              disabled
            />
            <TextField
              value={data.paymentMethodConfig?.expiredInMinutes}
              onChange={(e: any) => {}}
              title="Expired Dalam Menit"
              disabled
            />
            <TextField
              value={data.paymentMethodConfig?.id}
              onChange={(e: any) => {}}
              title="Nama"
              numberOnly
              disabled
              className="w-full"
            />
          </div>
          <div className="w-full grid grid-cols-2 gap-4 mt-4">
            <TextField
              value={data.paymentMethodConfig?.note}
              onChange={(e: any) => {}}
              title="Catatan"
              disabled
              multiline
            />
            <div className="flex w-full items-center justify-center">
              <img
                src={data.paymentMethodConfig?.imageUrl}
                alt={data.paymentMethodConfig?.imageUrl}
              />
            </div>
          </div>
          <p className="mt-4 text-sm font-semibold">List Biaya Admin</p>
          {data?.paymentMethodConfig?.chargeList?.map((res: any, i: number) => (
            <div
              key={i}
              className="w-full grid grid-cols-8 gap-4 items-center justify-between my-4"
            >
              <TextField
                value={res.maxCharge}
                onChange={(e: any) => {}}
                title="Max Charge"
                numberOnly
                disabled
              />
              <TextField
                value={res.minCharge}
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

export default PaymentDetail;
