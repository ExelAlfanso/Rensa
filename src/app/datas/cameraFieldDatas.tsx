// app/datas/cameraFieldOptions.ts
import { CameraSettings } from "./cameraDatas";
import {
  canonCameraModels,
  fujifilmCameraModels,
  hasselbladCameraModels,
  leicaCameraModels,
  nikonCameraModels,
  olympusCameraModels,
  pentaxCameraModels,
  sonyCameraModels,
} from "./cameraModelDatas";
// Lookup of dropdown options per brand + field

export const cameraFieldOptions: {
  [B in CameraSettings["Brand"]]?: Record<string, string[]>;
} = {
  Fujifilm: {
    CameraModel: [...fujifilmCameraModels],
    FilmMode: ["Provia", "Velvia", "Classic Chrome", "Acros", "Astia"],
    GrainEffect: [
      "Off",
      "Weak-Small",
      "Weak-Large",
      "Strong-Small",
      "Strong-Large",
    ],
    ColorChromeEffect: ["Off", "Strong", "Weak"],
    ColorChromeFXBlue: ["Off", "Strong", "Weak"],
    WhiteBalance: [
      "Auto",
      "Custom",
      "Manual",
      "Kelvin",
      "Daylight",
      "Shade",
      "Cloudy",
      "Tungsten",
      "Fluorescent",
      "Flash",
    ],
    DynamicRange: ["DR100", "DR200", "DR400", "Auto", "Standard"],
  },

  Sony: {
    CameraModel: [...sonyCameraModels],
    CreativeLook: ["ST", "PT", "VV", "FL"],
  },

  Canon: {
    CameraModel: [...canonCameraModels],
    PictureStyle: [
      "Auto",
      "Standard",
      "Portrait",
      "Landscape",
      "Fine Detail",
      "Neutral",
      "Faithful",
      "Monochrome",
    ],
    FilterEffect: ["Yellow", "Red", "Green"],
    ToningEffect: ["Sepia", "Blue", "Green"],
  },

  Nikon: {
    CameraModel: [...nikonCameraModels],
    PictureControl: [
      "Standard",
      "Neutral",
      "Vivid",
      "Monochrome",
      "Portrait",
      "Landscape",
      "Flat",
    ],
    FilterEffects: ["Yellow", "Orange", "Red", "Green"],
  },

  Lumix: {
    PhotoStyle: [
      "Standard",
      "Vivid",
      "Natural",
      "L. ClassicNeo",
      "Flat",
      "Cinelike D2",
      "Cinelike V2",
      "L. Monochrome S",
    ],
    FilterEffect: ["Yellow", "Orange", "Red", "Green"],
    GrainEffect: ["Off", "Low", "Standard", "High"],
    ColorNoiseReduction: ["On", "Off"],
  },

  Olympus: {
    CameraModel: [...olympusCameraModels],
    PictureMode: [
      "i-Enhance",
      "Vivid",
      "Natural",
      "Muted",
      "Portrait",
      "Monochrome",
    ],
    Gradation: ["Auto", "Normal", "High Key", "Low Key"],
    ColorFilter: ["Neutral", "Yellow", "Orange", "Red", "Green"],
    PictureTone: ["Neutral", "Sepia", "Blue", "Purple", "Green"],
  },

  Ricoh: {
    ImageControl: [
      "Standard",
      "Vivid",
      "Positive Film",
      "Bleach Bypass",
      "Retro",
      "High-Contrast B&W",
    ],
    GrainEffect: ["Off", "Weak", "Medium", "Strong"],
  },

  Hasselblad: {
    CameraModel: [...hasselbladCameraModels],
    ImageProfile: ["HNCS"],
    WhiteBalance: [
      "Auto",
      "Custom",
      "Manual",
      "Kelvin",
      "Daylight",
      "Shade",
      "Cloudy",
      "Tungsten",
      "Fluorescent",
      "Flash",
    ],
  },

  Leica: {
    CameraModel: [...leicaCameraModels],
    FilmStyle: [
      "Standard",
      "Vivid",
      "Natural",
      "Monochrome",
      "Monochrome High Contrast",
    ],
    Toning: ["Sepia", "Blue", "Selenium"],
    WhiteBalance: [
      "Auto",
      "Custom",
      "Manual",
      "Kelvin",
      "Daylight",
      "Shade",
      "Cloudy",
      "Tungsten",
      "Fluorescent",
      "Flash",
    ],
  },

  Pentax: {
    CameraModel: [...pentaxCameraModels],
    CustomImage: [
      "Bright",
      "Natural",
      "Portrait",
      "Landscape",
      "Vibrant",
      "Radiant",
      "Muted",
      "Flat",
      "Bleach Bypass",
      "Reversal Film",
      "Monochrome",
      "Cross Processing",
    ],
  },
};
