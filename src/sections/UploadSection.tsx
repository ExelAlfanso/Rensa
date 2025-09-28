"use client";

import api from "@/lib/axios";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import Text from "../components/Text";
import Button from "../components/buttons/Button";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { useFileUpload } from "@/hooks/useFileUpload";
import UploadPreview from "../components/UploadPreview";
import UploadForm from "../components/forms/UploadForm";
import UploadDropZone from "../components/dropzones/UploadDropZone";
import { useSession } from "next-auth/react";
import { useLoading } from "@/hooks/useLoading";
import { CameraSettings, defaultCameraSettings } from "@/app/datas/cameraDatas";

interface UploadButtonProps {
  onFileSelect?: (file: File) => void;
}
const UploadButton: React.FC<UploadButtonProps> = ({ onFileSelect }) => {
  const {
    photo,
    uploadedFile,
    isUploading,
    isDragOver,
    message,
    fileInputRef,
    handleDragOver,
    handleDragLeave,
    handleBrowseClick,
    handleDrop,
    handleFileChange,
    handleCancel,
  } = useFileUpload(onFileSelect);
  const { data: session } = useSession();
  const { setLoading } = useLoading();
  const [exif, setExif] = useState<CameraSettings>(
    defaultCameraSettings["Fujifilm"]
  );
  const [error, setError] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [form, setForm] = useState<{
    // file: File | null;
    title: string;
    description: string;
    tags: string[];
    exif: CameraSettings;
  }>({
    title: "",
    description: "",
    tags: [],
    exif: exif,
  });
  useEffect(() => {
    console.log(form);
  }, [form]);
  const handleExifChange = (
    field: string,
    value: number | object | string | CameraSettings["Brand"]
  ) => {
    if (field === "Brand") {
      const newExif = defaultCameraSettings[value as CameraSettings["Brand"]];
      setExif(newExif);
      setForm((prev) => ({ ...prev, exif: newExif }));
    } else {
      setExif((prev) => ({ ...prev, [field]: value }));
      setForm((prev) => ({ ...prev, exif: { ...prev.exif, [field]: value } }));
    }
  };
  const handleTagsChange = (value: string | string[]) => {
    if (typeof value === "string") {
      if (!value.trim() || tags.includes(value.trim())) return;
      setTags((prev) => [...prev, value.trim()]);
      setForm((prev) => ({ ...prev, tags: [...prev.tags, value.trim()] }));
    } else {
      setTags([...value]);
      setForm((prev) => ({ ...prev, tags: [...value] }));
    }
  };
  const handleCancelButton = () => {
    handleCancel();
    setForm({
      // file: uploadedFile,
      title: "",
      description: "",
      tags: [],
      exif: exif,
    });
  };
  const handleUpload = async () => {
    setError("");
    if (!form.title.trim()) {
      setError("Title is required!");
      return;
    }
    if (!form.description.trim()) {
      setError("Description is required!");
      return;
    }
    if (!form.tags || form.tags.length === 0) {
      setError("At least one tag is required!");
      return;
    }

    if (!photo) {
      setError("No photo selected!");
      return;
    }

    const formData = new FormData();
    if (uploadedFile) {
      formData.append("file", uploadedFile); // must be a File/Blob
    }
    formData.append("userId", session?.user.id || "");
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("tags", JSON.stringify(form.tags));
    formData.append("exif", JSON.stringify(form.exif));

    setLoading(true);
    try {
      await api.post("/photos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      router.push("/explore");
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };
  const router = useRouter();
  let content;

  if (uploadedFile) {
    content = (
      <>
        <Text size="xxl" className="mb-6 ">
          Upload successful!
        </Text>
      </>
    );
  } else if (isUploading) {
    content = (
      <>
        <Text size="xxl" className="mb-6">
          Uploading your file...
        </Text>
        <Text size="m" className="text-white-800">
          Please wait a moment
        </Text>
      </>
    );
  } else if (message) {
    content = (
      <>
        <Text size="xxl" className="mb-6 ">
          Upload failed!
        </Text>
        <Text size="m" className="text-red-500 ">
          {message}
        </Text>
      </>
    );
  } else {
    content = (
      <>
        <Text size="xl" className="mb-6">
          Drag and drop an image, or{" "}
          <span>
            <Text size="xl" className="inline underline">
              Browse
            </Text>
          </span>
        </Text>
        <Text size="m" className="text-white-800">
          High resolution images (jpeg)
        </Text>
      </>
    );
  }

  return (
    <div className="w-full gap-2 px-5 md:px-10 xl:px-65">
      {uploadedFile ? (
        <div className="flex items-center justify-between py-10 lg:mb-10">
          <Button onClick={handleCancelButton} color={"tertiary"}>
            Cancel
          </Button>
          <Button onClick={handleUpload} color={"primary"}>
            Upload
          </Button>
        </div>
      ) : (
        <div className="flex items-end justify-between mb-10">
          <button
            onClick={() => router.back()}
            className="transition-colors duration-300 cursor-pointer text-primary hover:text-gray-500"
          >
            <ArrowLeftIcon size={32}></ArrowLeftIcon>
          </button>
        </div>
      )}
      <Heading size="s" alignment="center">
        {!uploadedFile && "Show us the scene that stayed with you."}
      </Heading>
      {!uploadedFile ? (
        <UploadDropZone
          handleBrowseClick={handleBrowseClick}
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          isDragOver={isDragOver}
          isUploading={isUploading}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          content={content}
        ></UploadDropZone>
      ) : (
        <div className="pt-15">
          {error && (
            <Text className="text-center mb-2 text-red-500">{error}</Text>
          )}
          <div className="flex flex-col lg:flex-row items-center justify-center">
            <UploadPreview photo={photo}></UploadPreview>
            <UploadForm
              file={uploadedFile}
              photo={photo}
              onChange={handleChange}
              tags={form.tags}
              handleExifChange={handleExifChange}
              handleTags={handleTagsChange}
            ></UploadForm>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadButton;
