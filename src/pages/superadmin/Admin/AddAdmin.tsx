import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/features/loading/loadingSlice";
import type { RootState } from "../../../redux/app/store";
import axios from "axios";
import TextField from "../../../components/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ImagePicker from "../../../components/ImageUploader";
import PdfUploader from "../../../components/PdfUploader";
import { toast } from "react-toastify";
import BaseLayout from "../BaseLayoutAdmin";
import { useNavigate } from "react-router-dom";

const AddAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  const [dataAdmin, setDataAdmin] = useState<any>({
    email: "",
    name: "",
    note: "",
    password: "",
  });

  const saveCompany = () => {
    // VALIDASI DATA SEBELUM POST
    if (!dataAdmin.name) {
      toast.error("Nama admin tidak boleh kosong");
      return;
    }
    if (!dataAdmin.email) {
      toast.error("Email tidak boleh kosong");
      return;
    }
    if (!dataAdmin.note) {
      toast.error("Catatan tidak boleh kosong");
      return;
    }
    if (!dataAdmin.password) {
      toast.error("Kata sandi tidak boleh kosong");
      return;
    }
    // Jika valid, lanjutkan simpan
    dispatch(setLoading(true));
    axios
      .post(`admin/admin`, dataAdmin)
      .finally(() => {
        dispatch(setLoading(false));
      })
      .then((res) => {
        toast.success("Berhasil menambahkan admin");
        navigate(-1);
      })
      .catch(() => {
        toast.error("Gagal menambahkan admin, periksa kembali data Anda");
      });
  };

  const handleChangeValue = (key: any, value: any) => {
    setDataAdmin({ ...dataAdmin, [key]: value });
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
            <p className="text-xl font-semibold">Tambah Data Admin</p>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-3 py-1 text-sm font-semibold text-gray-500 hover:text-white rounded-lg border hover:bg-gray-500 focus:outline-none transition"
            >
              Kembali
            </button>
          </div>
          {/* Form Fields */}
          <div className="w-full p-4">
            <div className="w-full grid grid-cols-3 gap-4">
              <TextField
                value={dataAdmin.name}
                onChange={(e: any) => handleChangeValue("name", e)}
                title="Nama Admin"
              />
              <TextField
                value={dataAdmin.email}
                onChange={(e: any) => handleChangeValue("email", e)}
                title="Email"
              />
              <TextField
                value={dataAdmin.password}
                onChange={(e: any) => handleChangeValue("password", e)}
                title="Kata Sandi"
              />
            </div>
            <TextField
              value={dataAdmin.note}
              onChange={(e: any) => handleChangeValue("note", e)}
              title="Catatan"
              multiline
              className="mt-4"
            />
          </div>
          <div className="w-full p-4 border-t border-gray-200 flex items-center justify-center">
            <button
              onClick={() => saveCompany()}
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

export default AddAdmin;
