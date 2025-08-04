import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/features/loading/loadingSlice";
import BaseLayout from "../BaseLayoutAdmin";
import type { RootState } from "../../../redux/app/store";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleUp,
  faCheckCircle,
  faCopy,
  faPencil,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import EditCompany from "./EditCompany";
import { useNavigate } from "react-router-dom";
import TextField from "../../../components/TextField";
import { toast } from "react-toastify";
import { getData } from "../../../api/config";
import DropdownField from "../../../components/DropdownField";
import Pagination from "../../../components/Pagination";
import Modal from "../../../components/Modal";

const Company = () => {
  const sessionId = getData("session-superadmin");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  const [companies, setCompanies] = useState<any[]>([]);
  const [editedCompany, setEditedCompany] = useState<any>(null);
  const nameRef: any = useRef(null);
  const [paging, setPaging] = useState({
    page: 1,
    size: 10,
    totalElements: 0,
    totalPages: 1,
  });
  const [filter, setFilter] = useState({
    archived: false,
    name: "",
    initial: "",
    id: "",
    page: 1,
    size: 10,
    sortBy: "-createdDate",
  });
  const [tokenModalOpen, setTokenModalOpen] = useState(false);
  const [generatedToken, setGeneratedToken] = useState("");
  const [id, setId] = useState("");

  const getCompany = () => {
    dispatch(setLoading(true));
    axios
      .get("admin-dashboard/company", { params: filter })
      .finally(() => dispatch(setLoading(false)))
      .then((res) => {
        setPaging(res.data.paging);
        setCompanies(res.data.data);
        setGeneratedToken(
          res.data.data.find((el: any) => el.id === id).apiToken
        );
      });
  };

  const updateToken = (id: string) => {
    setId(id);
    dispatch(setLoading(true));
    axios
      .post("admin-dashboard/company/token/_update", { id: id })
      .finally(() => dispatch(setLoading(false)))
      .then((res) => {
        getCompany();
        setTokenModalOpen(true);
        toast.success("Berhasil update token");
      });
  };

  useEffect(() => {
    getCompany();
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
      page: 1,
    }));
  };

  return (
    <BaseLayout>
      {editedCompany ? (
        <EditCompany
          data={editedCompany}
          onBack={() => {
            setEditedCompany(null);
            getCompany();
          }}
        />
      ) : (
        <div
          className={`rounded-xl shadow-md h-auto transition-all duration-200 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"
          }`}
        >
          <div>
            <div className="w-full p-4 border-b border-gray-200 flex items-center justify-between">
              <p className="text-xl font-semibold">Data Company</p>
            </div>
            <div className="w-full p-4">
              <div className="grid grid-cols-3 gap-4">
                <TextField
                  title="Nama Company"
                  onChange={(e: any) => handleFilterChange("name", e)}
                />
                <TextField
                  title="Initial"
                  onChange={(e: any) => handleFilterChange("initial", e)}
                />
                <DropdownField
                  title="Arsip"
                  placeHolder="Arsip"
                  value={filter.archived}
                  onChange={(e: any) => handleFilterChange("archived", e)}
                  options={[
                    { label: "Iya", value: true as any },
                    { label: "Tidak", value: false as any },
                  ]}
                />
              </div>
            </div>
            <div className="w-full p-4 flex justify-end">
              <button
                onClick={() => navigate("add")}
                className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 transition"
              >
                Tambah
              </button>
            </div>

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
                      Initial
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Alamat
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map((company) => (
                    <tr
                      key={company.id}
                      className="hover:bg-gray-50 transition border-b border-gray-200"
                    >
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img
                          src={company.imageUrl}
                          alt={company.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {company.name}
                      </td>
                      <td className="px-6 py-4">{company.initial}</td>
                      <td className="px-6 py-4">{company.address}</td>
                      <td className="px-6 py-4">{company.email}</td>
                      <td className="px-6 py-4">
                        {company.archived ? "Arsip" : "Tidak"}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <div className="flex-1 gap-2 flex">
                          <button
                            title={`Login admin company ${company.name}`}
                            onClick={() =>
                              window.open(
                                `/company-dashboard/login?sessionId=${sessionId}&companyId=${company.id}`
                              )
                            }
                            className="inline-flex items-center px-3 py-1.5 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 transition"
                          >
                            <FontAwesomeIcon icon={faSignIn} />
                          </button>
                          <button
                            title={`Edit data ${company.name}`}
                            onClick={() => setEditedCompany(company)}
                            className="inline-flex items-center px-3 py-1.5 text-sm font-semibold text-white bg-yellow-500 rounded hover:bg-yellow-600 transition"
                          >
                            <FontAwesomeIcon icon={faPencil} />
                          </button>
                          <button
                            title={`Update token ${company.name}`}
                            onClick={() => updateToken(company.id)}
                            className="inline-flex items-center px-3 py-1.5 text-sm font-semibold text-white bg-orange-500 rounded hover:bg-yellow-600 transition"
                          >
                            <FontAwesomeIcon icon={faArrowCircleUp} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {companies.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-12 text-gray-500"
                      >
                        No companies available.
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

      <Modal open={tokenModalOpen} onClose={() => setTokenModalOpen(false)}>
        <div className="max-w-2xl w-full">
          <div className="text-center mb-6">
            <FontAwesomeIcon
              size="4x"
              icon={faCheckCircle}
              className="text-green-500 text-6xl mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">
              Token berhasil diperbarui
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Salin token di bawah ini:
            </p>
            <div className="bg-gray-100 px-4 py-3 rounded-md flex justify-between items-center text-sm text-gray-800 break-all">
              <span className="flex-1">{generatedToken}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedToken);
                  toast.info("Token disalin ke clipboard");
                }}
                className="ml-3 text-blue-600 hover:text-blue-800 transition"
                title="Salin Token"
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md mb-6 text-sm text-gray-800">
            <p className="font-bold mb-2">PERINGATAN</p>
            <p className="mb-1">
              Anda dapat melihat Token Company Anda hanya saat ini saja. Segera
              simpan dan amankan agar proses integrasi dan akun company Anda
              terlindungi.
            </p>
            <p className="font-semibold mt-4 mb-1">
              Saran penyimpanan token yang aman:
            </p>
            <p>1. Jangan berikan informasi token Anda kepada siapa pun.</p>
            <p>
              2. Simpan token Anda pada layanan Manajemen Kunci atau layanan
              lain yang dapat mengamankan data Anda.
            </p>
            <p>
              3. Pastikan Anda mengingat tempat penyimpanan credential Anda.
            </p>
          </div>

          <div className="text-end">
            <button
              onClick={() => setTokenModalOpen(false)}
              className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      </Modal>
    </BaseLayout>
  );
};

export default Company;
