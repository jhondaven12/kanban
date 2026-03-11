import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  inset: 0;
`;

export const ModalOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: black;
  width: 100%;
  opacity: 0.5;
  z-index: 7;
`;

interface ModalContentProps {
  $width: string;
}

export const ModalContent = styled.div<ModalContentProps>`
  position: absolute; /* REQUIRED */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 8; /* above overlay */
  width: ${({ $width }) => ($width === "0" ? "0%" : $width)};
  padding: 50px 40px;
  border-radius: 8px;
  background-color: var(--background);
  height: auto;

  h2 {
    text-align: left;
  }
`;
