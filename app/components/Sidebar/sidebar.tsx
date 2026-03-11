"use client";
import { useState } from "react";
import * as Styled from "./sidebar.styled";
import { BsColumns } from "react-icons/bs";
import { BoardListsType } from "./interface";
import { Modal } from "@/app/UI/modal";
import { AddNewBoard } from "./Addnewboard/addNewBoard";

export default function Sidebar() {
  const [activeBoard, setActiveBoard] = useState<number>(1);
  const [isOpen, setIsOpen] = useState(false);
  const [boards, setBoard] = useState<BoardListsType[]>([
    { id: 1, boardName: "Board One" },
    { id: 2, boardName: "Board Two" },
    { id: 3, boardName: "Board Three" },
  ]);

  const BoardLists = () => {
    return (
      <ul>
        {boards.length > 0
          ? boards.map((item) => (
              <Styled.List
                key={item.id}
                $boardId={item.id}
                $activeBoard={activeBoard}
              >
                <Styled.Listlabel onClick={() => setActiveBoard(item.id)}>
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
