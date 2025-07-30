import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/features/loading/loadingSlice";
import BaseLayout from "../BaseLayoutAdmin";
import type { RootState } from "../../../redux/app/store";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import EditAdmin from "./EditAdmin";
import TextField from "../../../components/TextField";
import ConfirmModal from "../../../components/ConfirmModal";
import { toast } from "react-toastify";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  const [listAdmin, setListAdmin] = useState<any[]>([]);
  const [editedAdmin, setEditedAdmin] = useState<any>(null);
  const nameRef: any = useRef(null);
  const [detail, setDetail] = useState<any>(null);
  const [paging, setPaging] = useState({
    page: 1,
    size: 10,
    totalElements: 0,
    totalPages: 1,
  });
  const [filter, setFilter] = useState({
    email: "",
    name: "",
    page: 1,
    size: 10,
    sortBy: "-createdDate",
  });

  const getAdmin = () => {
    dispatch(setLoading(true));
    axios
      .get("admin-dashboard/admin", { params: filter })
      .finally(() => dispatch(setLoading(false)))
      .then((res) => {
        setPaging(res.data.paging);
        setListAdmin(res.data.data);
      });
  };

  const deleteAdmin = () => {
    dispatch(setLoading(true));
    axios
      .post("admin-dashboard/admin/_delete", { id: detail?.id })
      .finally(() => dispatch(setLoading(false)))
      .then((res) => {
        getAdmin();
        setDetail(null);
        toast.success(`Berhasil menghapus`);
      });
  };

  useEffect(() => {
    getAdmin();
  }, [filter]);

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

  const renderPageNumbers = () => {
    const pages = [];
    const maxPage = paging.totalPages;
    const currentPage = paging.page;
    for (let i = 1; i <= maxPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded ${
            i === currentPage
              ? "bg-blue-500 text-white font-semibold"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          } transition`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <BaseLayout>
      <ConfirmModal
        open={detail}
        title="Hapus Data Admin"
        desc={`Apakah anda yakin ingin menghapus data ${detail?.name}?`}
        onClose={() => setDetail(null)}
        onConfirm={() => deleteAdmin()}
      />
      {editedAdmin ? (
        <EditAdmin
          data={editedAdmin}
          onBack={() => {
            setEditedAdmin(null);
            getAdmin();
          }}
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
                <p className="text-xl font-semibold">Data Admin</p>
              </div>
            </div>
            <div className="w-full p-4">
              <div className="grid grid-cols-3 gap-4">
                <TextField
                  title="Nama Admin"
                  onChange={(e: any) => handleFilterChange("name", e)}
                />
                <TextField
                  title="Email"
                  onChange={(e: any) => handleFilterChange("email", e)}
                />
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
            <div className="overflow-x-auto border-b border-gray-200">
              <table
                className={
                  darkMode ? `min-w-full bg-gray-800` : `min-w-full bg-white`
                }
              >
                <thead className="border-b border-t bg-gray-50 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Nama Admin
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listAdmin.map((admin) => (
                    <tr key={admin.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 flex items-center gap-3">
                        {/* <img
                          src={admin.imageUrl}
                          alt={admin.name}
                          className="w-10 h-10 rounded-full object-cover"
                        /> */}
                        {admin.name}
                      </td>
                      <td className="px-6 py-4">{admin.email}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => setEditedAdmin(admin)}
                          className="inline-flex items-center px-3 py-1.5 text-sm font-semibold text-white bg-yellow-500 rounded hover:bg-yellow-600 transition"
                        >
                          <FontAwesomeIcon icon={faPencil} />
                        </button>
                        <button
                          onClick={() => setDetail(admin)}
                          className="inline-flex items-center px-3 py-1.5 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600 transition"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {listAdmin.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-12 text-gray-500"
                      >
                        No admin list available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Control */}
            <div className="flex flex-col md:flex-row items-center justify-between p-4 gap-4">
              {/* Size Selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm">Rows per page:</span>
                <select
                  value={filter.size}
                  onChange={handleSizeChange}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  {[10, 20, 50, 100].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Page Navigation */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(paging.page - 1)}
                  disabled={paging.page <= 1}
                  className={`px-3 py-1 rounded ${
                    paging.page <= 1
                      ? "bg-gray-300 text-gray-500"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  } transition`}
                >
                  <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                {renderPageNumbers()}
                <button
                  onClick={() => handlePageChange(paging.page + 1)}
                  disabled={paging.page >= paging.totalPages}
                  className={`px-3 py-1 rounded ${
                    paging.page >= paging.totalPages
                      ? "bg-gray-300 text-gray-500"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  } transition`}
                >
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </BaseLayout>
  );
};

export default Admin;
