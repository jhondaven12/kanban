import styled from "styled-components";

export const InputContainer = styled.div`
  display: grid;
  width: 100%;
  margin: 5px auto;

  label {
    font-size: 16px;
    margin-bottom: 5px;
  }

  input {
    all: unset;
    border: 1px solid gray;
    padding: 10px 20px;
    border-radius: 5px;
  }
`;
