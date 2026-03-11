import { ReactNode, useCallback, useEffect } from "react";
import { ModalContainer, ModalContent, ModalOverlay } from "./modal.styled";

interface Modalprops {
  title?: string;
  width: string;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ title, width, onClose, children }: Modalprops) => {
  const handleEnterKeyPress = useCallback(
    (event: globalThis.KeyboardEvent): void => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEnterKeyPress);
    return () => {
      document.removeEventListener("keydown", handleEnterKeyPress);
    };
  }, [handleEnterKeyPress]);

  return (
    <ModalContainer>
      <ModalOverlay />

      <ModalContent $width={width}>
        <h2>{title}</h2>
        <div>{children}</div>
      </ModalContent>
    </ModalContainer>
  );
};
