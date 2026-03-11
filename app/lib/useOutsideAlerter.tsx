import { useEffect } from "react";

interface FunctionProps {
  ref: React.RefObject<HTMLElement | null>;
  onOutsideClick: () => void;
}

function useOutsideAlterter({ ref, onOutsideClick }: FunctionProps) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onOutsideClick]);
}

export default useOutsideAlterter;
