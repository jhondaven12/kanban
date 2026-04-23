import { useEffect, useState } from "react";
import * as Styled from "./content.styled";
import { Modal } from "@/app/UI/modal";
import { BoardForm } from "./boardColumnsForm/boardForm";
import { getColumnAPI, getTasksAPI } from "@/app/api/board-api";
import { TaskListsType } from "./content.type";
import { ColumnListsType } from "@/app/types";
import { TaskContainer } from "./boardTasksForm/tasksContainer";
import { useAppDispatch, useAppSelector } from "@/app/redux/slice/hook";
import { setBoardColumn } from "@/app/redux/slice/boardSlice";

export default function Content() {
  const dispatch = useAppDispatch();
  const [openColumnForm, setOpenColumnForm] = useState<boolean>(false);
  const [columnLists, setColumnLists] = useState<ColumnListsType[]>([]);
  const [taskLists, setTaskLists] = useState<TaskListsType[]>([]);

  const currentBoard = useAppSelector((state) => state.boardSlice);

  console.log("currentBoard", currentBoard);

  useEffect(() => {
    const { boardId } = currentBoard;

    if (!boardId) return;

    const fetchDta = async () => {
      try {
        const [columnListRes, taskListsRes] = await Promise.all([
          getColumnAPI(boardId),
          getTasksAPI(),
        ]);

        dispatch(setBoardColumn(columnListRes.data));
        setColumnLists(columnListRes.data);
        setTaskLists(taskListsRes.data);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchDta();
  }, [currentBoard.boardId, currentBoard.boardLoad]);

  const totalTasks = (columnId: number) => {
    return taskLists.filter((subItem) => subItem.columnId === columnId).length;
  };

  console.log("taskLists", taskLists);

  return (
    <Styled.Content>
      {columnLists.length > 0 &&
        columnLists.map((item) => (
          <Styled.Columns key={item.columnId}>
            <span>
              {item.columnName.toUpperCase()}{" "}
              {`(${totalTasks(Number(item.columnId))})`}
            </span>

            {taskLists
              .filter((subItem) => subItem.columnId === item.columnId)
              .map((tasks) => (
                <TaskContainer key={tasks.taskId} tasks={tasks} />
              ))}
          </Styled.Columns>
        ))}

      {currentBoard.boardId !== null && (
        <Styled.NewColumns onClick={() => setOpenColumnForm(true)}>
          <p>+ New Columns</p>
        </Styled.NewColumns>
      )}

      {openColumnForm && (
        <Modal
          title="Edit Board"
          width="550px"
          onClose={() => setOpenColumnForm(false)}
        >
          <BoardForm setOpenColumnForm={setOpenColumnForm} />
        </Modal>
      )}
    </Styled.Content>
  );
}
