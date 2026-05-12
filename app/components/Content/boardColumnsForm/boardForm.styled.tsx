import styled from "styled-components";

export const BoardFormContent = styled.div`
  margin-top: 20px;
`;

export const BoardFormBody = styled.div`
  margin: 20px 0px;

  button {
    margin-top: 20px;
  }
`;

export const BoardFormLists = styled.div`
  max-height: 230px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 20px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
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
