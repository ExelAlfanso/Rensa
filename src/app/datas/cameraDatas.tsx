// helpers
export type Range<N extends number> = number; // just for readability
export type OnOff = "On" | "Off";
export type Strength = "Off" | "Weak" | "Strong";
export type WBMode =
  | "Auto"
  | "Custom"
  | "Manual"
  | "Kelvin"
  | "Daylight"
  | "Shade"
  | "Cloudy"
  | "Tungsten"
  | "Fluorescent"
  | "Flash";

// ================= Fujifilm =================
export interface FujifilmSettings {
  brand: "Fujifilm";
  filmSimulation: "Provia" | "Velvia" | "Classic Chrome" | "Acros" | string;
  grainEffect?:
    | "Off"
    | "Weak-Small"
    | "Weak-Large"
    | "Strong-Small"
    | "Strong-Large";
  colorChromeEffect?: "Off" | "Strong" | "Weak";
  colorChromeFXBlue?: "Off" | "Strong" | "Weak";
  whiteBalance?: WBMode;
  wbShift?: { redBlue: number; yellowMagenta: number };
  dynamicRange?: "DR100" | "DR200" | "DR400" | "Auto";
  highlightTone?: Range<-2 | 4>;
  shadowTone?: Range<-2 | 4>;
  color?: Range<-4 | 4>;
  sharpness?: Range<-4 | 4>;
  noiseReduction?: Range<-4 | 4>;
  clarity?: Range<-5 | 5>;
  iso?: number | "Auto";
}

// ================= Sony =================
export interface SonySettings {
  brand: "Sony";
  creativeLook?: "ST" | "PT" | "VV" | "FL" | string;
  contrast?: Range<-9 | 9>;
  highlights?: Range<-9 | 9>;
  shadows?: Range<-9 | 9>;
  fade?: Range<0 | 9>;
  saturation?: Range<-9 | 9>;
  sharpness?: Range<0 | 9>;
  clarity?: Range<0 | 9>;
}

// ================= Canon =================
export interface CanonSettings {
  brand: "Canon";
  pictureStyle?:
    | "Auto"
    | "Standard"
    | "Portrait"
    | "Landscape"
    | "Fine Detail"
    | "Neutral"
    | "Faithful"
    | "Monochrome";
  sharpness?: {
    strength: number;
    fineness: number;
    threshold: number;
  };
  contrast?: number;
  saturation?: number;
  colorTone?: number;
  filterEffect?: "Yellow" | "Red" | "Green";
  toningEffect?: "Sepia" | "Blue" | "Green";
}

// ================= Nikon =================
export interface NikonSettings {
  brand: "Nikon";
  pictureControl?:
    | "Standard"
    | "Neutral"
    | "Vivid"
    | "Monochrome"
    | "Portrait"
    | "Landscape"
    | "Flat"
    | string;
  quickSharp?: number;
  sharpening?: number;
  midRangeSharpening?: number;
  clarity?: number;
  contrast?: number;
  brightness?: number;
  saturation?: number;
  hue?: number;
  filterEffects?: "Yellow" | "Orange" | "Red" | "Green";
  toning?: string;
}

// ================= Lumix =================
export interface LumixSettings {
  brand: "Lumix";
  photoStyle?:
    | "Standard"
    | "Vivid"
    | "Natural"
    | "L. ClassicNeo"
    | "Flat"
    | "Cinelike D2"
    | "Cinelike V2"
    | "L. Monochrome S";
  contrast?: number;
  highlight?: number;
  shadow?: number;
  saturation?: number;
  hue?: number;
  filterEffect?: "Yellow" | "Orange" | "Red" | "Green";
  grainEffect?: "Off" | "Low" | "Standard" | "High";
  colorNoiseReduction?: OnOff;
  sharpness?: number;
  noiseReduction?: Range<-5 | 5>;
  clarity?: number;
}

// ================= Olympus =================
export interface OlympusSettings {
  brand: "Olympus";
  pictureMode?:
    | "i-Enhance"
    | "Vivid"
    | "Natural"
    | "Muted"
    | "Portrait"
    | "Monochrome";
  gradation?: "Auto" | "Normal" | "High Key" | "Low Key";
  contrast?: number;
  sharpness?: number;
  saturation?: number;
  colorFilter?: "Neutral" | "Yellow" | "Orange" | "Red" | "Green";
  pictureTone?: "Neutral" | "Sepia" | "Blue" | "Purple" | "Green";
  highlightShadowControl?: { highlight: number; shadow: number };
  colorCreator?: { hue: number; saturation: number };
}

// ================= Ricoh =================
export interface RicohSettings {
  brand: "Ricoh";
  imageControl?:
    | "Standard"
    | "Vivid"
    | "Positive Film"
    | "Bleach Bypass"
    | "Retro"
    | "High-Contrast B&W";
  saturation?: number;
  hue?: number;
  highLowKeyAdjust?: number;
  contrast?: number;
  contrastHighlight?: number;
  contrastShadow?: number;
  sharpness?: number;
  shading?: number;
  clarity?: number;
  toning?: string;
  filterEffect?: string;
  grainEffect?: "Off" | "Weak" | "Medium" | "Strong";
}

// ================= Hasselblad =================
export interface HasselbladSettings {
  brand: "Hasselblad";
  imageProfile?: "HNCS";
  contrast?: number;
  sharpness?: number;
  whiteBalance?: WBMode;
  iso?: number | "Auto";
}

