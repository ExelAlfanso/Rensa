import { useLoading } from "@/hooks/useLoading";
import api from "@/lib/axios";
import { ArrowLeftIcon, PanoramaIcon } from "@phosphor-icons/react";
import React, { useCallback, useState } from "react";
import Text from "../Text";
import Button from "./Button";
import Heading from "../Heading";
import { useRouter } from "next/navigation";
import Image from "next/image";
import InputField from "../inputfields/InputField";

interface UploadButtonProps {
  onFileSelect?: (file: File) => void;
  userId?: string;
}
interface UploadFormProps {
  file: File | null;
  title: string;
  caption: string;
}
const UploadButton: React.FC<UploadButtonProps> = ({
  onFileSelect,
  userId,
}) => {
  // const [form, setForm] = useState<UploadFormProps>({
  //   file: null,
  //   title: "",
  //   caption: "",
  // });
  const [photo, setPhoto] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // after continue use useLoading hook
  const [message, setMessage] = useState("");
  // const { loading, setLoading } = useLoading();
  const router = useRouter();
  let content;

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);
  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;

    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback(
    (file: File) => {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.name.toLowerCase().endsWith(".jpg") ||
        file.name.toLowerCase().endsWith(".jpeg");
      const isLt5MB = file.size / 1024 / 1024 < 5; // size in MB
      if (!isLt5MB) {
        setMessage("Image must be smaller than 5MB!");
        return;
      }
      if (!isJPG) {
        setMessage("Only JPG/JPEG files are allowed.");
        return;
      }
      setUploadedFile(null);
      setMessage("");
      setIsUploading(true);

      setTimeout(() => {
        setUploadedFile(file);
        setIsUploading(false);
        onFileSelect?.(file);
      }, 800);
    },
    [onFileSelect]
  );
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
      const previewFile = URL.createObjectURL(file);
      setPhoto(previewFile);
    }
  };

  const handleCancel = () => {
    setMessage("");
    setUploadedFile(null);
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
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
    <div className="w-full max-w-4xl gap-2 mx-auto">
      {uploadedFile ? (
        <div className="flex items-center justify-between mb-10">
          <Button onClick={handleCancel} color={"tertiary"}>
            Cancel
          </Button>{" "}
          <Button color={"primary"}>Continue</Button>
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
        <div
          onClick={handleBrowseClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`flex flex-col items-center justify-center max-w-2xl mx-auto my-20 transition-all duration-300 border-2 border-dashed cursor-pointer px-28 border-white-700 ${
            isDragOver ? "bg-white-600" : "hover:bg-white-600"
          } rounded-3xl h-96`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,.jpg,.jpeg"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex items-center justify-center">
            {isUploading ? (
              <div className="mb-6 bg-gray-700 loading loading-spinner loading-xl"></div>
            ) : (
              <PanoramaIcon size={240} weight={"thin"}></PanoramaIcon>
            )}
          </div>
          <div className="flex flex-col items-center justify-center">
            {content}
          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-5 items-center justify-center">
          <div>
            <Heading size="l">What it is about?</Heading>
            <Image
              src={photo}
              alt={"image"}
              width={400}
              height={300}
              className="rounded-3xl"
            ></Image>
          </div>
          <div className="w-200 rounded-3xl shadow-lg p-10 bg-white-200 text-primary mt-10">
            <InputField
              size="m"
              type={"text"}
              label="Title"
              placeholder="Title"
              onChange={function (
                e: React.ChangeEvent<HTMLInputElement>
              ): void {
                throw new Error("Function not implemented.");
              }}
            ></InputField>
            <InputField
              type={"text"}
              label="Description"
              size="xxl"
              placeholder="Add a description"
              onChange={function (
                e: React.ChangeEvent<HTMLInputElement>
              ): void {
                throw new Error("Function not implemented.");
              }}
            ></InputField>
            <InputField
              type={"text"}
              label="Tags"
              size="m"
              placeholder="Add tags"
              onChange={function (
                e: React.ChangeEvent<HTMLInputElement>
              ): void {
                throw new Error("Function not implemented.");
              }}
            ></InputField>
            <div className="border-t border-white-700 w-full my-2"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadButton;

// const handleUpload = async () => {
//   if (!form.file) return;
//   if (!form.title || !form.title.trim()) {
//     setMessage("Title is required!");
//     return;
//   }
//   // setLoading(true);

//   const reader = new FileReader();
//   reader.readAsDataURL(form.file);
//   reader.onloadend = async () => {
//     try {
//       await api.post("/photos/upload", {
//         file: reader.result,
//         userId,
//         title: form.title,
//         caption: form.caption,
//       });
//       setMessage("Upload successfully!");
//     } catch (err) {
//       console.error("Upload failed:", err);
//     } finally {
//       // setLoading(false);
//     }
//   };
// };
