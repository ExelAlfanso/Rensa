"use client";
import React from "react";
import InputField from "../inputfields/InputField";
import InputDropdown from "../inputfields/InputDropdown";
import { CameraSettings } from "@/app/datas/cameraDatas";
import { cameraFieldOptions } from "@/app/datas/cameraFieldDatas";
import { formatLabel } from "@/utils/LabelFormatter";
interface CameraSettingsFormProps {
  settings: CameraSettings;
  handleExifChange: (field: string, value: number | object | string) => void;
}

const CameraSettingsForm: React.FC<CameraSettingsFormProps> = ({
  settings,
  handleExifChange,
}) => {
  return (
    <div className="grid w-full grid-cols-1 gap-5">
      {Object.entries(settings).map(([key, value]) => {
        const brand = settings.Brand;
        const options = cameraFieldOptions[brand]?.[key];

        // Skip brand
        if (key === "Brand") return null;

        // Render dropdown if options exist
        if (options && options.length > 0) {
          return (
            <InputDropdown
              key={key}
              label={key}
              initialValue={settings[key as keyof CameraSettings] as string}
              placeholder={`Select ${key}`}
              values={options}
              onChange={(e) => handleExifChange(key, e.currentTarget.innerText)}
            />
          );
        }

        // Render number input if value is numeric
        if (typeof value === "number") {
          return (
            <InputField
              key={key}
              type="number"
              label={key}
              value={settings[key as keyof CameraSettings] as number}
              placeholder={`Enter ${key}`}
              onChange={(e) => handleExifChange(key, Number(e.target.value))}
            />
          );
        }

        // Render object inputs
        if (typeof value === "object" && value !== null) {
          return (
            <div key={key} className="p-2 border border-gray-500 rounded-lg">
              <h4 className="font-semibold">{formatLabel(key)}</h4>
              {Object.entries(value).map(([subKey, subVal]) => (
                <InputField
                  key={subKey}
                  type="number"
                  label={subKey}
                  placeholder={`Enter ${subKey}`}
                  value={subVal as number}
                  onChange={(e) =>
                    handleExifChange(key, {
                      ...value,
                      [subKey]: Number(e.target.value),
                    })
                  }
                />
              ))}
            </div>
          );
        }
      })}
    </div>
  );
};

export default CameraSettingsForm;
