import { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as Styled from "./boardForm.styled";
import { Input } from "@/app/UI/input";
import { Button } from "@/app/UI/button";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ColumnListsType } from "@/app/types";
import { useAppSelector, useAppDispatch } from "@/app/redux/slice/hook";
import { verifyChangesById } from "@/app/utils/global.utils";
import {
  insertColumnAPI,
  modifyBoardAPI,
  removeColumnAPI,
} from "@/app/api/board-api";
import { v4 as uuidv4 } from "uuid";
import { setBoardLoad, setColumnModal } from "@/app/redux/slice/boardSlice";

interface BoardFormProps {
  setOpenColumnForm: Dispatch<SetStateAction<boolean>>;
}

export function BoardForm({ setOpenColumnForm }: BoardFormProps) {
  const uniqueId = uuidv4().slice(0, 8);
  const dispatch = useAppDispatch();
  const [boardName, setBoardName] = useState<string>("");
  const [storedBoardName, setStoredBoardName] = useState<string>("");
  const [boardColumns, setBoardColumns] = useState<ColumnListsType[]>([]);
  const [storedBoardColumns, setStoredBoardColumns] = useState<
    ColumnListsType[]
  >([]);

  const currentBoard = useAppSelector((state) => state.boardSlice);

  useEffect(() => {
    setBoardName(currentBoard.boardName);
    setStoredBoardName(currentBoard.boardName);
    setBoardColumns(currentBoard.boardColumn);
    setStoredBoardColumns(currentBoard.boardColumn);
  }, [currentBoard.boardColumn]);

  const disabledSaveBtn = () => {
    const { addedColumns, updatedColumns, removedColumns } = verifyChangesById(
      storedBoardColumns,
      boardColumns,
    );

    const hasEmptyColumn = boardColumns.some(
      (c) => !c.columnName || c.columnName.trim() === "",
    );

    const noChanges =
      addedColumns.length === 0 &&
      updatedColumns.length === 0 &&
      removedColumns.length === 0;

    return noChanges || hasEmptyColumn;
  };

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
        boardId: currentBoard.boardId ?? 1,
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

  // ON SAVE BUTTON
  const onSaveColumn = async (): Promise<void> => {
    const verifyColumnName = boardColumns.some((i) => !i.columnName.trim());
    if (verifyColumnName) return;

    try {
      dispatch(setBoardLoad(true));

      const { addedColumns, updatedColumns, removedColumns } =
        verifyChangesById(storedBoardColumns, boardColumns);

      // UPDATE BOARD NAME
      if (storedBoardName.toLowerCase() !== boardName.toLowerCase()) {
        await modifyBoardAPI({
          boardId: Number(currentBoard.boardId),
          boardName: boardName,
        });
      }

      // INSERT + UPDATE
      if (addedColumns.length > 0 || updatedColumns.length > 0) {
        const mergeArr = [
          ...addedColumns.map((i) => ({ ...i, columnId: null })),
          ...updatedColumns,
        ];
        await insertColumnAPI(mergeArr);
      }

      // DELETE
      if (removedColumns.length > 0) {
        const columnIds = removedColumns.map((c) => c.columnId);
        await removeColumnAPI(columnIds as number[]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setColumnModal(false));
      dispatch(setBoardLoad(false));
      setOpenColumnForm(false);
    }
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

        <Styled.BoardFormLists>
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
        </Styled.BoardFormLists>
        <Button label="+ Add Colums" onClick={onAddColumn} />
      </Styled.BoardFormBody>

      <Button
        label="Save Changes"
        onClick={onSaveColumn}
        disabled={
          disabledSaveBtn() &&
          storedBoardName.toLowerCase() === boardName.toLowerCase()
        }
      />
    </Styled.BoardFormContent>
  );
}
