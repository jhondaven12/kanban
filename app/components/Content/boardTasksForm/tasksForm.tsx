import {
  SetStateAction,
  useCallback,
  useEffect,
  useState,
  Dispatch,
} from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Checkbox } from "@/app/UI/checkbox";
import * as Styled from "./tasksForm.styled";
import { Select } from "@/app/UI/select";
import { SubtaskListsType } from "../content.type";
import { useAppDispatch } from "@/app/redux/slice/hook";
import { ColumnListsType } from "@/app/types";
import {
  setBoardLoad,
  setEditTasks,
  setTasksInfo,
} from "@/app/redux/slice/boardSlice";
import { Button } from "@/app/UI/button";
import { getSubTasksAPI, modifySubTasksAPI } from "@/app/api/board-api";
import { SkeletonLoading } from "@/app/UI/skeletonLoading/skeletonOne";

type TasksFormProps = {
  columnId: number;
  columnLists: ColumnListsType[];
  taskId: number;
  title: string;
  description: string;
  subTasks: SubtaskListsType[];
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export function TasksForm({
  columnId,
  columnLists,
  taskId,
  title,
  description,
  subTasks,
  setOpenModal,
}: TasksFormProps) {
  const dispatch = useAppDispatch();
  const [statusLists, setStatusLists] = useState<ColumnListsType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [showActionBtn, setShowActionBtn] = useState<boolean>(false);
  const [subTasksLists, setSubTasksLists] = useState<SubtaskListsType[]>([]);
  const [storedSubTaskLists, setStoredSubTaskLists] = useState<
    SubtaskListsType[]
  >([]);
  const [updatedItems, setUpdatedItems] = useState<SubtaskListsType[]>([]);
  const [loading, setLoading] = useState(true);

  const getSubTasks = async () => {
    try {
      setLoading(true);
      const response = await getSubTasksAPI(taskId);
      setSubTasksLists(response.data);
      setStoredSubTaskLists(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubTasks();
  }, [taskId]);

  useEffect(() => {
    setSelectedStatus(columnId);
    setStatusLists(columnLists || []);
  }, [columnId]);

  useEffect(() => {
    const changeItems = subTasksLists.filter((item) => {
      const originalItem = storedSubTaskLists.find(
        (o) => o.subTaskId === item.subTaskId,
      );

      if (!originalItem) return true;

      return (
        Boolean(item.subTaskStatus) !== Boolean(originalItem.subTaskStatus)
      );
    });

    setUpdatedItems(changeItems);
  }, [subTasksLists]);

  // UPDATE SUBTASKS STATUS
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

  // ON EDIT TASKS
  const onEdiTasks = useCallback(() => {
    setOpenModal(false);
    dispatch(setEditTasks(true));
    dispatch(
      setTasksInfo({
        taskId,
        title,
        description,
        subTasks: subTasks,
      }),
    );
  }, []);

  const onSaveTasks = async () => {
    try {
      if (updatedItems.length === 0) return;
      setLoading(true);
      const cleanedArray = updatedItems.map(({ taskId, ...rest }) => rest);
      await modifySubTasksAPI(cleanedArray);
      await getSubTasks();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // if (loading) {
  //   return <SkeletonLoading />;
  // }

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
              <button onClick={onEdiTasks}>Edit Task</button>
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

      <Button
        label="Save"
        onClick={onSaveTasks}
        disabled={updatedItems.length === 0}
      />
    </Styled.TaskContent>
  );
}
