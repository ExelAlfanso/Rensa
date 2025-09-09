import React, { useEffect, useState } from "react";
import InputField from "../inputfields/InputField";
import { CameraSettings, defaultCameraSettings } from "@/app/datas/cameraDatas";
import CameraSettingsForm from "./CameraSettingsForm";
import InputDropdown from "../inputfields/InputDropdown";
import api from "@/lib/axios";
import { formatLabelFirstLetter } from "@/utils/LabelFormatter";

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
  const [metadata, setMetadata] = useState({});
  const [selectedCamera, setSelectedCamera] =
    useState<CameraSettings["Brand"]>("Fujifilm");
  const handleDetectMetadata = async () => {
    setIsDetecting(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await api.post(
        "http://localhost:3001/api/exifread",

        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // console.log("Metadata detected:", res?.data.metadata);
      if (res?.data.metadata.Make) {
        const brand = formatLabelFirstLetter(
          res.data.metadata.Make
        ) as CameraSettings["Brand"];
        if (brand in defaultCameraSettings) {
          setSelectedCamera(brand);
          setSettings(defaultCameraSettings[brand]);
          // console.log(`Camera brand set to ${brand}`);
        }
      }
      for (const [key, value] of Object.entries(res?.data.metadata)) {
        if (key in settings) {
          onChange(key, value as string);
          handleSettingsChange(key, value as string | number | object);
          // console.log(`Setting ${key} to ${value}`);
        }
      }
      // console.log(settings);
    } catch (err) {
      console.error("Metadata detection failed:", err);
    } finally {
      setIsDetecting(false);
    }
  };

  useEffect(() => {
    if (photo) {
      handleDetectMetadata();
    }
  }, []);

  const handleCameraChange = (brand: CameraSettings["Brand"]) => {
    setSettings(defaultCameraSettings[brand]);
  };

  const handleSettingsChange = (
    field: string,
    value: number | object | string
  ) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <div className="flex flex-col gap-5 p-10 mt-10 overflow-y-scroll shadow-lg w-250 h-175 no-scrollbar rounded-3xl bg-white-200 text-primary">
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
          <div className="mt-5 loading loading-spinner loading-xl text-primary" />
        ) : (
          <>
            <InputDropdown
              label="Camera Brand"
              placeholder={selectedCamera}
              values={Object.keys(defaultCameraSettings)}
              onChange={(e) =>
                handleCameraChange(
                  e.currentTarget.innerText as CameraSettings["Brand"]
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
