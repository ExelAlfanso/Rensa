// TODO: probably make dashboard for adding and removing presets, also make it possible to add custom presets

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
  Brand: "Fujifilm";
  Model: string;
  FilmMode: "Provia" | "Velvia" | "Classic Chrome" | "Acros" | string;
  GrainEffect?:
    | "Off"
    | "Weak-Small"
    | "Weak-Large"
    | "Strong-Small"
    | "Strong-Large";
  ColorChromeEffect?: "Off" | "Strong" | "Weak";
  ColorChromeFXBlue?: "Off" | "Strong" | "Weak";
  WhiteBalance?: WBMode;
  WbShift?: { RedBlue: number; YellowMagenta: number };
  DynamicRange?: "DR100" | "DR200" | "DR400" | "Auto";
  HighlightTone?: Range<-2 | 4>;
  ShadowTone?: Range<-2 | 4>;
  Color?: Range<-4 | 4>;
  Sharpness?: Range<-4 | 4>;
  NoiseReduction?: Range<-4 | 4>;
  Clarity?: Range<-5 | 5>;
  ISO?: number | "Auto";
}

// ================= Sony =================
export interface SonySettings {
  Brand: "Sony";
  Model: string;
  CreativeLook?: "ST" | "PT" | "VV" | "FL" | string;
  Contrast?: Range<-9 | 9>;
  Highlights?: Range<-9 | 9>;
  Shadows?: Range<-9 | 9>;
  Fade?: Range<0 | 9>;
  Saturation?: Range<-9 | 9>;
  Sharpness?: Range<0 | 9>;
  Clarity?: Range<0 | 9>;
  ISO?: number | "Auto";
}

// ================= Canon =================
export interface CanonSettings {
  Brand: "Canon";
  Model: string;
  PictureStyle?:
    | "Auto"
    | "Standard"
    | "Portrait"
    | "Landscape"
    | "Fine Detail"
    | "Neutral"
    | "Faithful"
    | "Monochrome";
  Sharpness?: { Strength: number; Fineness: number; Threshold: number };
  Contrast?: number;
  Saturation?: number;
  ColorTone?: number;
  FilterEffect?: "Yellow" | "Red" | "Green";
  ToningEffect?: "Sepia" | "Blue" | "Green";
  ISO?: number | "Auto";
}

// ================= Nikon =================
export interface NikonSettings {
  Brand: "Nikon";
  Model: string;
  PictureControl?:
    | "Standard"
    | "Neutral"
    | "Vivid"
    | "Monochrome"
    | "Portrait"
    | "Landscape"
    | "Flat"
    | string;
  QuickSharp?: number;
  Sharpening?: number;
  MidRangeSharpening?: number;
  Clarity?: number;
  Contrast?: number;
  Brightness?: number;
  Saturation?: number;
  Hue?: number;
  FilterEffects?: "Yellow" | "Orange" | "Red" | "Green";
  Toning?: string;
  ISO?: number | "Auto";
}

// ================= Lumix =================
export interface LumixSettings {
  Brand: "Lumix";
  Model: string;
  PhotoStyle?:
    | "Standard"
    | "Vivid"
    | "Natural"
    | "L. ClassicNeo"
    | "Flat"
    | "Cinelike D2"
    | "Cinelike V2"
    | "L. Monochrome S";
  Contrast?: number;
  Highlight?: number;
  Shadow?: number;
  Saturation?: number;
  Hue?: number;
  FilterEffect?: "Yellow" | "Orange" | "Red" | "Green";
  GrainEffect?: "Off" | "Low" | "Standard" | "High";
  ColorNoiseReduction?: OnOff;
  Sharpness?: number;
  NoiseReduction?: Range<-5 | 5>;
  Clarity?: number;
  ISO?: number | "Auto";
}

// ================= Olympus =================
export interface OlympusSettings {
  Brand: "Olympus";
  Model: string;

  PictureMode?:
    | "i-Enhance"
    | "Vivid"
    | "Natural"
    | "Muted"
    | "Portrait"
    | "Monochrome";
  Gradation?: "Auto" | "Normal" | "High Key" | "Low Key";
  Contrast?: number;
  Sharpness?: number;
  Saturation?: number;
  ColorFilter?: "Neutral" | "Yellow" | "Orange" | "Red" | "Green";
  PictureTone?: "Neutral" | "Sepia" | "Blue" | "Purple" | "Green";
  HighlightShadowControl?: { Highlight: number; Shadow: number };
  ColorCreator?: { Hue: number; Saturation: number };
  ISO?: number | "Auto";
}

// ================= Ricoh =================
export interface RicohSettings {
  Brand: "Ricoh";
  Model: string;

  ImageControl?:
    | "Standard"
    | "Vivid"
    | "Positive Film"
    | "Bleach Bypass"
    | "Retro"
    | "High-Contrast B&W";
  Saturation?: number;
  Hue?: number;
  HighLowKeyAdjust?: number;
  Contrast?: number;
  ContrastHighlight?: number;
  ContrastShadow?: number;
  Sharpness?: number;
  Shading?: number;
  Clarity?: number;
  Toning?: string;
  FilterEffect?: string;
  GrainEffect?: "Off" | "Weak" | "Medium" | "Strong";
  ISO?: number | "Auto";
}

// ================= Hasselblad =================
export interface HasselbladSettings {
  Brand: "Hasselblad";
  Model: string;

  ImageProfile?: "HNCS";
  Contrast?: number;
  Sharpness?: number;
  WhiteBalance?: WBMode;
  ISO?: number | "Auto";
}

