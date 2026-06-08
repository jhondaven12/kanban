import * as Styled from "./topbar.styled";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Dispatch, SetStateAction, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/redux/slice/hook";
import { setBoardLoad, setColumnModal } from "@/app/redux/slice/boardSlice";
import { removeBoardAPI } from "@/app/api/board-api";

type TopbarProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Topbar({ setIsOpen }: TopbarProps) {
  const currentBoard = useAppSelector((state) => state.boardSlice);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);

  const onEditBoard = (): void => {
    setOpen(false);
    dispatch(setColumnModal(true));
  };

  const onDeleteBoard = async (): Promise<void> => {
    if (!currentBoard.boardId) return;

    try {
      dispatch(setBoardLoad(true));
      await removeBoardAPI(Number(currentBoard.boardId));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setBoardLoad(false));
      setOpen(false);
    }
  };

  return (
    <Styled.Topbar>
      <div>
        <h2>{currentBoard.boardName || "Welcome"}</h2>
      </div>

      <Styled.ButtonContainer>
        {currentBoard.boardId !== null && (
          <>
            <Styled.Button onClick={() => setIsOpen(true)}>
              + Add New Tasks
            </Styled.Button>

            <Styled.DotsButton>
              <HiOutlineDotsVertical onClick={() => setOpen((prev) => !prev)} />

              {open && (
                <Styled.ButtonMenu>
                  <Styled.Button onClick={onEditBoard}>Edit</Styled.Button>
                  <Styled.Button onClick={onDeleteBoard}>Delete</Styled.Button>
                </Styled.ButtonMenu>
              )}
            </Styled.DotsButton>
          </>
        )}
      </Styled.ButtonContainer>
    </Styled.Topbar>
  );
}
