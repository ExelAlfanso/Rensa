import api from "@/lib/axios";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import React, { useState } from "react";
import Text from "../Text";
import Button from "./Button";
import Heading from "../Heading";
import { useRouter } from "next/navigation";
import { useFileUpload } from "@/hooks/useFileUpload";
import UploadPreview from "../UploadPreview";
import UploadForm from "../forms/UploadForm";
import UploadDropZone from "../dropzones/UploadDropZone";
import { useSession } from "next-auth/react";
import { useLoading } from "@/hooks/useLoading";

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
  const [form, setForm] = useState({
    file: uploadedFile,
    title: "",
    description: "",
    tags: [],
    metadata: {},
  });

  const handleUpload = async () => {
    if (!form.file) return;
    if (!form.title || !form.title.trim()) {
      // setMessage("Title is required!");
      return;
    }
    setLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(form.file);
    reader.onloadend = async () => {
      try {
        await api.post("/photos/upload", {
          file: reader.result,
          userId: session?.user.id,
          title: form.title,
          description: form.description,
        });
      } catch (err) {
        console.error("Upload failed:", err);
      } finally {
        setLoading(false);
      }
    };
  };
  const handleChange = (field: string, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
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
        <Text size="xxl" className="mb-6">
          Drag and drop an image, or{" "}
          <span>
            <Text size="xxl" className="inline underline">
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
    <div className="w-full gap-2 px-65">
      {uploadedFile ? (
        <div className="flex items-center justify-between mb-10">
          <Button onClick={handleCancel} color={"tertiary"}>
            Cancel
          </Button>{" "}
          <Button onClick={handleUpload} color={"primary"}>
            Upload
          </Button>
        </div>
      ) : (
        <div className="flex items-end justify-between mb-10">
          <button
            onClick={() => router.back()}
            className="text-primary cursor-pointer hover:text-gray-500 transition-colors duration-300"
          >
            <ArrowLeftIcon size={32}></ArrowLeftIcon>
          </button>
        </div>
      )}
      <Heading size="l" alignment="center">
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
        <div className="flex flex-row items-center justify-center">
          <UploadPreview photo={photo}></UploadPreview>
          <UploadForm
            file={uploadedFile}
            photo={photo}
            onChange={handleChange}
          ></UploadForm>
        </div>
      )}
    </div>
  );
};

export default UploadButton;
