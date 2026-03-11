import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  gap: 50px;
  padding: 20px;
  height: 90%;
  overflow-x: auto;
  background-color: var(--foreground);
`;

export const Columns = styled.div`
  width: 300px;
  flex-shrink: 0;

  span {
    font-size: 14px;
  }
`;

export const NewColumns = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 28px;
  width: 300px;
  height: 95%;
  background-color: var(--background);
`;

export const ColumnTasks = styled.div`
  background-color: var(--background);
  margin: 10px 0px;
  padding: 15px 20px;
  border-radius: 10px;

  h3 {
    margin-bottom: 10px;
  }

  p {
    color: gray;
    font-size: 12px;
    font-weight: 800;
  }
`;
