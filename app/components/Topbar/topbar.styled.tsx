import styled from "styled-components";

export const Topbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  height: 90px;
  border-bottom: 1px solid var(--defaultfont);
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Button = styled.button`
  all: unset;
  background-color: var(--colorTomato);
  color: white;
  padding: 15px;
  border-radius: 50px;
  margin-right: 30px;
  font-size: 14px;
`;

export const DotsButton = styled.div`
  font-size: 20px;
  font-weight: 800;
`;
