import axios from "axios";
import React, { useRef, useState, useEffect } from "react";

interface ImagePickerProps {
  onChange: (url: string) => void;
  initialUrl?: string;
  showOnly?: boolean;
}

const ImagePicker: React.FC<ImagePickerProps> = ({
  onChange,
  initialUrl,
  showOnly = false,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(initialUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImageUrl(initialUrl || null);
  }, [initialUrl]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(`sys/file`, formData)
      .finally(() => setIsUploading(false))
      .then((res) => {
        const data = res.data.data;
        setImageUrl(data.url);
        onChange(data.url);
      });
  };

  return (
    <div className="flex flex-col items-center w-full">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Preview"
          className="w-full h-auto bg-cover rounded-lg mb-2"
        />
      ) : (
        // ✅ Tampilkan teks jika kosong dan dalam mode showOnly
        showOnly && (
          <p className="text-sm text-gray-500 mb-2 italic">Tidak ada gambar.</p>
        )
      )}

      {!showOnly && (
        <>
          <button
            onClick={handleButtonClick}
            disabled={isUploading}
            className={`px-4 py-2 rounded-lg bg-blue-500 text-white ${
              isUploading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
          >
            {isUploading ? "Mengupload..." : "Upload Gambar"}
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  );
};

export default ImagePicker;
