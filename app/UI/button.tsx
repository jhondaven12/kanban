import styled from "styled-components";

const ButtonStyled = styled.button`
  all: unset;
  width: 100%;
  padding: 15px 0px;
  border-radius: 50px;
  margin-top: 10px;
  font-size: 14px;
  font-weight: 800;
  text-align: center;
  background-color: white;
  color: var(--headerfont);
`;

interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button({ label, onClick }: ButtonProps) {
  return <ButtonStyled onClick={onClick}>{label}</ButtonStyled>;
}
