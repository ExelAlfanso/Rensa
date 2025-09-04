import React from "react";
import InputField from "../inputfields/InputField";

const UploadForm = () => {
  return (
    <div className="w-200 rounded-3xl shadow-lg p-10 bg-white-200 text-primary mt-10">
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
      <div className="border-t border-white-700 w-full my-2"></div>
    </div>
  );
};

export default UploadForm;