// ================= Leica =================
export interface LeicaSettings {
  brand: "Leica";
  filmStyle?:
    | "Standard"
    | "Vivid"
    | "Natural"
    | "Monochrome"
    | "Monochrome High Contrast";
  contrast?: number;
  saturation?: number;
  sharpness?: number;
  toning?: "Sepia" | "Blue" | "Selenium";
  whiteBalance?: WBMode;
  iso?: number | "Auto";
}

// ================= Pentax =================
export interface PentaxSettings {
  brand: "Pentax";
  customImage?:
    | "Bright"
    | "Natural"
    | "Portrait"
    | "Landscape"
    | "Vibrant"
    | "Radiant"
    | "Muted"
    | "Flat"
    | "Bleach Bypass"
    | "Reversal Film"
    | "Monochrome"
    | "Cross Processing";
  saturation?: number;
  hue?: number;
  highLowKey?: number;
  contrast?: number;
  highlightContrast?: number;
  shadowContrast?: number;
  sharpness?: number;
  fineSharpness?: number;
  clarity?: number;
  toning?: string;
  filterEffect?: string;
  grainEffect?: string;
}

// ================= Union =================
export type CameraSettings =
  | FujifilmSettings
  | SonySettings
  | CanonSettings
  | NikonSettings
  | LumixSettings
  | OlympusSettings
  | RicohSettings
  | HasselbladSettings
  | LeicaSettings
  | PentaxSettings;

// default values for each brand

export const defaultFujifilm: FujifilmSettings = {
  brand: "Fujifilm",
  filmSimulation: "Provia",
  grainEffect: "Off",
  colorChromeEffect: "Off",
  colorChromeFXBlue: "Off",
  whiteBalance: "Auto",
  wbShift: { redBlue: 0, yellowMagenta: 0 },
  dynamicRange: "DR100",
  highlightTone: 0,
  shadowTone: 0,
  color: 0,
  sharpness: 0,
  noiseReduction: 0,
  clarity: 0,
  iso: "Auto",
};

export const defaultSony: SonySettings = {
  brand: "Sony",
  creativeLook: "ST",
  contrast: 0,
  highlights: 0,
  shadows: 0,
  fade: 0,
  saturation: 0,
  sharpness: 0,
  clarity: 0,
};

export const defaultCanon: CanonSettings = {
  brand: "Canon",
  pictureStyle: "Auto",
  sharpness: { strength: 0, fineness: 0, threshold: 0 },
  contrast: 0,
  saturation: 0,
  colorTone: 0,
  filterEffect: "Yellow",
  toningEffect: "Sepia",
};

export const defaultNikon: NikonSettings = {
  brand: "Nikon",
  pictureControl: "Standard",
  quickSharp: 0,
  sharpening: 0,
  midRangeSharpening: 0,
  clarity: 0,
  contrast: 0,
  brightness: 0,
  saturation: 0,
  hue: 0,
  filterEffects: "Yellow",
  toning: "",
};

export const defaultLumix: LumixSettings = {
  brand: "Lumix",
  photoStyle: "Standard",
  contrast: 0,
  highlight: 0,
  shadow: 0,
  saturation: 0,
  hue: 0,
  filterEffect: "Yellow",
  grainEffect: "Off",
  colorNoiseReduction: "Off",
  sharpness: 0,
  noiseReduction: 0,
  clarity: 0,
};

export const defaultOlympus: OlympusSettings = {
  brand: "Olympus",
  pictureMode: "Natural",
  gradation: "Normal",
  contrast: 0,
  sharpness: 0,
  saturation: 0,
  colorFilter: "Neutral",
  pictureTone: "Neutral",
  highlightShadowControl: { highlight: 0, shadow: 0 },
  colorCreator: { hue: 0, saturation: 0 },
};

export const defaultRicoh: RicohSettings = {
  brand: "Ricoh",
  imageControl: "Standard",
  saturation: 0,
  hue: 0,
  highLowKeyAdjust: 0,
  contrast: 0,
  contrastHighlight: 0,
  contrastShadow: 0,
  sharpness: 0,
  shading: 0,
  clarity: 0,
  toning: "",
  filterEffect: "",
  grainEffect: "Off",
};

export const defaultHasselblad: HasselbladSettings = {
  brand: "Hasselblad",
  imageProfile: "HNCS",
  contrast: 0,
  sharpness: 0,
  whiteBalance: "Auto",
  iso: "Auto",
};

export const defaultLeica: LeicaSettings = {
  brand: "Leica",
  filmStyle: "Standard",
  contrast: 0,
  saturation: 0,
  sharpness: 0,
  toning: "Sepia",
  whiteBalance: "Auto",
  iso: "Auto",
};

export const defaultPentax: PentaxSettings = {
  brand: "Pentax",
  customImage: "Bright",
  saturation: 0,
  hue: 0,
  highLowKey: 0,
  contrast: 0,
  highlightContrast: 0,
  shadowContrast: 0,
  sharpness: 0,
  fineSharpness: 0,
  clarity: 0,
  toning: "",
  filterEffect: "",
  grainEffect: "Off",
};

// Union default values in a lookup
export const defaultCameraSettings: Record<
  CameraSettings["brand"],
  CameraSettings
> = {
  Fujifilm: defaultFujifilm,
  Sony: defaultSony,
  Canon: defaultCanon,
  Nikon: defaultNikon,
  Lumix: defaultLumix,
  Olympus: defaultOlympus,
  Ricoh: defaultRicoh,
  Hasselblad: defaultHasselblad,
  Leica: defaultLeica,
  Pentax: defaultPentax,
};
