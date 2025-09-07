import { useEffect, useRef } from "react";

export function useOutsideClick<T extends HTMLElement>(
  onOutsideClick: () => void
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [onOutsideClick]);

  return ref;
}
