import styled, { keyframes, css } from "styled-components";

const Container = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* background-color: #0000002f;
  border-radius: 5px; */
`;

const shimmer = keyframes`
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
`;

const skeletonBase = css`
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.08) 25%,
    rgba(0, 0, 0, 0.18) 50%,
    rgba(0, 0, 0, 0.08) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.6s ease-in-out infinite;
`;

const LoadHeader = styled.div`
  height: 25%;
  width: 80%;
  ${skeletonBase}
`;

const LoadBody = styled.div`
  height: 50%;
  ${skeletonBase}
`;

const LoadFooter = styled.div`
  height: 20%;
  width: 100%;
  ${skeletonBase}
`;

export const SkeletonLoading = () => {
  return (
    <Container>
      <LoadHeader />
      <LoadBody />
      <LoadFooter />
    </Container>
  );
};
