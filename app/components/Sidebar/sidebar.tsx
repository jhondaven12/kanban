"use client";
import { useEffect, useState } from "react";
import * as Styled from "./sidebar.styled";
import { BsColumns } from "react-icons/bs";
import { BoardListsType } from "./interface";
import { Modal } from "@/app/UI/modal";
import { AddNewBoard } from "./Addnewboard/addNewBoard";
import { getBoardAPI } from "@/app/api/board-api";

type Props = {
  setBoardId: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function Sidebar({ setBoardId }: Props) {
  const [activeBoard, setActiveBoard] = useState<number>(1);
  const [isOpen, setIsOpen] = useState(false);
  const [boards, setBoards] = useState<BoardListsType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBoardAPI();
        setBoards(response.data);

        const firstBoard = response?.data[0]?.boardId ?? null;
        setActiveBoard(firstBoard);
        setBoardId(firstBoard);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleOnClick = (boardId: number) => {
    setActiveBoard(boardId);
    setBoardId(boardId);
  };

  const BoardLists = () => {
    return (
      <ul>
        {boards.length > 0
          ? boards.map((item) => (
              <Styled.List
                key={item.boardId}
                $boardId={item.boardId}
                $activeBoard={activeBoard}
              >
                <Styled.Listlabel onClick={() => handleOnClick(item.boardId)}>
                  <BsColumns style={{ margin: "4px" }} />
                  {item.boardName}
                </Styled.Listlabel>
              </Styled.List>
            ))
          : "No board is exist"}
      </ul>
    );
  };

  return (
    <Styled.LeftSide>
      <h2>
        DEV <b>{"< / >"}</b>
      </h2>

      <Styled.ListContainer>
        <p>All BOARDS (3)</p>
        <BoardLists />

        <Styled.AddboardBtn onClick={() => setIsOpen(true)}>
          <BsColumns style={{ margin: "4px" }} />
          <p>+ Create New Board</p>
        </Styled.AddboardBtn>
      </Styled.ListContainer>

      {isOpen && (
        <Modal
          title="Add new board"
          width="550px"
          onClose={() => setIsOpen(false)}
        >
          <AddNewBoard />
        </Modal>
      )}
    </Styled.LeftSide>
  );
}
