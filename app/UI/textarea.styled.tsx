import styled from "styled-components";

export const TextareaContainer = styled.div`
  display: grid;
  width: inherit;
  margin: 10px auto;

  label {
    font-size: 16px;
    margin-bottom: 5px;
  }

  textarea {
    all: unset;
    height: 100px;
    border: 1px solid gray;
    padding: 10px 20px;
    border-radius: 5px;
  }
`;
