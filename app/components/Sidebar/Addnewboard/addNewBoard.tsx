import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/app/UI/input";
import { v4 as uui4d } from "uuid";
import { Button } from "@/app/UI/button";
import { IoIosCloseCircleOutline } from "react-icons/io";
import * as Styled from "./addNewBoard.styled";
import { useAppDispatch } from "@/app/redux/slice/hook";
import { setBoardLoad } from "@/app/redux/slice/boardSlice";
import { insertBoardAPI } from "@/app/api/board-api";

type AddNewBoardProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};
type BoardColumnsProps = {
  columnId: number | string;
  columnName: string;
};

export function AddNewBoard({ setIsOpen }: AddNewBoardProps) {
  const uniqueId = uui4d().slice(0, 8);
  const dispatch = useAppDispatch();
  const [boardName, setBoardName] = useState<string>("");
  const [boardColumns, setBoardColumns] = useState<BoardColumnsProps[]>([
    {
      columnId: uniqueId,
      columnName: "Todo",
    },
  ]);

  // CHANGE COLUMN NAME
  const onChangeInput = (value: string, columnId: number | string): void => {
    setBoardColumns(
      boardColumns.map((item) =>
        item.columnId === columnId ? { ...item, columnName: value } : item,
      ),
    );
  };

  // ADD NEW COLUMN
  const onAddColumn = (): void => {
    setBoardColumns([
      ...boardColumns,
      {
        columnId: uniqueId,
        columnName: "",
      },
    ]);
  };

  // REMOVE COLUMN
  const onRemoveColumn = (itemId: number | string): void => {
    if (boardColumns.length === 1) return;

    const removeItems = boardColumns.filter(
      ({ columnId }) => columnId !== itemId,
    );
    setBoardColumns(removeItems);
  };

  // ON SAVE CHANGES
  const onSaveBoard = async (): Promise<void> => {
    try {
      dispatch(setBoardLoad(true));
      await insertBoardAPI({
        boardName,
        columns: boardColumns.map((item) => ({
          columnName: item.columnName,
        })),
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setBoardLoad(false));
      setIsOpen(false);
    }
  };

  const checkInputs =
    boardName === "" || boardColumns.some((i) => i.columnName === "");

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
              onChange={(value) => onChangeInput(value, columnId)}
            />
            <p>
              <IoIosCloseCircleOutline
                onClick={() => onRemoveColumn(columnId)}
              />
            </p>
          </Styled.FormInputs>
        ))}
        <Button label="+ Add Colums" onClick={onAddColumn} />
      </Styled.BoardFormBody>

      <Button
        label="Save Changes"
        onClick={onSaveBoard}
        disabled={checkInputs}
      />
    </Styled.BoardFormContent>
  );
}