// ================= Leica =================
export interface LeicaSettings {
  Brand: "Leica";
  Model: string;

  FilmStyle?:
    | "Standard"
    | "Vivid"
    | "Natural"
    | "Monochrome"
    | "Monochrome High Contrast";
  Contrast?: number;
  Saturation?: number;
  Sharpness?: number;
  Toning?: "Sepia" | "Blue" | "Selenium";
  WhiteBalance?: WBMode;
  ISO?: number | "Auto";
}

// ================= Pentax =================
export interface PentaxSettings {
  Brand: "Pentax";
  Model: string;

  CustomImage?:
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
  Saturation?: number;
  Hue?: number;
  HighLowKey?: number;
  Contrast?: number;
  HighlightContrast?: number;
  ShadowContrast?: number;
  Sharpness?: number;
  FineSharpness?: number;
  Clarity?: number;
  Toning?: string;
  FilterEffect?: string;
  GrainEffect?: string;
  ISO?: number | "Auto";
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

// ================= Default Values =================
export const defaultFujifilm: FujifilmSettings = {
  Brand: "Fujifilm",
  Model: "",
  FilmMode: "Provia",
  GrainEffect: "Off",
  ColorChromeEffect: "Off",
  ColorChromeFXBlue: "Off",
  WhiteBalance: "Auto",
  WbShift: { RedBlue: 0, YellowMagenta: 0 },
  DynamicRange: "DR100",
  HighlightTone: 0,
  ShadowTone: 0,
  Color: 0,
  Sharpness: 0,
  NoiseReduction: 0,
  Clarity: 0,
  ISO: "Auto",
};

export const defaultSony: SonySettings = {
  Brand: "Sony",
  Model: "",
  CreativeLook: "ST",
  Contrast: 0,
  Highlights: 0,
  Shadows: 0,
  Fade: 0,
  Saturation: 0,
  Sharpness: 0,
  Clarity: 0,
  ISO: "Auto",
};

export const defaultCanon: CanonSettings = {
  Brand: "Canon",
  Model: "",
  PictureStyle: "Auto",
  Sharpness: { Strength: 0, Fineness: 0, Threshold: 0 },
  Contrast: 0,
  Saturation: 0,
  ColorTone: 0,
  FilterEffect: "Yellow",
  ToningEffect: "Sepia",
  ISO: "Auto",
};

export const defaultNikon: NikonSettings = {
  Brand: "Nikon",
  Model: "",
  PictureControl: "Standard",
  QuickSharp: 0,
  Sharpening: 0,
  MidRangeSharpening: 0,
  Clarity: 0,
  Contrast: 0,
  Brightness: 0,
  Saturation: 0,
  Hue: 0,
  FilterEffects: "Yellow",
  Toning: "",
  ISO: "Auto",
};

export const defaultLumix: LumixSettings = {
  Brand: "Lumix",
  Model: "",
  PhotoStyle: "Standard",
  Contrast: 0,
  Highlight: 0,
  Shadow: 0,
  Saturation: 0,
  Hue: 0,
  FilterEffect: "Yellow",
  GrainEffect: "Off",
  ColorNoiseReduction: "Off",
  Sharpness: 0,
  NoiseReduction: 0,
  Clarity: 0,
  ISO: "Auto",
};

export const defaultOlympus: OlympusSettings = {
  Brand: "Olympus",
  Model: "",
  PictureMode: "Natural",
  Gradation: "Normal",
  Contrast: 0,
  Sharpness: 0,
  Saturation: 0,
  ColorFilter: "Neutral",
  PictureTone: "Neutral",
  HighlightShadowControl: { Highlight: 0, Shadow: 0 },
  ColorCreator: { Hue: 0, Saturation: 0 },
  ISO: "Auto",
};

export const defaultRicoh: RicohSettings = {
  Brand: "Ricoh",
  Model: "",
  ImageControl: "Standard",
  Saturation: 0,
  Hue: 0,
  HighLowKeyAdjust: 0,
  Contrast: 0,
  ContrastHighlight: 0,
  ContrastShadow: 0,
  Sharpness: 0,
  Shading: 0,
  Clarity: 0,
  Toning: "",
  FilterEffect: "",
  GrainEffect: "Off",
  ISO: "Auto",
};

export const defaultHasselblad: HasselbladSettings = {
  Brand: "Hasselblad",
  Model: "",
  ImageProfile: "HNCS",
  Contrast: 0,
  Sharpness: 0,
  WhiteBalance: "Auto",
  ISO: "Auto",
};

export const defaultLeica: LeicaSettings = {
  Brand: "Leica",
  Model: "",
  FilmStyle: "Standard",
  Contrast: 0,
  Saturation: 0,
  Sharpness: 0,
  Toning: "Sepia",
  WhiteBalance: "Auto",
  ISO: "Auto",
};

export const defaultPentax: PentaxSettings = {
  Brand: "Pentax",
  Model: "",
  CustomImage: "Bright",
  Saturation: 0,
  Hue: 0,
  HighLowKey: 0,
  Contrast: 0,
  HighlightContrast: 0,
  ShadowContrast: 0,
  Sharpness: 0,
  FineSharpness: 0,
  Clarity: 0,
  Toning: "",
  FilterEffect: "",
  GrainEffect: "Off",
  ISO: "Auto",
};

// Union default values lookup
export const defaultCameraSettings: Record<
  CameraSettings["Brand"],
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
