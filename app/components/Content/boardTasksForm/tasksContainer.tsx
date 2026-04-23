import { Fragment, useState } from "react";
import { ColumnTasks } from "../content.styled";
import { TaskListsType } from "../content.type";
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
        <p>{tasks.taskDescription}</p>
      </ColumnTasks>

      {openModal && (
        <Modal width="550px" onClose={() => setOpenModal(false)}>
          <TasksForm
            title={tasks.taskTitle}
            description={tasks.taskDescription}
            subTasks={tasks.subTasks}
          />
        </Modal>
      )}
    </Fragment>
  );
}
