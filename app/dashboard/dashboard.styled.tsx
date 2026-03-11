import styled from "styled-components";

export const Main = styled.main`
  display: flex;
  width: 100%;
  height: 100vh;
  outline: 1px solid black;
`;

export const LeftSide = styled.div`
  width: 15%;
  padding: 10px;
  border-right: 1px solid var(--defaultfont);

  h2 {
    text-align: center;
    margin-top: 10px;
  }
`;

export const Sidebar = styled.div``;

export const RightSide = styled.div`
  width: 85%;
  height: 100vh;
`;

export const FormModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 10px;
  width: 100%;
`;

export const SubtasksContainer = styled.div`
  width: 100%;
`;

export const FormInputs = styled.div`
  display: flex;
  gap: 10px;

  input {
    width: 90%;
  }

  p {
    display: flex;
    align-items: center;
    font-size: 30px;
    margin-top: 5px;
  }
`;
