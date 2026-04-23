import { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Checkbox } from "@/app/UI/checkbox";
import * as Styled from "./tasksForm.styled";
import { Select } from "@/app/UI/select";
import { SubtaskListsType } from "../content.type";
import { useAppSelector } from "@/app/redux/slice/hook";
import { ColumnListsType } from "@/app/types";

type TasksFormProps = {
  title: string;
  description: string;
  subTasks: SubtaskListsType[];
};

export function TasksForm({ title, description, subTasks }: TasksFormProps) {
  const [statusLists, setStatusLists] = useState<ColumnListsType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [showActionBtn, setShowActionBtn] = useState<boolean>(false);
  const [subTasksLists, setSubTasksLists] = useState<SubtaskListsType[]>([]);

  const currentBoard = useAppSelector((state) => state.boardSlice);

  useEffect(() => {
    setStatusLists(currentBoard.boardColumn || []);
  }, [currentBoard]);

  useEffect(() => {
    setSubTasksLists(subTasks);
  }, [subTasks]);

  const onCheckHandler = (value: string): void => {
    const updateStatus = subTasksLists.map((subtask) => {
      if (subtask.subTaskId === Number(value)) {
        return { ...subtask, subTaskStatus: !subtask.subTaskStatus };
      }
      return subtask;
    });

    setSubTasksLists(updateStatus);
  };

  const onSelectHandler = (selectedOpt: SelectedStatus): void => {
    setSelectedStatus(selectedOpt.value);
  };

  return (
    <Styled.TaskContent>
      <Styled.TaskHeader>
        <h3>{title}</h3>
        <Styled.TaskHeaderDots>
          <HiOutlineDotsVertical
            onClick={() => setShowActionBtn((prev) => !prev)}
          />

          {showActionBtn && (
            <div>
              <button>Edit Task</button>
              <button>Delete Task</button>
            </div>
          )}
        </Styled.TaskHeaderDots>
      </Styled.TaskHeader>

      <Styled.TaskDescriptions>
        <p>{description}</p>
      </Styled.TaskDescriptions>

      <Styled.TasksSubTasks>
        <h4>Subtasks {`(2 of ${subTasksLists.length})`}</h4>

        <Styled.SubtasksList>
          {subTasksLists.length > 0 ? (
            subTasksLists.map((subtask) => (
              <div key={subtask.subTaskId}>
                <Checkbox
                  value={subtask.subTaskId}
                  checked={subtask.subTaskStatus}
                  onClick={onCheckHandler}
                />
                <p>{subtask.subTask}</p>
              </div>
            ))
          ) : (
            <Styled.NoSubtasks>No Subtasks Created</Styled.NoSubtasks>
          )}
        </Styled.SubtasksList>
      </Styled.TasksSubTasks>

      <Select
        title="Status"
        value={selectedStatus}
        options={statusLists}
        onSelect={onSelectHandler}
        getLabel={(status) => status.columnName}
        getValue={(status) => Number(status.columnId)}
      />
    </Styled.TaskContent>
  );
}
