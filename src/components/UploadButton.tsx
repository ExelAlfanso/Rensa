import { useLoading } from "@/context/LoadingContext";
import api from "@/lib/axios";
import React, { useState } from "react";

interface UploadButtonProps {
  userId?: string;
}
interface UploadFormProps {
  file: File | null;
  caption: string;
}
const UploadButton: React.FC<UploadButtonProps> = ({ userId }) => {
  //   const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState<UploadFormProps>({
    file: null,
    caption: "",
  });
  const { loading, setLoading } = useLoading();
  const [message, setMessage] = useState("");
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = e.target.files[0];
      if (selected.type !== "image/jpeg") {
        setMessage("Only JPEG files are allowed!");
      }
      setForm({ ...form, file: selected });
    }
  };
  const handleUpload = async () => {
    if (!form.file) return;
    setLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(form.file);
    reader.onloadend = async () => {
      try {
        await api.post("/photos/upload", {
          file: reader.result,
          userId,
          caption: form.caption,
        });
        setMessage("Upload successfully!");
      } catch (err) {
        console.error("Upload failed:", err);
      } finally {
        setLoading(false);
      }
    };
  };
  return (
    <div className="flex flex-col items-center gap-2">
      {message}
      <input
        type="file"
        accept="image/jpeg"
        onChange={handleFileChange}
        className="file-input"
      />
      <input
        type="text"
        onChange={(e) => setForm({ ...form, caption: e.target.value })}
        className="file-input"
      />
      <button
        className="btn btn-primary disabled:opacity-50"
        onClick={handleUpload}
        disabled={loading}
      >
        Upload
      </button>
    </div>
  );
};

export default UploadButton;
