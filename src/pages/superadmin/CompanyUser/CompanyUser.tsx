import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/features/loading/loadingSlice";
import BaseLayout from "../BaseLayoutAdmin";
import type { RootState } from "../../../redux/app/store";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import EditCompanyUser from "./EditCompanyUser";
import { useNavigate } from "react-router-dom";
import TextField from "../../../components/TextField";
import SearchablePickerField from "../../../components/SearchablePicker";
import ConfirmModal from "../../../components/ConfirmModal";
import { toast } from "react-toastify";
import Pagination from "../../../components/Pagination";

const CompanyUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  const [companies, setCompanies] = useState<any[]>([]);
  const [editedUser, setEditedUser] = useState<any>(null);
  const [detail, setDetail] = useState<any>(null);
  const nameRef: any = useRef(null);
  const [paging, setPaging] = useState({
    page: 1,
    size: 10,
    totalElements: 0,
    totalPages: 1,
  });
  const [filter, setFilter] = useState({
    companyId: null,
    email: "",
    name: "",
    page: 1,
    size: 10,
    sortBy: "-createdDate",
  });

  const getCompanyUser = () => {
    dispatch(setLoading(true));
    axios
      .get("admin-dashboard/company-user", { params: filter })
      .finally(() => dispatch(setLoading(false)))
      .then((res) => {
        setPaging(res.data.paging);
        setCompanies(res.data.data);
      });
  };

  const deleteCompanyUser = () => {
    dispatch(setLoading(true));
    axios
      .post("admin-dashboard/company-user/_delete", {
        id: detail?.id,
        companyId: detail?.companyId,
      })
      .finally(() => dispatch(setLoading(false)))
      .then((res) => {
        getCompanyUser();
        setDetail(null);
        toast.success(`Berhasil menghapus data`);
      });
  };

  useEffect(() => {
    getCompanyUser();
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

  return (
    <BaseLayout>
      <ConfirmModal
        open={detail}
        title="Hapus Data Company User"
        desc={`Apakah anda yakin ingin menghapus data ${detail?.name}?`}
        onClose={() => setDetail(null)}
        onConfirm={() => deleteCompanyUser()}
      />
      {editedUser ? (
        <EditCompanyUser
          data={editedUser}
          onBack={() => {
            setEditedUser(null);
            getCompanyUser();
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
                <p className="text-xl font-semibold">Data Company User</p>
              </div>
            </div>
            <div className="w-full p-4">
              <div className="grid grid-cols-3 gap-4">
                <SearchablePickerField
                  title="Cari Company"
                  endpoint="admin-dashboard/company"
                  onChange={(id) => handleFilterChange("companyId", id)}
                />
                <TextField
                  title="Nama"
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
                      Nama
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Nama Company
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
                  {companies.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition border-b border-gray-200"
                    >
                      <td className="px-6 py-4 ">{user.name}</td>
                      <td className="px-6 py-4 ">{user.companyName || "-"}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          title={`Edit data ${user.name}`}
                          onClick={() => setEditedUser(user)}
                          className="inline-flex items-center px-3 py-1.5 text-sm font-semibold text-white bg-yellow-500 rounded hover:bg-yellow-600 transition"
                        >
                          <FontAwesomeIcon icon={faPencil} />
                        </button>
                        <button
                          title={`Hapus data ${user.name}`}
                          onClick={() => setDetail(user)}
                          className="inline-flex items-center px-3 py-1.5 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600 transition"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {companies.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-12 text-gray-500"
                      >
                        No user available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
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
      )}
    </BaseLayout>
  );
};

export default CompanyUser;
