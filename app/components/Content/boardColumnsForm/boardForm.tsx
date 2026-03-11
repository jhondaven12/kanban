import { useState } from "react";
import { Input } from "@/app/UI/input";
import { Button } from "@/app/UI/button";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import * as Styled from "./boardForm.styled";

interface BoardColumnsProps {
  columnId: number | string;
  columnName: string;
}

export function BoardForm() {
  const uniqueId = uuidv4().slice(0, 8);
  const [boardName, setBoardName] = useState<string>("Board One");
  const [boardColumns, setBoardColumns] = useState<BoardColumnsProps[]>([
    {
      columnId: 1,
      columnName: "Todo",
    },
    {
      columnId: 2,
      columnName: "Doing",
    },
    {
      columnId: 3,
      columnName: "Done",
    },
  ]);

  const onAddColumn = (): void => {
    setBoardColumns([
      ...boardColumns,
      {
        columnId: uniqueId,
        columnName: "",
      },
    ]);
  };

  const onRemoveColum = (itemId: number | string): void => {
    if (boardColumns.length === 1) return;
    const removeItems = boardColumns.filter(
      ({ columnId }) => columnId !== itemId,
    );
    setBoardColumns(removeItems);
  };

  return (
    <Styled.BoardFormContent>
      <Input
        type="text"
        label="Board Name"
        value={boardName}
        propertyKey="boardName"
        onChange={(value) => setBoardName(value)}
      />

      <Styled.BoardFormBody>
        <p>Board Columns</p>

        {boardColumns.map(({ columnId, columnName }) => (
          <Styled.FormInputs key={columnId}>
            <Input
              type="text"
              value={columnName}
              onChange={(value) => console.log(columnId, value)}
            />
            <p>
              <IoIosCloseCircleOutline
                onClick={() => onRemoveColum(columnId)}
              />
            </p>
          </Styled.FormInputs>
        ))}
        <Button label="+ Add Colums" onClick={onAddColumn} />
      </Styled.BoardFormBody>

      <Button label="Save Changes" onClick={() => {}} />
    </Styled.BoardFormContent>
  );
}
