// app/datas/cameraFieldOptions.ts
import { CameraSettings } from "./cameraDatas";

// Lookup of dropdown options per brand + field
const iso = ["Auto", "100", "200", "400", "800", "1600", "3200", "6400"];
export const cameraFieldOptions: {
  [B in CameraSettings["Brand"]]?: Record<string, string[]>;
} = {
  Fujifilm: {
    FilmMode: ["Provia", "Velvia", "Classic Chrome", "Acros"],
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
    DynamicRange: ["DR100", "DR200", "DR400", "Auto"],
    ISO: iso,
  },

  Sony: {
    CreativeLook: ["ST", "PT", "VV", "FL"],
    ISO: iso,
  },

  Canon: {
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
    ISO: iso,
  },

  Nikon: {
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
    ISO: iso,
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
    ISO: iso,
  },

  Olympus: {
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
    ISO: iso,
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
    ISO: iso,
  },

  Hasselblad: {
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
    ISO: iso,
  },

  Leica: {
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
    ISO: iso,
  },

  Pentax: {
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
    ISO: iso,
  },
};
