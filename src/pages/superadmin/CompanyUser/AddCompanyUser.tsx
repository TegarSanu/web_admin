import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/features/loading/loadingSlice";
import type { RootState } from "../../../redux/app/store";
import axios from "axios";
import TextField from "../../../components/TextField";
import { toast } from "react-toastify";
import BaseLayout from "../BaseLayoutAdmin";
import { useNavigate } from "react-router-dom";
import SearchablePickerField from "../../../components/SearchablePicker";

const AddCompanyUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  const [dataCompanyUser, setDataCompanyUser] = useState<any>({
    companyId: "",
    email: "",
    name: "",
    note: "",
    password: "",
  });

  const saveCompanyUser = () => {
    // VALIDASI DATA SEBELUM POST
    if (!dataCompanyUser.companyId) {
      toast.error("Company tidak boleh kosong");
      return;
    }
    if (!dataCompanyUser.name) {
      toast.error("Nama admin tidak boleh kosong");
      return;
    }
    if (!dataCompanyUser.email) {
      toast.error("Email tidak boleh kosong");
      return;
    }
    if (!dataCompanyUser.note) {
      toast.error("Catatan tidak boleh kosong");
      return;
    }
    if (!dataCompanyUser.password) {
      toast.error("Kata sandi tidak boleh kosong");
      return;
    }
    // Jika valid, lanjutkan simpan
    dispatch(setLoading(true));
    axios
      .post(`admin-dashboard/company-user`, dataCompanyUser)
      .finally(() => {
        dispatch(setLoading(false));
      })
      .then((res) => {
        toast.success("Berhasil menambahkan company user");
        navigate(-1);
      })
      .catch(() => {
        toast.error(
          "Gagal menambahkan company user, periksa kembali data Anda"
        );
      });
  };

  const handleChangeValue = (key: any, value: any) => {
    setDataCompanyUser({ ...dataCompanyUser, [key]: value });
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
            <p className="text-xl font-semibold">Tambah Data Company User</p>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-3 py-1 text-sm font-semibold text-gray-500 hover:text-white rounded-lg border hover:bg-gray-500 focus:outline-none transition"
            >
              Kembali
            </button>
          </div>
          {/* Form Fields */}
          <div className="w-full p-4">
            <SearchablePickerField
              title="Pilih Company"
              endpoint="admin-dashboard/company"
              onChange={(id) => handleChangeValue("companyId", id)}
              className="mb-4 w-[50%]"
            />
            <div className="w-full grid grid-cols-3 gap-4">
              <TextField
                value={dataCompanyUser.name}
                onChange={(e: any) => handleChangeValue("name", e)}
                title="Nama Admin"
              />
              <TextField
                value={dataCompanyUser.email}
                onChange={(e: any) => handleChangeValue("email", e)}
                title="Email"
              />
              <TextField
                value={dataCompanyUser.password}
                onChange={(e: any) => handleChangeValue("password", e)}
                title="Kata Sandi"
              />
            </div>
            <TextField
              value={dataCompanyUser.note}
              onChange={(e: any) => handleChangeValue("note", e)}
              title="Catatan"
              multiline
              className="mt-4"
            />
          </div>
          <div className="w-full p-4 border-t border-gray-200 flex items-center justify-center">
            <button
              onClick={() => saveCompanyUser()}
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

export default AddCompanyUser;
