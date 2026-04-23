import styled, { keyframes } from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: fixed;
  right: 0;
  bottom: 20px;
  width: 200px;
  padding: 10px 15px;
  background-color: var(--background);
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  z-index: 1;
`;
const slideIn = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

const Circle = styled.div`
  width: 50px;
  height: 50px;
  border-top: 1px solid var(--defaultfont);
  border-radius: 50%;
  animation: ${slideIn} 1s linear infinite;
`;

export function Loading() {
  return (
    <Container>
      <Circle></Circle>
      Loading
    </Container>
  );
}
