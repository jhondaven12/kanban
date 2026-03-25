import { useEffect, useState } from "react";
import * as Styled from "./content.styled";
import { Modal } from "@/app/UI/modal";
import { BoardForm } from "./boardColumnsForm/boardForm";
import { getColumnAPI, getTasksAPI } from "@/app/api/board-api";
import { ColumnListsType, ContentProps, TaskListsType } from "./interface";
import { TaskContainer } from "./boardTasksForm/tasksContainer";

export default function Content({ boardId }: ContentProps) {
  const [openColumnForm, setOpenColumnForm] = useState<boolean>(false);
  const [columnLists, setColumnLists] = useState<ColumnListsType[]>([]);
  const [taskLists, setTaskLists] = useState<TaskListsType[]>([]);

  useEffect(() => {
    if (!boardId) return;

    const fetchDta = async () => {
      try {
        const [columnListRes, taskListsRes] = await Promise.all([
          getColumnAPI(boardId),
          getTasksAPI(),
        ]);

        setColumnLists(columnListRes.data);
        setTaskLists(taskListsRes.data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchDta();
  }, [boardId]);

  return (
    <Styled.Content>
      {columnLists.length > 0 &&
        columnLists.map((item) => (
          <Styled.Columns key={item.columnId}>
            <span>{item.columnName.toUpperCase()} (4)</span>

            {taskLists
              .filter((subItem) => subItem.columnId === item.columnId)
              .map((tasks) => (
                <TaskContainer key={tasks.taskId} tasks={tasks} />
              ))}
          </Styled.Columns>
        ))}

      <Styled.NewColumns onClick={() => setOpenColumnForm(true)}>
        <p>+ New Columns</p>
      </Styled.NewColumns>

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
