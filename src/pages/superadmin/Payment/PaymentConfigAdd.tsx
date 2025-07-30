import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/features/loading/loadingSlice";
import type { RootState } from "../../../redux/app/store";
import axios from "axios";
import TextField from "../../../components/TextField";
import DropdownField from "../../../components/DropdownField";
import BaseLayout from "../BaseLayoutAdmin";
import { useNavigate } from "react-router-dom";
import ImagePicker from "../../../components/ImageUploader";
import { toast } from "react-toastify";

// ... (import tetap sama)

const PaymentConfigAdd = () => {
  const navigate = useNavigate();
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  const dispatch = useDispatch();
  const [listOption, setListOption] = useState({
    type: [],
    id: [],
  });
  const [data, setData] = useState({
    id: "",
    type: "",
    expiredInMinutes: 0,
    imageUrl: "",
    maxAmount: 0,
    minAmount: 0,
    name: "",
    note: "",
    enabled: true,
    chargeList: [
      {
        description: "",
        value: 0,
        type: "AMOUNT",
        minCharge: 0,
        maxCharge: 0,
      },
    ],
    settlementInMinutes: 0,
  });

  const saveConfig = () => {
    axios
      .post(`admin-dashboard/payment-config`, data)
      .finally(() => {})
      .then((res) => {
        toast.success("Berhasil menyimpan config payment");
        navigate(-1);
      });
  };

  const getListOption = () => {
    dispatch(setLoading(true));
    Promise.all([
      axios.get("admin-dashboard/payment-config/payment-method-type"),
      axios.get("admin-dashboard/payment-config/payment-method-id"),
    ])
      .then(([type, id]) => {
        setListOption({
          id: id.data,
          type: type.data,
        });
      })
      .catch((err) => {
        console.error("Gagal mengambil data", err);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    getListOption();
    console.log(listOption);
  }, []);

  const handleChangeValue = (key: string, value: any) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleChangeChargeList = (index: number, field: string, value: any) => {
    const updated: any = [...data.chargeList];
    updated[index][field] = value;
    setData((prev) => ({ ...prev, chargeList: updated }));
  };

  const handleAddCharge = () => {
    setData((prev) => ({
      ...prev,
      chargeList: [
        ...prev.chargeList,
        {
          description: "",
          value: 0,
          type: "AMOUNT",
          minCharge: 0,
          maxCharge: 0,
        },
      ],
    }));
  };

  const handleRemoveCharge = (index: number) => {
    setData((prev) => ({
      ...prev,
      chargeList: prev.chargeList.filter((_, i) => i !== index),
    }));
  };

  const handleLogoChange = (url: string) => {
    handleChangeValue("imageUrl", url);
  };

  return (
    <BaseLayout>
      <div
        className={`rounded-xl shadow-md h-auto transition-all duration-200 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"
        }`}
      >
        <div>
          <div className="w-full p-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-xl font-semibold">Add Payment Config</p>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-3 py-1 text-sm font-semibold text-gray-500 hover:text-white rounded-lg border hover:bg-gray-500 focus:outline-none transition"
            >
              Kembali
            </button>
          </div>

          <div className="w-full p-4">
            {/* Field Utama */}
            <div className="w-full grid grid-cols-4 gap-4">
              <DropdownField
                title="Tipe"
                placeHolder="Pilih Tipe"
                value={data.type}
                onChange={(e: any) => handleChangeValue("type", e)}
                options={listOption?.type.map((res: any) => {
                  return { label: res, value: res };
                })}
              />
              <DropdownField
                title="Id"
                placeHolder="Pilih ID"
                value={data.id}
                onChange={(e: any) => handleChangeValue("id", e)}
                options={listOption?.id.map((res: any) => {
                  return { label: res, value: res };
                })}
              />
              <TextField
                value={data.name}
                onChange={(e: string) => handleChangeValue("name", e)}
                title="Nama"
              />
              <DropdownField
                title="Aktif?"
                placeHolder="Pilih Status"
                value={data.enabled}
                onChange={(e: any) => handleChangeValue("enabled", e)}
                options={[
                  { label: "Aktif", value: true },
                  { label: "Tidak Aktif", value: false },
                ]}
              />
            </div>

            {/* Field Numeric */}
            <div className="w-full grid grid-cols-4 gap-4 mt-4">
              <TextField
                value={data.minAmount}
                onChange={(e: string) =>
                  handleChangeValue("minAmount", parseInt(e) || 0)
                }
                title="Min Amount"
                numberOnly
              />
              <TextField
                value={data.maxAmount}
                onChange={(e: string) =>
                  handleChangeValue("maxAmount", parseInt(e) || 0)
                }
                title="Max Amount"
                numberOnly
              />
              <TextField
                value={data.expiredInMinutes}
                onChange={(e: string) =>
                  handleChangeValue("expiredInMinutes", parseInt(e) || 0)
                }
                title="Kadaluarsa Dalam (Menit)"
                numberOnly
              />
              <TextField
                value={data.settlementInMinutes}
                onChange={(e: string) =>
                  handleChangeValue("settlementInMinutes", parseInt(e) || 0)
                }
                title="Settlement Dalam (Menit)"
                numberOnly
              />
            </div>

            {/* Catatan */}
            <div className="w-full grid grid-cols-3 gap-4 mt-4">
              <TextField
                value={data.note}
                onChange={(e: string) => handleChangeValue("note", e)}
                title="Catatan"
                multiline
                className="col-span-2"
              />
              <div>
                <p className="mb-2">Upload Logo</p>
                <ImagePicker
                  onChange={handleLogoChange}
                  initialUrl={data.imageUrl}
                />
              </div>
            </div>

            {/* Biaya Admin */}
            <div className="font-bold mt-6 flex justify-between items-center">
              <p>List Biaya Admin Company</p>
              <button
                onClick={handleAddCharge}
                className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                + Tambah Biaya
              </button>
            </div>

            {data?.chargeList?.map((res, i) => (
              <div
                key={i}
                className="w-full grid grid-cols-8 gap-4 items-center justify-between my-4"
              >
                <TextField
                  value={res.maxCharge}
                  onChange={(e: string) =>
                    handleChangeChargeList(i, "maxCharge", parseInt(e) || 0)
                  }
                  title="Max Charge"
                  numberOnly
                />
                <TextField
                  value={res.minCharge}
                  onChange={(e: string) =>
                    handleChangeChargeList(i, "minCharge", parseInt(e) || 0)
                  }
                  title="Min Charge"
                  numberOnly
                />
                <TextField
                  value={res.type}
                  onChange={(e: string) => handleChangeChargeList(i, "type", e)}
                  title="Tipe"
                  className="col-span-2"
                />
                <TextField
                  value={res.value}
                  onChange={(e: string) =>
                    handleChangeChargeList(i, "value", parseInt(e) || 0)
                  }
                  title="Value"
                  numberOnly
                />
                <TextField
                  value={res.description}
                  onChange={(e: string) =>
                    handleChangeChargeList(i, "description", e)
                  }
                  title="Deskripsi"
                  className="col-span-2"
                />
                <button
                  onClick={() => handleRemoveCharge(i)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>

          {/* Tombol Simpan */}
          <div className="w-full p-4 border-t border-gray-200 flex items-center justify-center">
            <button
              onClick={() => {
                saveConfig();
              }}
              className="inline-flex items-center px-4 py-2 font-semibold text-white hover:text-white rounded-lg border hover:bg-green-600 bg-green-500 focus:outline-none transition"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default PaymentConfigAdd;
