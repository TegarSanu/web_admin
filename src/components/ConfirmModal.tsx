import React, { useEffect, useState } from "react";

interface ConfirmModalProps {
  title?: string;
  desc?: string;
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title,
  desc,
  onClose,
  onConfirm,
}) => {
  const [isVisible, setIsVisible] = useState(false); // for mounting
  const [isAnimating, setIsAnimating] = useState(false); // for transition classes

  useEffect(() => {
    if (open) {
      setIsVisible(true); // mount modal
      setTimeout(() => {
        setIsAnimating(true); // trigger fade-in after tick
      }, 0);
    } else {
      setIsAnimating(false); // trigger fade-out
      setTimeout(() => {
        setIsVisible(false); // unmount after animation ends
      }, 300); // match Tailwind duration
    }
  }, [open]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isAnimating ? "opacity-50" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-white p-7 rounded-xl shadow-xl transform transition-all duration-300 ${
          isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{desc}</p>
        <div className="flex justify-end gap-2">
          <button
            className="w-24 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="w-24 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Ya
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
