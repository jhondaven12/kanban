import { useState } from "react";
import { Input } from "@/app/UI/input";
import { Textarea } from "@/app/UI/textarea";
import * as Styled from "./dashboard.styled";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Button } from "../UI/button";
import { v4 as uuidv4 } from "uuid";
import { Select } from "../UI/select";

interface SubtasksProps {
  id: string;
  subTasks: string;
}

interface StatuslistsProps {
  statusId: number;
  statusName: string;
}

interface SelectedStatus {
  label: string;
  value: number;
}

export function AddnewTaskForm() {
  const uniqueId = uuidv4().slice(0, 8);
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
  const [subTasks, setSubTasks] = useState<SubtasksProps[]>([
    {
      id: uniqueId,
      subTasks: "",
    },
  ]);

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

  const onEditSubTasks = (itemId: string, value: string): void => {
    const updatedItems = subTasks.map((item) => {
      if (item.id === itemId) {
        return { ...item, subTasks: value };
      }
      return item;
    });
    setSubTasks(updatedItems);
  };

  const onRemoveSubTasks = (itemId: string): void => {
    if (subTasks.length === 1) return;
    const removeItems = subTasks.filter(({ id }) => id !== itemId);
    setSubTasks(removeItems);
  };

  const onSelectHandler = (selectedOpt: SelectedStatus): void => {
    setSelectedStatus(selectedOpt.value);
  };

  return (
    <Styled.FormModalContainer>
      <Input
        type="text"
        label="Title"
        value={""}
        propertyKey="title"
        placeholder="e.g. Take coffee break..."
        onChange={(value, propertyKey) => console.log(value, propertyKey)}
      />
      <Textarea
        label="Description"
        placeholder="e.g. Take coffee break..."
        propertyKey="description"
        onChange={(value, propertyKey) => console.log(value, propertyKey)}
      />

      <Styled.SubtasksContainer>
        <p>Subtasks</p>
        {subTasks.map(({ id }) => (
          <Styled.FormInputs key={id}>
            <Input
              type="text"
              value={""}
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
        getLabel={(status) => status.statusName}
        getValue={(status) => status.statusId}
      />

      <Button label="Create Task" onClick={() => {}} />
    </Styled.FormModalContainer>
  );
}
