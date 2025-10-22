import React, { useEffect } from "react";
import InputField from "../inputfields/InputField";
import { CameraSettings, defaultCameraSettings } from "@/app/datas/cameraDatas";
import CameraSettingsForm from "./CameraSettingsForm";
import InputDropdown from "../inputfields/InputDropdown";
import TagsInputField from "../inputfields/TagsInputField";
import { brandModels } from "@/app/datas/cameraModelDatas";
import { useExifDetection } from "@/hooks/useExifDetection";
import { FilterLists } from "@/app/datas/filterDatas";
import TextAreaInput from "../inputfields/TextAreaInput";
import BaseInputField from "../inputfields/BaseInputField";

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
  const {
    isDetecting,
    detectAndApplyExif,
    settings,
    selectedCamera,
    setSelectedCamera,
    setSettings,
  } = useExifDetection(file, handleExifChange);

  useEffect(() => {
    if (photo) detectAndApplyExif();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photo]);

  const handleBrandChange = (brand: CameraSettings["Brand"]) => {
    setSelectedCamera(brand);
    setSettings(defaultCameraSettings[brand]);
    handleExifChange("Brand", brand);
  };
  return (
    <div className="flex flex-col gap-5 p-10 mt-10 overflow-y-scroll shadow-lg w-[80%] md:h-190 lg:h-175 no-scrollbar rounded-3xl bg-white-200 text-primary mb-25">
      <BaseInputField
        label="Title"
        placeholder="Title"
        onChange={(e) => onChange("title", e.target.value)}
      ></BaseInputField>
      <TextAreaInput
        label="Description"
        placeholder="Add a description"
        onChange={(e) => onChange("description", e.target.value)}
      ></TextAreaInput>
      <TagsInputField
        label={"Tags"}
        tags={tags}
        placeholder={"Enter Tags"}
        handleTags={handleTags}
      ></TagsInputField>
      <InputDropdown
        label="Category"
        placeholder="Select Category"
        values={FilterLists[0].items.map((item) => item.label)}
        onChange={(e) => {
          const category = e.currentTarget.innerText;
          onChange("category", category);
        }}
      ></InputDropdown>
      <InputDropdown
        label="Style"
        placeholder="Select Style"
        values={FilterLists[2].items.map((item) => item.label)}
        onChange={(e) => {
          const style = e.currentTarget.innerText;
          onChange("style", style);
        }}
      ></InputDropdown>
      <InputDropdown
        label="Color"
        placeholder="Select Color"
        values={FilterLists[3].items.map((item) => item.label)}
        onChange={(e) => {
          const color = e.currentTarget.innerText;
          onChange("color", color);
        }}
      ></InputDropdown>
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
                handleBrandChange(brand);
              }}
            />
            <CameraSettingsForm
              cameraModels={brandModels[selectedCamera] || []}
              settings={settings}
              handleSettings={setSettings}
            ></CameraSettingsForm>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadForm;
