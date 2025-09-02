import { useLoading } from "@/hooks/useLoading";
import api from "@/lib/axios";
import React, { useState } from "react";

interface UploadButtonProps {
  userId?: string;
}
interface UploadFormProps {
  file: File | null;
  title: string;
  caption: string;
}
const UploadButton: React.FC<UploadButtonProps> = ({ userId }) => {
  const [form, setForm] = useState<UploadFormProps>({
    file: null,
    title: "",
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
    if (!form.title || !form.title.trim()) {
      setMessage("Title is required!");
      return;
    }
    setLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(form.file);
    reader.onloadend = async () => {
      try {
        await api.post("/photos/upload", {
          file: reader.result,
          userId,
          title: form.title,
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
        name="title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Title"
        className="input"
      />
      <input
        type="text"
        name="caption"
        onChange={(e) => setForm({ ...form, caption: e.target.value })}
        placeholder="Caption"
        className="input"
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
