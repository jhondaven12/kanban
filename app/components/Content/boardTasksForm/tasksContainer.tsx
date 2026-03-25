import { Fragment, useState } from "react";
import { ColumnTasks } from "../content.styled";
import { TaskListsType } from "../interface";
import { Modal } from "@/app/UI/modal";
import { TasksForm } from "./tasksForm";

type TaskContainerProps = {
  tasks: TaskListsType;
};

export function TaskContainer({ tasks }: TaskContainerProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <Fragment>
      <ColumnTasks onClick={() => setOpenModal(true)}>
        <h3>{tasks.taskTitle}</h3>
        <p>{tasks.taskSubtitle}</p>
      </ColumnTasks>

      {openModal && (
        <Modal width="550px" onClose={() => setOpenModal(false)}>
          <TasksForm tasks={tasks} />
        </Modal>
      )}
    </Fragment>
  );
}
