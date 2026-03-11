import { useState } from "react";
import { TasksForm } from "./boardTasksForm/tasksForm";
import * as Styled from "./content.styled";
import { Modal } from "@/app/UI/modal";
import { BoardForm } from "./boardColumnsForm/boardForm";

export default function Content() {
  const [openTaskForm, setOpenTaskForm] = useState<boolean>(false);
  const [openColumnForm, setOpenColumnForm] = useState<boolean>(false);

  return (
    <Styled.Content>
      <Styled.Columns>
        <span>TODO (4)</span>

        <Styled.ColumnTasks onClick={() => setOpenTaskForm(true)}>
          <h3>Title</h3>
          <p>Descriptions</p>
        </Styled.ColumnTasks>

        <Styled.ColumnTasks>
          <h3>Title</h3>
          <p>Descriptions</p>
        </Styled.ColumnTasks>

        <Styled.ColumnTasks>
          <h3>Title</h3>
          <p>Descriptions</p>
        </Styled.ColumnTasks>
      </Styled.Columns>
      <Styled.Columns>
        <span>DOING (2)</span>

        <Styled.ColumnTasks>
          <h3>Title</h3>
          <p>Descriptions</p>
        </Styled.ColumnTasks>

        <Styled.ColumnTasks>
          <h3>Title</h3>
          <p>Descriptions</p>
        </Styled.ColumnTasks>
      </Styled.Columns>
      <Styled.Columns>
        <span>DONE (1)</span>

        <Styled.ColumnTasks>
          <h3>Title</h3>
          <p>Descriptions</p>
        </Styled.ColumnTasks>
      </Styled.Columns>

      <Styled.NewColumns onClick={() => setOpenColumnForm(true)}>
        <p>+ New Columns</p>
      </Styled.NewColumns>

      {openTaskForm && (
        <Modal width="550px" onClose={() => setOpenTaskForm(false)}>
          <TasksForm />
        </Modal>
      )}

      {openColumnForm && (
        <Modal
          title="Edit Board"
          width="550px"
          onClose={() => setOpenColumnForm(false)}
        >
          <BoardForm />
        </Modal>
      )}
    </Styled.Content>
  );
}
