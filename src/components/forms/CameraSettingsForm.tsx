"use client";
import React from "react";
import InputField from "../inputfields/InputField";
import InputDropdown from "../inputfields/InputDropdown";
import { CameraSettings } from "@/app/datas/cameraDatas";

interface CameraSettingsFormProps {
  settings: CameraSettings;
  onChange: (field: string, value: number | object | string) => void;
}

const CameraSettingsForm: React.FC<CameraSettingsFormProps> = ({
  settings,
  onChange,
}) => {
  return (
    <div className="w-full">
      {Object.entries(settings).map(([key, value]) => {
        if (key === "brand") return null; // skip brand since it's dropdown

        // Number input
        if (typeof value === "number") {
          return (
            <InputField
              key={key}
              type="number"
              label={key}
              placeholder={`Enter ${key}`}
              onChange={(e) => onChange(key, Number(e.target.value))}
            />
          );
        }

        // Enum or string dropdown (if small set of values)
        if (typeof value === "string") {
          // You could also look up possible values per brand here
          return (
            <InputDropdown
              key={key}
              label={key}
              placeholder={`Select ${key}`}
              values={[value]} // default just one, extend with known enums
            />
          );
        }

        // Objects (like wbShift or sharpness groups)
        if (typeof value === "object" && value !== null) {
          return (
            <div key={key} className="p-2 border rounded-lg">
              <h4 className="font-semibold">{key}</h4>
              {Object.entries(value).map(([subKey, subVal]) => (
                <InputField
                  key={subKey}
                  type="number"
                  label={`${key}.${subKey}`}
                  placeholder={`Enter ${subKey}`}
                  onChange={(e) =>
                    onChange(key, {
                      ...value,
                      [subKey]: Number(e.target.value),
                    })
                  }
                />
              ))}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default CameraSettingsForm;
