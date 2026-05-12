import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Input } from "@/app/UI/input";
import { Textarea } from "@/app/UI/textarea";
import * as Styled from "./dashboard.styled";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Button } from "../UI/button";
import { v4 as uuidv4 } from "uuid";
import { Select } from "../UI/select";
import { useAppDispatch, useAppSelector } from "../redux/slice/hook";
import {
  setBoardLoad,
  setEditTasks,
  setTasksInfo,
} from "../redux/slice/boardSlice";
import { insertTasksAPI, modifyTasksAPI } from "../api/board-api";
import { ColumnListsType } from "../types";

type AddnewTaskFormProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

// TASK MODAL
export function AddnewTaskForm({ setIsOpen }: AddnewTaskFormProps) {
  const uniqueId = uuidv4().slice(0, 8);
  const dispatch = useAppDispatch();
  const storedFormValue = useRef<FormValue | null>(null);
  const storedSubTasks = useRef<SubtasksProps[]>([]);
  const [formValue, setFormValue] = useState<FormValue>({
    taskTitle: "",
    taskDescription: "",
  });
  const [statusLists, setStatusLists] = useState<ColumnListsType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [subTasks, setSubTasks] = useState<SubtasksProps[]>([
    {
      id: uniqueId,
      subTasks: "",
    },
  ]);

  const currentBoard = useAppSelector((state) => state.boardSlice);

  // CLEAR REF IF COMPONENT UNMOUNT
  useEffect(() => {
    return () => {
      storedFormValue.current = null;
      storedSubTasks.current = [];
    };
  }, []);

  useEffect(() => {
    const { boardColumn, taskColumnId } = currentBoard;
    setSelectedStatus(taskColumnId);
    setStatusLists(boardColumn || []);
  }, [currentBoard.boardColumn]);

  // SET existing formValue and subTasks
  useEffect(() => {
    if (currentBoard.editTasks && currentBoard.tasksInfo) {
      const { title, description, subTasks } = currentBoard.tasksInfo;

      const existingFormValue = {
        taskTitle: title,
        taskDescription: description,
      };

      setFormValue((prev) => ({
        ...prev,
        ...existingFormValue,
      }));
      storedFormValue.current = existingFormValue;

      const subTaskLists = subTasks.map((item) => ({
        id: String(item.subTaskId),
        subTasks: item.subTask,
      }));
      setSubTasks(subTaskLists);
      storedSubTasks.current = subTaskLists;
    }
  }, [currentBoard.editTasks]);

  // CREATE NEW TASK API
  const onCreateTasks = async (): Promise<void> => {
    try {
      dispatch(setBoardLoad(true));
      const getSubTasks = subTasks.map((item) => ({
        subTask: item.subTasks,
      }));
      await insertTasksAPI({
        ...formValue,
        boardId: currentBoard.boardId,
        columnId: selectedStatus,
        subTasks: getSubTasks,
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setBoardLoad(false));
      dispatch(setEditTasks(false));
      setIsOpen(false);
    }
  };

  const onModifyTasks = async () => {
    try {
      dispatch(setBoardLoad(true));
      const getSubTasks = subTasks.map((item) => ({
        subTaskId: Number(item.id),
        subTask: item.subTasks,
      }));

      await modifyTasksAPI({
        taskId: Number(currentBoard.tasksInfo?.taskId),
        taskTitle: formValue.taskTitle,
        taskDescription: formValue.taskDescription,
        subTasks: getSubTasks.length > 0 ? getSubTasks : [],
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setBoardLoad(false));
      dispatch(setTasksInfo(null));
      dispatch(setEditTasks(false));
      setIsOpen(false);
    }
  };

  // CHANGE FORM INPUT
  const onChangeInput = (value: string, propertyKey: string): void => {
    setFormValue((prev) => ({
      ...prev,
      [propertyKey]: value,
    }));
  };

  // ADD NEW SUBTASKS
  const onAddSubtasks = (): void => {
    setSubTasks([
      ...subTasks,
      {
        id: uniqueId,
        subTasks: "",
      },
    ]);
  };

  // EDIT SUBTASKS
  const onEditSubTasks = (itemId: string, value: string): void => {
    const updatedItems = subTasks.map((item) => {
      if (item.id === itemId) {
        return { ...item, subTasks: value };
      }
      return item;
    });
    setSubTasks(updatedItems);
  };

  // REMOVE SUBTASKS
  const onRemoveSubTasks = (itemId: string): void => {
    if (subTasks.length === 1) return;
    const removeItems = subTasks.filter(({ id }) => id !== itemId);
    setSubTasks(removeItems);
  };

  // SELECT STATUS
  const onSelectHandler = (selectedOpt: SelectedStatus): void => {
    setSelectedStatus(selectedOpt.value);
  };

  const hasEmptySubTask = subTasks.some((i) => i.subTasks.trim() === "");

  const verifyInputValues =
    formValue.taskTitle.trim() === "" ||
    formValue.taskDescription.trim() === "" ||
    hasEmptySubTask ||
    !selectedStatus;

  const verifyOnEditChanges =
    !hasEmptySubTask &&
    (formValue.taskTitle.toLowerCase().trim() !==
      storedFormValue?.current?.taskTitle.toLowerCase().trim() ||
      formValue.taskDescription.toLowerCase().trim() !==
        storedFormValue?.current?.taskDescription.toLowerCase().trim() ||
      subTasks.length !== storedSubTasks.current.length ||
      subTasks.some((o) =>
        storedSubTasks.current.some(
          (n) =>
            o.id === n.id &&
            o.subTasks.toLowerCase().trim() !== n.subTasks.toLowerCase().trim(),
        ),
      ));

  return (
    <Styled.FormModalContainer>
      <Input
        type="text"
        label="Title"
        value={formValue.taskTitle}
        propertyKey="taskTitle"
        placeholder="e.g. Take coffee break..."
        onChange={(value, propertyKey) => onChangeInput(value, propertyKey)}
      />
      <Textarea
        label="Description"
        value={formValue.taskDescription}
        placeholder="e.g. Take coffee break..."
        propertyKey="taskDescription"
        onChange={(value, propertyKey) => onChangeInput(value, propertyKey)}
      />

      <Styled.SubtasksContainer>
        <p>Subtasks</p>
        <Styled.SubtasksContent>
          {subTasks.map(({ id, subTasks }) => (
            <Styled.FormInputs key={id}>
              <Input
                type="text"
                value={subTasks}
                placeholder="e.g. Make a coffee..."
                onChange={(value) => onEditSubTasks(id, value)}
              />
              <p>
                <IoIosCloseCircleOutline onClick={() => onRemoveSubTasks(id)} />
              </p>
            </Styled.FormInputs>
          ))}
        </Styled.SubtasksContent>
        <Button label="+ Add Subtasks" onClick={onAddSubtasks} />
      </Styled.SubtasksContainer>

      <Select
        title="Status"
        value={selectedStatus}
        options={statusLists}
        onSelect={onSelectHandler}
        getLabel={(status) => status.columnName}
        getValue={(status) => Number(status.columnId)}
        disabled={currentBoard?.editTasks}
      />

      <Button
        label="Confirm"
        onClick={currentBoard.editTasks ? onModifyTasks : onCreateTasks}
        disabled={
          currentBoard.editTasks ? !verifyOnEditChanges : verifyInputValues
        }
      />
    </Styled.FormModalContainer>
  );
}
