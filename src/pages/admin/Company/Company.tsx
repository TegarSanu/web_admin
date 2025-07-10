import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/features/loading/loadingSlice";
import BaseLayout from "../../../BaseLayout";
import type { RootState } from "../../../redux/app/store";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Company = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  const [companies, setCompanies] = useState<any[]>([]);
  const [editedCompany, setEditedCompany] = useState<any>({});
  const [paging, setPaging] = useState({
    page: 1,
    size: 10,
    totalElements: 0,
    totalPages: 1,
  });
  const [filter, setFilter] = useState({
    name: "",
    initial: "",
    id: "",
    page: 1,
    size: 10,
    sortBy: "-createdDate",
  });

  const getCompany = () => {
    dispatch(setLoading(true));
    axios
      .get("admin/company", { params: filter })
      .finally(() => dispatch(setLoading(false)))
      .then((res) => {
        setPaging(res.data.paging);
        setCompanies(res.data.data);
      });
  };

  useEffect(() => {
    getCompany();
  }, [filter.page, filter.size]);

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
      <div
        className={`rounded-xl shadow-md h-auto transition-all duration-200 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"
        }`}
      >
        <div className="">
          <div className="w-full p-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold">Data Company</p>
            </div>
          </div>
          <div className="w-full p-4 flex justify-end">
            <button className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none transition">
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
                    Nama Company
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Alamat
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
                {companies.map((company) => (
                  <tr key={company.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={company.imageUrl}
                        alt={company.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {company.name}
                    </td>
                    <td className="px-6 py-4">{company.address}</td>
                    <td className="px-6 py-4">{company.email}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => console.log("Edit", company.id)}
                        className="inline-flex items-center px-3 py-1.5 text-sm font-semibold text-white bg-yellow-500 rounded hover:bg-yellow-600 transition"
                      >
                        <FontAwesomeIcon icon={faPencil} />
                      </button>
                      <button
                        onClick={() => {}}
                        className="inline-flex items-center px-3 py-1.5 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600 transition"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
                {companies.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-12 text-gray-500">
                      No companies available.
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
    </BaseLayout>
  );
};

export default Company;
