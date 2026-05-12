import { Fragment, useEffect, useState } from "react";
import { ColumnTasks } from "../content.styled";
import { TaskListsType } from "../content.type";
import { Modal } from "@/app/UI/modal";
import { TasksForm } from "./tasksForm";
import { useAppDispatch, useAppSelector } from "@/app/redux/slice/hook";
import { setTaskColumnId } from "@/app/redux/slice/boardSlice";

type TaskContainerProps = {
  tasks: TaskListsType;
};

export function TaskContainer({ tasks }: TaskContainerProps) {
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const currentBoard = useAppSelector((state) => state.boardSlice);

  useEffect(() => {
    const isEdit = currentBoard.editTasks ? Number(tasks.columnId) : null;
    dispatch(setTaskColumnId(isEdit));
  }, [tasks.columnId, currentBoard.editTasks]);

  return (
    <Fragment>
      <ColumnTasks onClick={() => setOpenModal(true)}>
        <h3>{tasks.taskTitle}</h3>
        <p>{tasks.taskDescription}</p>
      </ColumnTasks>

      {openModal && (
        <Modal width="550px" onClose={() => setOpenModal(false)}>
          <TasksForm
            columnId={tasks.columnId}
            columnLists={currentBoard.boardColumn}
            taskId={tasks.taskId}
            title={tasks.taskTitle}
            description={tasks.taskDescription}
            subTasks={tasks.subTasks}
            setOpenModal={setOpenModal}
          />
        </Modal>
      )}
    </Fragment>
  );
}
