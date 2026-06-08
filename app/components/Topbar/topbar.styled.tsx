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
  margin-right: 5px;
  font-size: 14px;
`;

export const DotsButton = styled.div`
  position: relative;
  font-size: 20px;
  font-weight: 800;
`;

export const ButtonMenu = styled.div`
  position: absolute;
  top: calc(100% + 20px);
  right: 8px;
  display: flex;
  flex-direction: column;
  background-color: var(--background);
  padding: 10px;
  border-radius: 10px;
  width: 200px;
  box-shadow:
    rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px,
    rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px,
    rgba(0, 0, 0, 0.09) 0px -3px 5px;

  button {
    background-color: inherit;

    &:nth-child(2) {
      color: red;
    }
  }
`;
