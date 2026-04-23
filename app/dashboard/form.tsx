import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Input } from "@/app/UI/input";
import { Textarea } from "@/app/UI/textarea";
import * as Styled from "./dashboard.styled";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Button } from "../UI/button";
import { v4 as uuidv4 } from "uuid";
import { Select } from "../UI/select";
import { useAppDispatch, useAppSelector } from "../redux/slice/hook";
import { setBoardLoad } from "../redux/slice/boardSlice";
import { insertTasksAPI } from "../api/board-api";
import { ColumnListsType } from "../types";

type AddnewTaskFormProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function AddnewTaskForm({ setIsOpen }: AddnewTaskFormProps) {
  const uniqueId = uuidv4().slice(0, 8);
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    setStatusLists(currentBoard.boardColumn || []);
  }, [currentBoard]);

  // CREATE NEW TASK API
  const onCreateTasks = async (): Promise<void> => {
    try {
      dispatch(setBoardLoad(true));
      const getSubTasks = subTasks.map((item) => ({
        subTask: item.subTasks,
      }));
      await insertTasksAPI({
        ...formValue,
        columnId: selectedStatus,
        subTasks: getSubTasks,
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setBoardLoad(false));
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
    if (subTasks.length === 3) return;
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

  const verifyInputValues =
    formValue.taskTitle === "" ||
    formValue.taskDescription === "" ||
    subTasks.some((i) => i.subTasks === "") ||
    !selectedStatus;

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
        placeholder="e.g. Take coffee break..."
        propertyKey="taskDescription"
        onChange={(value, propertyKey) => onChangeInput(value, propertyKey)}
      />

      <Styled.SubtasksContainer>
        <p>Subtasks</p>
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
        <Button label="+ Add Subtasks" onClick={onAddSubtasks} />
      </Styled.SubtasksContainer>

      <Select
        title="Status"
        value={selectedStatus}
        options={statusLists}
        onSelect={onSelectHandler}
        getLabel={(status) => status.columnName}
        getValue={(status) => Number(status.columnId)}
      />

      <Button
        label="Create Task"
        onClick={onCreateTasks}
        disabled={verifyInputValues}
      />
    </Styled.FormModalContainer>
  );
}
