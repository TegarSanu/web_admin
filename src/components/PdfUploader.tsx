import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useRef, useState, useEffect } from "react";

interface PdfUploaderProps {
  onChange: (urls: string[]) => void;
  initialUrls?: string[];
  initialName?: string[];
  showOnly?: boolean;
}

const PdfUploader: React.FC<PdfUploaderProps> = ({
  onChange,
  initialUrls = [],
  initialName = [],
  showOnly = false,
}) => {
  const [fileUrls, setFileUrls] = useState<string[]>(initialUrls);
  const [fileName, setFileName] = useState<string[]>(initialName);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFileUrls(initialUrls);
  }, [initialUrls]);

  useEffect(() => {
    if (initialName.length > 0) {
      setFileName(initialName);
    }
  }, [initialName]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const uploadedUrls: string[] = [];
    const uploadedName: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        await axios.post(`sys/file`, formData).then((res) => {
          const data = res.data.data;
          uploadedUrls.push(data.url);
          uploadedName.push(data.name);
        });
      }

      const updatedUrls = [...fileUrls, ...uploadedUrls];
      const updatedName = [...fileName, ...uploadedName];
      setFileUrls(updatedUrls);
      setFileName(updatedName);
      onChange(updatedUrls);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = (indexToRemove: number) => {
    const updatedUrls = fileUrls.filter((_, index) => index !== indexToRemove);
    setFileUrls(updatedUrls);
    onChange(updatedUrls);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {fileUrls.length > 0 ? (
        <div className="flex flex-col w-full mb-2 space-y-1">
          {fileUrls.map((url, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 px-2 py-1 rounded"
            >
              <div className="flex gap-2 items-center max-w-[80%]">
                <FontAwesomeIcon icon={faFilePdf} />
                <a
                  title={fileName[index]}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline truncate"
                >
                  {fileName[index]}
                </a>
              </div>
              {!showOnly && (
                <button
                  onClick={() => handleRemove(index)}
                  className="text-red-500 hover:text-red-700 ml-2 text-sm"
                >
                  Hapus
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        // ✅ Tampilkan teks jika kosong
        <p className="text-sm text-gray-500 mb-2 italic">Tidak ada dokumen.</p>
      )}

      {!showOnly && (
        <>
          <button
            onClick={handleButtonClick}
            disabled={isUploading}
            className={`px-4 py-2 rounded-lg bg-green-500 text-white ${
              isUploading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-green-600"
            }`}
          >
            {isUploading ? "Mengupload..." : "Upload PDF"}
          </button>

          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            multiple
          />
        </>
      )}
    </div>
  );
};

export default PdfUploader;
