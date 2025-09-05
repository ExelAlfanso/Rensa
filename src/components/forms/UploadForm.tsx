import React, { useState } from "react";
import InputField from "../inputfields/InputField";
import InputDropdown from "../inputfields/InputDropdown";
import { cameraOptions } from "@/app/datas/uploadFormDatas";
const UploadForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tags: [],
    metadata: {},
  });
  const [isDetecting, setIsDetecting] = useState(false);
  return (
    <div className="p-10 mt-10 shadow-lg w-200 rounded-3xl bg-white-200 text-primary">
      <InputField
        size="m"
        type={"text"}
        label="Title"
        placeholder="Title"
        onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error("Function not implemented.");
        }}
      ></InputField>
      <InputField
        type={"text"}
        label="Description"
        size="xxl"
        placeholder="Add a description"
        onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error("Function not implemented.");
        }}
      ></InputField>
      <InputField
        type={"text"}
        label="Tags"
        size="m"
        placeholder="Add tags"
        onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error("Function not implemented.");
        }}
      ></InputField>
      <div className="w-full my-2 border-t border-white-700"></div>
      <div>
        <InputDropdown
          label="Camera brand"
          values={cameraOptions}
          placeholder="Select camera"
        ></InputDropdown>
      </div>
    </div>
  );
};

export default UploadForm;
