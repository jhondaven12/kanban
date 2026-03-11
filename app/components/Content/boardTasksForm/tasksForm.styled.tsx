import styled from "styled-components";

export const TaskContent = styled.div``;

export const TaskHeader = styled.div`
  position: relative;

  h3 {
    width: 90%;
  }

  i {
    position: absolute;
    top: 10px;
    right: 0px;
    font-size: 30px;
  }
`;

export const TaskHeaderDots = styled.i`
  position: relative;

  div {
    position: absolute;
    right: -0px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
    background-color: white;
    border-radius: 5px;
  }

  div button {
    color: gray;
    font-size: 16px;
    width: 130px;
    padding: 10px;
    background-color: transparent;
    border: none;
    text-align: left;
  }

  div button:nth-child(2) {
    color: red;
  }
`;

export const TaskDescriptions = styled.div`
  margin: 20px 0;

  p {
    font-size: 14px;
    color: gray;
    line-height: 25px;
  }
`;

export const TasksSubTasks = styled.div`
  h4 {
    margin: 10px 0px 15px;
  }
  margin-bottom: 20px;
`;

export const SubtasksList = styled.div`
  div {
    background-color: var(--foreground);
    display: flex;
    gap: 10px;
    margin: 10px 0px;
    padding: 15px;
    border-radius: 5px;
    font-size: 14px;
  }
`;

export const NoSubtasks = styled.p`
  text-align: center;
  padding: 15px;
  background: var(--background);
  border-radius: 5px;
  font-size: 14px;
`;
