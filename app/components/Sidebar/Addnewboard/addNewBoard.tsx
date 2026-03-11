import { useState } from "react";
import { Input } from "@/app/UI/input";
import { v4 as uui4d } from "uuid";
import { Button } from "@/app/UI/button";
import { IoIosCloseCircleOutline } from "react-icons/io";
import * as Styled from "./addNewBoard.styled";

interface BoardColumnsProps {
  columnId: number | string;
  columnName: string;
}

export function AddNewBoard() {
  const uniqueId = uui4d().slice(0, 8);
  const [boardName, setBoardName] = useState<string>("");
  const [boardColumns, setBoardColumns] = useState<BoardColumnsProps[]>([
    {
      columnId: 1,
      columnName: "Todo",
    },
    {
      columnId: 2,
      columnName: "Doing",
    },
  ]);
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
              <IoIosCloseCircleOutline onClick={() => console.log(columnId)} />
            </p>
          </Styled.FormInputs>
        ))}
        <Button label="+ Add Colums" onClick={() => {}} />
      </Styled.BoardFormBody>
      <Button label="Save Changes" onClick={() => {}} />
    </Styled.BoardFormContent>
  );
}
