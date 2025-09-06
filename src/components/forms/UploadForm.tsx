import React, { useEffect, useState } from "react";
import InputField from "../inputfields/InputField";
import InputDropdown from "../inputfields/InputDropdown";
import { cameraOptions } from "@/app/datas/uploadFormDatas";
import ExifReader from "exifreader";
// import exifr from "exifr";
import { exiftool } from "exiftool-vendored";

import { CameraSettings, defaultCameraSettings } from "@/app/datas/cameraDatas";
import CameraSettingsForm from "./CameraSettingsForm";

interface UploadFormProps {
  file: File;
  photo: string;
  onChange: (field: string, value: string | string[]) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onChange, photo, file }) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [settings, setSettings] = useState<CameraSettings>(
    defaultCameraSettings["Fujifilm"]
  );
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [recipe, setRecipe] = useState({});
  const handleDetectMetadata = async (photo: string) => {
    setIsDetecting(true);
    try {
      // const res = await exifr.parse(photo);
      const res = await ExifReader.load(file);
      console.log("Detected metadata:", res);
    } catch (err) {
      console.error("Metadata detection failed:", err);
    } finally {
      setIsDetecting(false);
    }
  };

  useEffect(() => {
    if (photo) {
      handleDetectMetadata(photo);
    }
  }, [photo]);

  const handleCameraChange = (brand: CameraSettings["brand"]) => {
    setSettings(defaultCameraSettings[brand]);
  };
  return (
    <div className="p-10 mt-10 shadow-lg w-200 rounded-3xl bg-white-200 text-primary">
      <InputField
        size="m"
        type={"text"}
        label="Title"
        placeholder="Title"
        onChange={(e) => onChange("title", e.target.value)}
      ></InputField>
      <InputField
        type={"text"}
        label="Description"
        size="xxl"
        placeholder="Add a description"
        onChange={(e) => onChange("description", e.target.value)}
      ></InputField>
      <InputField
        type={"text"}
        label="Tags"
        size="m"
        placeholder="Add tags"
        onChange={(e) => {}}
      ></InputField>
      <div className="w-full my-2 border-t border-white-700"></div>
      <div className="flex items-center justify-center">
        {isDetecting ? (
          <div className="loading loading-spinner loading-xl text-primary mt-5" />
        ) : (
          <CameraSettingsForm
            settings={settings}
            onChange={(field, value) => {
              setSettings((prev) => ({
                ...prev,
                [field]: value,
              }));
            }}
          />
        )}
      </div>
    </div>
  );
};

export default UploadForm;
