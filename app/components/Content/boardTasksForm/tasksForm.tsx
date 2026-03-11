import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Checkbox } from "@/app/UI/checkbox";
import * as Styled from "./tasksForm.styled";
import { Select } from "@/app/UI/select";

interface StatuslistsProps {
  statusId: number;
  statusName: string;
}
interface SubTasks {
  subTaskId: number;
  subTaskName: string;
  subTaskStatus: boolean;
}

export function TasksForm() {
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
  const [subTasks, setSubTasks] = useState<SubTasks[]>([
    {
      subTaskId: 1,
      subTaskName: "Task one",
      subTaskStatus: true,
    },
    {
      subTaskId: 2,
      subTaskName: "Task two",
      subTaskStatus: false,
    },
  ]);

  const onCheckHandler = (value: string): void => {
    const updateStatus = subTasks.map((subtask) => {
      if (subtask.subTaskId === Number(value)) {
        return { ...subtask, subTaskStatus: !subtask.subTaskStatus };
      }
      return subtask;
    });

    setSubTasks(updateStatus);
  };

  return (
    <Styled.TaskContent>
      <Styled.TaskHeader>
        <h3>
          Research pricing points of various competitors and trial different
          business models
        </h3>
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
        <p>
          We know what we`re plannng to build for version one. Now we need to
          finalise the first pricing model we`ll use. Keep iterating the
          subtasks until we have a conherent proposition.
        </p>
      </Styled.TaskDescriptions>

      <Styled.TasksSubTasks>
        <h4>Subtasks {`(2 of 3)`}</h4>

        <Styled.SubtasksList>
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
        </Styled.SubtasksList>
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
