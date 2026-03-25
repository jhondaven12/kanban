import { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Checkbox } from "@/app/UI/checkbox";
import * as Styled from "./tasksForm.styled";
import { Select } from "@/app/UI/select";
import {
  StatuslistsProps,
  SubtaskListsType,
  TaskListsType,
} from "../interface";

type TasksFormProps = {
  tasks: TaskListsType;
};

export function TasksForm({ tasks }: TasksFormProps) {
  const [statusLists, setStatusLists] = useState<StatuslistsProps[]>([
    {
      statusId: 1,
      statusName: "Todo",
    },
    {
      statusId: 2,
      statusName: "Doing",
    },
    {
      statusId: 3,
      statusName: "Done",
    },
  ]);
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [showActionBtn, setShowActionBtn] = useState<boolean>(false);
  const [subTasksLists, setSubTasksLists] = useState<SubtaskListsType[]>([]);

  useEffect(() => {
    setSubTasksLists(tasks?.subTasks ? [tasks?.subTasks] : []);
  }, [tasks]);
  // const onCheckHandler = (value: string): void => {
  //   const updateStatus = subTasks.map((subtask) => {
  //     if (subtask.subTaskId === Number(value)) {
  //       return { ...subtask, subTaskStatus: !subtask.subTaskStatus };
  //     }
  //     return subtask;
  //   });

  //   setSubTasks(updateStatus);
  // };

  return (
    <Styled.TaskContent>
      <Styled.TaskHeader>
        <h3>{tasks?.taskTitle}</h3>
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
        <p>{tasks?.taskSubtitle}</p>
      </Styled.TaskDescriptions>

      <Styled.TasksSubTasks>
        <h4>Subtasks {`(2 of ${subTasksLists.length})`}</h4>

        {/* <Styled.SubtasksList>
          {subTasks.length > 0 ? (
            subTasks.map((subtask) => (
              <div key={subtask.subTaskId}>
                <Checkbox
                  value={subtask.subTaskId}
                  checked={subtask.subTaskStatus}
                  onClick={onCheckHandler}
                />
                <p>{subtask.subTaskName}</p>
              </div>
            ))
          ) : (
            <Styled.NoSubtasks>No Subtasks Created</Styled.NoSubtasks>
          )}
        </Styled.SubtasksList> */}
      </Styled.TasksSubTasks>

      <Select
        title="Status"
        value={selectedStatus}
        options={statusLists}
        onSelect={() => {}}
        getLabel={(status) => status.statusName}
        getValue={(status) => status.statusId}
      />
    </Styled.TaskContent>
  );
}
