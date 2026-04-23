import * as Styled from "./topbar.styled";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Dispatch, SetStateAction } from "react";
import { useAppSelector } from "@/app/redux/slice/hook";

type TopbarProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Topbar({ setIsOpen }: TopbarProps) {
  const currentBoard = useAppSelector((state) => state.boardSlice);

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
              <HiOutlineDotsVertical />
            </Styled.DotsButton>
          </>
        )}
      </Styled.ButtonContainer>
    </Styled.Topbar>
  );
}
