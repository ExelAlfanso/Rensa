import { CameraSettings, defaultCameraSettings } from "@/app/datas/cameraDatas";
import { cameraFieldOptions } from "@/app/datas/cameraFieldDatas";
import { brandModels } from "@/app/datas/cameraModelDatas";
import { api } from "@/lib/axios";
import {
  detectValueinString,
  extractNumberFromString,
} from "@/utils/ValueDetections";
import { useState } from "react";

/**
 * React hook that detects image EXIF metadata and applies detected values to camera settings.
 *
 * @param file - The image File to read EXIF from, or `null` when no file is selected.
 * @param handleExifChange - Callback invoked for each derived setting with `(field, value)` when metadata yields a value.
 * @returns An object exposing:
 *  - `isDetecting`: whether a metadata detection request is in progress.
 *  - `detectMetadata`: function that uploads `file` and returns detected metadata (or `undefined` on failure).
 *  - `autoFillSettings`: function that applies a metadata object to update local settings and call `handleExifChange`.
 *  - `settings`: current CameraSettings state populated from defaults and any applied metadata.
 *  - `selectedCamera`: currently selected camera brand.
 *  - `setSelectedCamera`: setter to change the selected camera brand.
 *  - `detectAndApplyExif`: convenience function that runs detection then applies detected metadata.
 *  - `setSettings`: setter to replace the current settings state.
 */
export function useExifDetection(
  file: File | null,
  handleExifChange: (
    field: string,
    value: number | object | string | CameraSettings
  ) => void
) {
  const [isDetecting, setIsDetecting] = useState(false);
  const [settings, setSettings] = useState<CameraSettings>(
    defaultCameraSettings["Fujifilm"]
  );
  const [selectedCamera, setSelectedCamera] =
    useState<CameraSettings["Brand"]>("Fujifilm");

  const detectMetadata = async () => {
    if (!file) return;
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
      const metadata = res?.data.metadata || {};
      console.log("Detected metadata:", metadata);
      return metadata;
    } catch (err) {
      console.error("Metadata detection failed:", err);
    } finally {
      setIsDetecting(false);
    }
  };
  const autoFillSettings = (
    detectedMetadata: Record<string, string | number | object>
  ) => {
    if (!detectedMetadata) {
      console.log("No metadata to process");
      return;
    }
    //detects Brand
    const brand = detectValueinString(
      Object.keys(defaultCameraSettings),
      detectedMetadata["Make"] as string
    ) as CameraSettings["Brand"];
    const newSettings = defaultCameraSettings[brand];
    if (brand in defaultCameraSettings) {
      setSelectedCamera(brand);
      handleExifChange("Brand", brand);
      setSettings(newSettings);
    }

    //detect other fields
    const updated = { ...settings };
    for (const [key, rawValue] of Object.entries(detectedMetadata || {})) {
      if (!(key in settings)) continue;
      let value: string | number | object = rawValue as
        | string
        | number
        | object;
      if (typeof value === "string") {
        //detect Model
        if (key === "Model") {
          // console.log("Processing Model:", value);
          const model = value as string;
          const matchedModel = detectValueinString(
            brandModels[brand] || [],
            model
          ) as CameraSettings["Brand"];
          if (matchedModel) {
            value = matchedModel;
          }
        } else {
          //detect other fields
          const detectedValue = detectValueinString(
            cameraFieldOptions[selectedCamera]?.[key] || [],
            value
          );
          if (detectedValue) value = detectedValue;
          else {
            const num = extractNumberFromString(value);
            if (num !== null) value = num;
          }
        }
      }
      updated[key as keyof CameraSettings] = value as never;
      // console.log(`Auto-filled ${key} with value:`, value);
      handleExifChange(key, value);
    }
    setSettings(updated);
  };

  const detectAndApplyExif = async () => {
    const metadata = await detectMetadata();
    if (metadata) {
      autoFillSettings(metadata);
    }
  };
  return {
    isDetecting,
    detectMetadata,
    autoFillSettings,
    settings,
    selectedCamera,
    setSelectedCamera,
    detectAndApplyExif,
    setSettings,
  };
}