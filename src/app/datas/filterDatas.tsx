interface FilterData {
  id: string;
  label: string;
  isActive: boolean;
}

interface ListWithTitle {
  column: number;
  title: string;
  items: FilterData[];
}

export const FilterLists: ListWithTitle[] = [
  {
    column: 1,
    title: "Categories",
    items: [
      { id: "all", label: "All", isActive: false },
      { id: "landscape", label: "Landscape", isActive: false },
      { id: "street", label: "Street", isActive: false },
      { id: "event", label: "Event", isActive: false },
      { id: "architectural", label: "Architectural", isActive: false },
      { id: "other", label: "Other", isActive: false },
    ],
  },
  {
    column: 3,
    title: "Cameras",
    items: [
      { id: "all", label: "All", isActive: false },
      { id: "canon", label: "Canon", isActive: false },
      { id: "sony", label: "Sony", isActive: false },
      { id: "nikon", label: "Nikon", isActive: false },
      { id: "fujifilm", label: "Fujifilm", isActive: false },
      { id: "olympus", label: "Olympus", isActive: false },
      { id: "lumix", label: "Lumix", isActive: false },
      { id: "leica", label: "Leica", isActive: false },
      { id: "ricoh", label: "Ricoh", isActive: false },
      { id: "other", label: "Other", isActive: false },
      { id: "hasselblad", label: "Hasselblad", isActive: false },
    ],
  },
  {
    column: 1,
    title: "Styles",
    items: [
      { id: "all", label: "All", isActive: false },
      { id: "cinematic", label: "Cinematic", isActive: false },
      { id: "minimalist", label: "Minimalist", isActive: false },
      { id: "vintage", label: "Vintage", isActive: false },
      { id: "modern", label: "Modern", isActive: false },
      { id: "abstract", label: "Abstract  ", isActive: false },
    ],
  },
  {
    column: 2,
    title: "Colors",
    items: [
      { id: "all", label: "All", isActive: false },
      { id: "blackAndWhite", label: "B&W", isActive: false },
      { id: "vibrant", label: "Vibrant", isActive: false },
      { id: "muted", label: "Muted", isActive: false },
      { id: "warm", label: "Warm", isActive: false },
      { id: "cool", label: "Cool", isActive: false },
      { id: "filmLook", label: "Film Look", isActive: false },
      { id: "pastel", label: "Pastel", isActive: false },
    ],
  },
];
