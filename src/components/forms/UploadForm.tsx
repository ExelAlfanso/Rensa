import React, { useEffect, useState } from "react";
import InputField from "../inputfields/InputField";

import { CameraSettings, defaultCameraSettings } from "@/app/datas/cameraDatas";
import exifr from "exifr";
import CameraSettingsForm from "./CameraSettingsForm";
import InputDropdown from "../inputfields/InputDropdown";

interface UploadFormProps {
  file: File;
  photo: string;
  onChange: (field: string, value: string | string[]) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onChange, photo }) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [settings, setSettings] = useState<CameraSettings>(
    defaultCameraSettings["Fujifilm"]
  );
  const [selectedCamera, setSelectedCamera] =
    useState<CameraSettings["brand"]>("Fujifilm");
  const handleDetectMetadata = async (photo: string) => {
    setIsDetecting(true);
    try {
      const res = await exifr.parse(photo);
      console.log("Detected metadata:", res);
      if (res?.Make) {
        const brand = res.Make as CameraSettings["brand"];
        setSettings(
          defaultCameraSettings[brand] || defaultCameraSettings["Fujifilm"]
        );
        setSelectedCamera(brand);
        onChange("cameraBrand", brand);
      }
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

  const handleSettingsChange = (
    field: string,
    value: number | object | string
  ) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
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
      <div className="flex flex-col items-center justify-center">
        {isDetecting ? (
          <div className="loading loading-spinner loading-xl text-primary mt-5" />
        ) : (
          <>
            <InputDropdown
              label="Camera Brand"
              placeholder={selectedCamera}
              values={Object.keys(defaultCameraSettings)}
              onChange={(e) =>
                handleCameraChange(
                  e.currentTarget.innerText as CameraSettings["brand"]
                )
              }
            />
            <CameraSettingsForm
              settings={settings}
              onChange={handleSettingsChange}
            ></CameraSettingsForm>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadForm;
