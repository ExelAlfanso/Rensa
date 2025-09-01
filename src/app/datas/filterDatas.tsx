interface FilterData {
  id: string;
  label: string;
}

interface ListWithTitle {
  title: string;
  items: FilterData[];
}

export const FilterLists: ListWithTitle[] = [
  {
    title: "Categories",
    items: [
      { id: "all", label: "All" },
      { id: "landscape", label: "Landscape" },
      { id: "street", label: "Street" },
      { id: "event", label: "Event" },
      { id: "architectural", label: "Architectural" },
      { id: "other", label: "Other" },
    ],
  },
  {
    title: "Cameras",
    items: [
      { id: "all", label: "All" },
      { id: "canon", label: "Canon" },
      { id: "sony", label: "Sony" },
      { id: "nikon", label: "Nikon" },
      { id: "fujifilm", label: "Fujifilm" },
      { id: "olympus", label: "Olympus" },
      { id: "lumix", label: "Lumix" },
      { id: "leica", label: "Leica" },
      { id: "ricoh", label: "Ricoh" },
      { id: "hasselblad", label: "Hasselblad" },
      { id: "other", label: "Other" },
    ],
  },
  {
    title: "Colors",
    items: [
      { id: "all", label: "All" },
      { id: "blackAndWhite", label: "B&W" },
      { id: "vibrant", label: "Vibrant" },
      { id: "muted", label: "Muted" },
      { id: "warm", label: "Warm" },
      { id: "cool", label: "Cool" },
      { id: "filmLook", label: "Film Look" },
      { id: "pastel", label: "Pastel" },
    ],
  },
  {
    title: "Styles",
    items: [
      { id: "all", label: "All" },
      { id: "cinematic", label: "Cinematic" },
      { id: "minimalist", label: "Minimalist" },
      { id: "vintage", label: "Vintage" },
      { id: "modern", label: "Modern" },
      { id: "abstract", label: "Abstract  " },
    ],
  },
];
