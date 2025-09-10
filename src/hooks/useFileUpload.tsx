// hooks/useFileUpload.ts
import { useState, useCallback, useRef } from "react";

export function useFileUpload(onFileSelect?: (file: File) => void) {
  const [photo, setPhoto] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

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
  const handleFileSelect = useCallback(
    (file: File) => {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.name.toLowerCase().endsWith(".jpg") ||
        file.name.toLowerCase().endsWith(".jpeg");
      const isLt5MB = file.size / 1024 / 1024 < 20; // size in MB
      if (!isLt5MB) {
        setMessage("Image must be smaller than 20MB!");
        return;
      }
      if (!isJPG) {
        setMessage("Only JPG/JPEG files are allowed.");
        return;
      }
      setUploadedFile(null);
      setMessage("");
      setIsUploading(true);

      const previewFile = URL.createObjectURL(file);
      setPhoto(previewFile);

      setTimeout(() => {
        setUploadedFile(file);
        setIsUploading(false);
        onFileSelect?.(file);
      }, 800);
    },
    [onFileSelect]
  );
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = e.dataTransfer.files;

      if (files && files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
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

  return {
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
  };
}
