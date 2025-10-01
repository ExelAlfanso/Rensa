import React, { useEffect, useState } from "react";
import InputField from "../inputfields/InputField";
import { CameraSettings, defaultCameraSettings } from "@/app/datas/cameraDatas";
import CameraSettingsForm from "./CameraSettingsForm";
import InputDropdown from "../inputfields/InputDropdown";
import api from "@/lib/axios";
import { formatLabelFirstLetter } from "@/utils/LabelFormatter";
import {
  detectValueinString,
  extractNumberFromString,
} from "@/utils/ValueDetections";
import { cameraFieldOptions } from "@/app/datas/cameraFieldDatas";
import TagsInputField from "../inputfields/TagsInputField";
import { brandModels } from "@/app/datas/cameraModelDatas";
import { CodepenLogoIcon } from "@phosphor-icons/react";

interface UploadFormProps {
  file: File;
  photo: string;
  onChange: (field: string, value: string | string[]) => void;
  handleExifChange: (
    field: string,
    value: number | object | string | CameraSettings
  ) => void;
  handleTags: (value: string | string[]) => void;
  tags: string[];
}

const UploadForm: React.FC<UploadFormProps> = ({
  onChange,
  photo,
  file,
  tags,
  handleExifChange,
  handleTags,
}) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [settings, setSettings] = useState<CameraSettings>(
    defaultCameraSettings["Fujifilm"]
  );
  const [selectedCamera, setSelectedCamera] =
    useState<CameraSettings["Brand"]>("Fujifilm");
  const [detectedMetadata, setDetectedMetadata] = useState(null);
  const handleDetectMetadata = async () => {
    setIsDetecting(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await api.post(
        "https://exifreader.onrender.com/api/exifread",

        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("metadata res:", res?.data.metadata);
      setDetectedMetadata(res?.data.metadata);
      if (res?.data.metadata.Make) {
        const brand = res.data.metadata.Make as CameraSettings["Brand"];
        const newSettings = defaultCameraSettings[brand];
        if (brand in defaultCameraSettings) {
          setSelectedCamera(brand);
          handleExifChange("Brand", brand);
          setSettings(newSettings);
        }
      }
    } catch (err) {
      console.error("Metadata detection failed:", err);
    } finally {
      setIsDetecting(false);
    }
  };
  const handleAutoFill = () => {
    for (const [key, value] of Object.entries(detectedMetadata || {})) {
      if (key in settings) {
        handleExifChange(key, value as string | number | object);
        setSettings((prev) => ({ ...prev, [key]: value }));
        console.log("Detected: ", key, value);
        if (typeof value === "string") {
          const detectedValue = detectValueinString(
            cameraFieldOptions[selectedCamera]?.[key] || [],
            value
          );
          if (detectedValue) {
            handleExifChange(key, detectedValue);
            setSettings((prev) => ({ ...prev, [key]: detectedValue }));
          } else {
            const extractedNumber = extractNumberFromString(value);
            console.log("Extracted " + extractedNumber + " from: " + value);
            if (extractedNumber !== null) {
              handleExifChange(key, extractedNumber);
              setSettings((prev) => ({ ...prev, [key]: extractedNumber }));
            }
          }
        } else {
          setSettings((prev) => ({ ...prev, [key]: value }));
        }
      }
    }
  };
  // Automatically detect metadata when photo changes
  useEffect(() => {
    if (photo) {
      handleDetectMetadata();
    }
  }, [photo]);

  useEffect(() => {
    if (detectedMetadata) {
      handleAutoFill();
    }
  }, [detectedMetadata]);
  return (
    <div className="flex flex-col gap-5 p-10 mt-10 overflow-y-scroll shadow-lg w-[80%] md:h-190 lg:h-175 no-scrollbar rounded-3xl bg-white-200 text-primary mb-25">
      <InputField
        size="m"
        type={"text"}
        label="Title"
        placeholder="Title"
        onChange={(e) => onChange("title", e.target.value)}
      ></InputField>
      <InputField
        type={"textarea"}
        label="Description"
        size="xxl"
        placeholder="Add a description"
        onChange={(e) => onChange("description", e.target.value)}
      ></InputField>
      <TagsInputField
        label={"Tags"}
        tags={tags}
        placeholder={"Enter Tags"}
        handleTags={handleTags}
      ></TagsInputField>
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
              onChange={(e) => {
                const brand = e.currentTarget
                  .innerText as CameraSettings["Brand"];
                setSelectedCamera(brand);
                setSettings(defaultCameraSettings[brand]);
                handleExifChange("Brand", brand);
              }}
            />
            <CameraSettingsForm
              cameraModels={brandModels[selectedCamera] || []}
              settings={settings}
              handleSettings={setSettings}
              handleExifChange={handleExifChange}
            ></CameraSettingsForm>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadForm;
