import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/features/loading/loadingSlice";
import type { RootState } from "../../../redux/app/store";
import axios from "axios";
import TextField from "../../../components/TextField";
import DropdownField from "../../../components/DropdownField";
import { toast } from "react-toastify";

const EditCompanyUser = ({ data, onBack }: any) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  const [password, setPassword] = useState({
    companyId: data.companyId,
    id: data.id,
    newPassword: "",
  });
  const [dataAdmin, setDataAdmin] = useState({
    id: data.id,
    companyId: data.companyId,
    name: data.name,
    note: data.note,
  });

  const updatePassword = () => {
    if (password.newPassword) {
      dispatch(setLoading(true));
      axios
        .post(`admin-dashboard/company-user/password/_update`, password)
        .finally(() => {
          dispatch(setLoading(false));
        })
        .then((res) => {
          saveCompanyUser();
        });
    } else {
      saveCompanyUser();
    }
  };

  const saveCompanyUser = () => {
    if (!dataAdmin.name) {
      toast.error("Nama admin tidak boleh kosong");
      return;
    }
    if (!dataAdmin.note) {
      toast.error("Catatan tidak boleh kosong");
      return;
    }
    dispatch(setLoading(true));
    axios
      .post(`admin-dashboard/company-user/_update`, dataAdmin)
      .finally(() => {
        dispatch(setLoading(false));
      })
      .then((res) => {
        toast.success("Berhasil mengupdate data");
        onBack();
      });
  };

  const handleChangeValue = (key: any, value: any) => {
    setDataAdmin({ ...dataAdmin, [key]: value });
  };

  const handleChangePassword = (key: any, value: any) => {
    setPassword({ ...password, [key]: value });
  };

  return (
    <div
      className={`rounded-xl shadow-md h-auto transition-all duration-200 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"
      }`}
    >
      <div>
        <div className="w-full p-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-xl font-semibold">Edit Data Company User</p>
          <button
            onClick={onBack}
            className="inline-flex items-center px-3 py-1 text-sm font-semibold text-gray-500 hover:text-white rounded-lg border hover:bg-gray-500 focus:outline-none transition"
          >
            Kembali
          </button>
        </div>
        <div className="w-full p-4 grid grid-cols-3 gap-4">
          <TextField
            value={data.companyName}
            onChange={(e: any) => {}}
            title="Nama Company"
            disabled
          />
          <TextField
            value={dataAdmin.name}
            onChange={(e: any) => handleChangeValue("name", e)}
            title="Nama Admin"
          />
          <TextField
            value={password.newPassword}
            onChange={(e: any) => handleChangePassword("newPassword", e)}
            title="Kata Sandi Baru"
          />
          <TextField
            value={dataAdmin.note}
            onChange={(e: any) => handleChangeValue("note", e)}
            title="Catatan"
            multiline
            className="col-span-3"
          />
        </div>
        <div className="w-full p-4 border-t border-gray-200 flex items-center justify-center">
          <button
            onClick={() => updatePassword()}
            className="inline-flex items-center px-4 py-2 font-semibold text-white hover:text-white rounded-lg border hover:bg-green-600 bg-green-500 focus:outline-none transition"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCompanyUser;
