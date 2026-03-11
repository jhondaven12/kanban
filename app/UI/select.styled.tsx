import styled from "styled-components";

export const SelectContainer = styled.div`
  margin-top: 10px;
  width: 100%;
`;

export const SelectTitle = styled.div``;

export const InputContainer = styled.div`
  position: relative;
  border-radius: 10px;

  input {
    width: 100%;
    padding: 13px 20px;
    background: none;
    border-radius: 5px;
    border: 1px solid gray;
    color: white;
    margin-top: 5px;
    font-size: 16px;

    &:focus {
      outline: none;
    }
  }
`;

export const DropdownOptions = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  max-height: 120px;
  overflow-x: auto;
  width: 100%;
  background-color: white;

  button {
    padding: 10px 15px;
    color: var(--foreground);
    font-weight: 700;
    background-color: white;
    border: none;
    transition: 50ms ease;
    text-align: left;

    &:hover {
      background-color: var(--foreground);
      color: white;
    }
  }
`;
