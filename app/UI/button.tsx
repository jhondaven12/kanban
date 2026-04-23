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
  background-color: ${(props) => (props.disabled ? "gray" : "white")};
  color: ${(props) => (props.disabled ? "white" : "var(--headerfont)")};
`;

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ label, onClick, disabled }: ButtonProps) {
  return (
    <ButtonStyled onClick={onClick} disabled={disabled}>
      {label}
    </ButtonStyled>
  );
}
