import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/features/loading/loadingSlice";
import type { RootState } from "../../../redux/app/store";
import axios from "axios";
import TextField from "../../../components/TextField";
import DropdownField from "../../../components/DropdownField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ImagePicker from "../../../components/ImageUploader";
import PdfUploader from "../../../components/PdfUploader";
import { toast } from "react-toastify";

const EditCompany = ({ data, onBack }: any) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  const [dataCompany, setDataCompany] = useState<any>({
    ...data,
    chageList: data.charges,
  });

  const saveCompany = () => {
    if (!dataCompany.name) {
      toast.error("Nama company tidak boleh kosong");
      return;
    }
    if (!dataCompany.initial) {
      toast.error("Initial tidak boleh kosong");
      return;
    }
    if (!dataCompany.email) {
      toast.error("Email tidak boleh kosong");
      return;
    }
    if (!dataCompany.address) {
      toast.error("Alamat tidak boleh kosong");
      return;
    }
    if (!dataCompany.picName) {
      toast.error("Nama PIC tidak boleh kosong");
      return;
    }
    if (!dataCompany.picEmail) {
      toast.error("Email PIC tidak boleh kosong");
      return;
    }

    for (let i = 0; i < dataCompany?.chargeList?.length; i++) {
      const charge = dataCompany.chargeList[i];
      if (!charge.maxCharge) {
        toast.error(`Max Charge pada baris ${i + 1} tidak boleh kosong`);
        return;
      }
      if (!charge.minCharge) {
        toast.error(`Min Charge pada baris ${i + 1} tidak boleh kosong`);
        return;
      }
      if (!charge.type) {
        toast.error(`Tipe pada baris ${i + 1} tidak boleh kosong`);
        return;
      }
      if (!charge.value) {
        toast.error(`Value pada baris ${i + 1} tidak boleh kosong`);
        return;
      }
      if (!charge.description) {
        toast.error(`Deskripsi pada baris ${i + 1} tidak boleh kosong`);
        return;
      }
    }
    dispatch(setLoading(true));
    const { charges, apiToken, id, ...rest } = dataCompany;
    axios
      .put(`admin/company/${data.id}`, {
        ...rest,
        chargeList: dataCompany?.charges,
      })
      .finally(() => {
        dispatch(setLoading(false));
      })
      .then((res) => {
        toast.success("Berhasil mengupdate data");
        onBack();
      });
  };

  const handleChangeValue = (key: any, value: any, type?: any) => {
    setDataCompany({ ...dataCompany, [key]: value });
  };

  const handleChangeChargeValue = (index: number, key: any, value: any) => {
    const updatedCharges = [...dataCompany.charges];
    updatedCharges[index][key] = value;
    setDataCompany({ ...dataCompany, charges: updatedCharges });
  };

  const handleLogoChange = (url: string) => {
    handleChangeValue("imageUrl", url);
  };

  const handlePdfChange = (urls: string[]) => {
    setDataCompany({
      ...dataCompany,
      agreementLink: urls,
    });
    console.log("File PDF saat ini:", urls);
  };

  const addCharge = () => {
    const newCharge = {
      maxCharge: "",
      minCharge: "",
      type: "",
      value: "",
      description: "",
    };
    if (dataCompany.charges) {
      setDataCompany({
        ...dataCompany,
        charges: [...dataCompany.charges, newCharge],
      });
    } else {
      setDataCompany({
        ...dataCompany,
        charges: [newCharge],
      });
    }
  };

  const removeCharge = (index: number) => {
    const updatedCharges = dataCompany.charges.filter(
      (_: any, i: any) => i !== index
    );
    setDataCompany({ ...dataCompany, charges: updatedCharges });
  };

  return (
    <div
      className={`rounded-xl shadow-md h-auto transition-all duration-200 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"
      }`}
    >
      <div>
        <div className="w-full p-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-xl font-semibold">Edit Data Company</p>
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
              value={dataCompany.name}
              onChange={(e: any) => handleChangeValue("name", e)}
              title="Nama Company"
            />
            <TextField
              value={dataCompany.initial}
              onChange={(e: any) => handleChangeValue("initial", e)}
              title="Initial"
            />
            <DropdownField
              title="Arsip"
              placeHolder="Arsip"
              value={dataCompany.archived}
              onChange={(e: any) => handleChangeValue("archived", e)}
              options={[
                { label: "Iya", value: true as any },
                { label: "Tidak", value: false as any },
              ]}
            />
          </div>

          <TextField
            value={dataCompany.email}
            onChange={(e: any) => handleChangeValue("email", e)}
            title="Email"
            className="my-5"
          />

          <div className="w-full grid grid-cols-3 gap-4">
            <TextField
              value={dataCompany.address}
              onChange={(e: any) => handleChangeValue("address", e)}
              title="Alamat"
              multiline
            />
            <div>
              <p className="mb-2">Upload Dokumen</p>
              <PdfUploader
                onChange={handlePdfChange}
                initialUrls={dataCompany.agreementLink}
              />
            </div>
            <div>
              <p className="mb-2">Upload Logo Company</p>
              <ImagePicker
                onChange={handleLogoChange}
                initialUrl={dataCompany.imageUrl}
              />
            </div>
          </div>

          <p className="font-bold mt-5">Data PIC</p>
          <TextField
            value={dataCompany.picName}
            onChange={(e: any) => handleChangeValue("picName", e)}
            title="Nama PIC"
            className="my-5"
          />
          <TextField
            value={dataCompany.picEmail}
            onChange={(e: any) => handleChangeValue("picEmail", e)}
            title="Email PIC"
            className="my-5"
          />
          <TextField
            value={dataCompany.picNumber}
            onChange={(e: any) => handleChangeValue("picNumber", e)}
            title="Nomor Hp PIC"
            className="my-5"
          />

          {/* List Biaya Admin */}
          <div className="font-bold mt-5">
            <p>List Biaya Admin</p>
            <button
              onClick={addCharge}
              className="text-sm px-4 py-2 my-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              + Tambah Biaya
            </button>
          </div>

          {dataCompany?.charges?.map((res: any, i: number) => (
            <div
              key={i}
              className="w-full grid grid-cols-9 gap-4 items-center justify-between my-4"
            >
              <TextField
                value={res.maxCharge}
                onChange={(e: any) =>
                  handleChangeChargeValue(i, "maxCharge", e)
                }
                title="Max Charge"
                numberOnly
                className=""
              />
              <TextField
                value={res.minCharge}
                onChange={(e: any) =>
                  handleChangeChargeValue(i, "minCharge", e)
                }
                title="Min Charge"
                numberOnly
                className=""
              />
              <TextField
                value={res.type}
                onChange={(e: any) => handleChangeChargeValue(i, "type", e)}
                title="Tipe"
                className="col-span-2"
              />
              <TextField
                value={res.value}
                onChange={(e: any) => handleChangeChargeValue(i, "value", e)}
                title="Value"
                numberOnly
                className=""
              />
              <TextField
                value={res.description}
                onChange={(e: any) =>
                  handleChangeChargeValue(i, "description", e)
                }
                title="Deskripsi"
                className="col-span-3"
              />
              <div className="flex justify-center items-center">
                <button
                  onClick={() => removeCharge(i)}
                  className="p-3 text-xs bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  <FontAwesomeIcon icon={faTrash} size="xl" />
                </button>
              </div>
            </div>
          ))}
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
  );
};

export default EditCompany;
