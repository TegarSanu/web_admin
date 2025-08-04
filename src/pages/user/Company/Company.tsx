import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/features/loading/loadingSlice";
import type { RootState } from "../../../redux/app/store";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faArrowCircleUp,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import TextField from "../../../components/TextField";
import { toast } from "react-toastify";
import BaseLayout from "../BaseLayoutCompany";
import DropdownField from "../../../components/DropdownField";
import PdfUploader from "../../../components/PdfUploader";
import ImagePicker from "../../../components/ImageUploader";

const Company = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  const [dataCompany, setDataCompany] = useState<any>({});

  const getCompany = () => {
    dispatch(setLoading(true));
    axios
      .get("company-dashboard/company")
      .finally(() => dispatch(setLoading(false)))
      .then((res) => {
        setDataCompany(res.data.data);
      });
  };

  useEffect(() => {
    getCompany();
  }, []);

  return (
    <BaseLayout>
      <div
        className={`rounded-xl shadow-md h-auto transition-all duration-200 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"
        }`}
      >
        <div>
          <div className="w-full p-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-xl font-semibold">Data Company</p>
          </div>
          <div className="w-full p-5">
            <div className="w-full grid grid-cols-3 gap-4">
              <TextField
                value={dataCompany.name}
                onChange={(e: any) => {}}
                title="Nama Company"
                disabled
              />
              <TextField
                value={dataCompany.initial}
                onChange={(e: any) => {}}
                title="Initial"
                disabled
              />
              <TextField
                value={dataCompany.archived ? "Iya" : "Tidak"}
                onChange={(e: any) => {}}
                title="Arsip"
                disabled
              />
            </div>

            <div className="w-full grid grid-cols-2 gap-4">
              <TextField
                value={dataCompany.email}
                onChange={(e: any) => {}}
                title="Email"
                className="my-5"
                disabled
              />
              <TextField
                value={dataCompany.address}
                onChange={(e: any) => {}}
                title="Alamat"
                multiline
                className="my-5"
                disabled
              />
            </div>

            <div className="w-full grid grid-cols-4 gap-4">
              <div>
                <p className="mb-2">Logo Company</p>
                <ImagePicker
                  showOnly
                  onChange={() => {}}
                  initialUrl={dataCompany.imageUrl}
                />
              </div>
              <div className="col-span-2">
                <p className="mb-2">List Dokumen</p>
                <PdfUploader
                  showOnly
                  onChange={() => {}}
                  initialUrls={dataCompany.agreementLink}
                  initialName={dataCompany.agreementLinkName}
                />
              </div>
            </div>

            <p className="font-bold mt-5">Data PIC</p>
            <TextField
              value={dataCompany.picName}
              onChange={(e: any) => {}}
              title="Nama PIC"
              className="my-5"
              disabled
            />
            <TextField
              value={dataCompany.picEmail}
              onChange={(e: any) => {}}
              title="Email PIC"
              className="my-5"
              disabled
            />
            <TextField
              value={dataCompany.picNumber}
              onChange={(e: any) => {}}
              title="Nomor Hp PIC"
              className="my-5"
              disabled
            />

            {/* List Biaya Admin */}
            <div className="font-bold mt-5">
              <p>List Biaya Admin</p>
            </div>

            {dataCompany?.charges?.map((res: any, i: number) => (
              <div
                key={i}
                className="w-full grid grid-cols-9 gap-4 items-center justify-between my-4"
              >
                <TextField
                  value={res.maxCharge}
                  onChange={(e: any) => {}}
                  title="Max Charge"
                  numberOnly
                  className=""
                  disabled
                />
                <TextField
                  value={res.minCharge}
                  onChange={(e: any) => {}}
                  title="Min Charge"
                  numberOnly
                  className=""
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
                  className=""
                  disabled
                />
                <TextField
                  value={res.description}
                  onChange={(e: any) => {}}
                  title="Deskripsi"
                  className="col-span-4"
                  disabled
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Company;
