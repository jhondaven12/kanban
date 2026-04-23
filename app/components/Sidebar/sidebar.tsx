"use client";
import { useEffect, useState } from "react";
import * as Styled from "./sidebar.styled";
import { BsColumns } from "react-icons/bs";
import { Modal } from "@/app/UI/modal";
import { AddNewBoard } from "./Addnewboard/addNewBoard";
import { getBoardAPI } from "@/app/api/board-api";
import { useAppDispatch, useAppSelector } from "@/app/redux/slice/hook";
import { setBoardName } from "@/app/redux/slice/boardSlice";
import { BoardType } from "@/app/types";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const [activeBoard, setActiveBoard] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [boards, setBoards] = useState<BoardType[]>([]);

  const currentBoard = useAppSelector((state) => state.boardSlice);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBoardAPI();
        const firstBoard = response?.data[0]?.boardId ?? null;

        dispatch(
          setBoardName({
            boardId: response?.data[0]?.boardId ?? null,
            boardName: response?.data[0]?.boardName ?? "",
          }),
        );
        setBoards(response.data);
        setActiveBoard(firstBoard);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [currentBoard.boardLoad]);

  const handleOnClick = ({ boardId, boardName }: BoardType) => {
    dispatch(
      setBoardName({
        boardId,
        boardName,
      }),
    );
    setActiveBoard(boardId);
  };

  const BoardLists = () => {
    if (boards.length === 0)
      return (
        <ul style={{ textAlign: "center", padding: "10px" }}>
          No board exists
        </ul>
      );

    return (
      <ul>
        {boards.length > 0
          ? boards.map((item) => (
              <Styled.List
                key={item.boardId}
                $boardId={item.boardId}
                $activeBoard={activeBoard}
              >
                <Styled.Listlabel onClick={() => handleOnClick(item)}>
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
        <p>All BOARDS {`(${boards.length})`}</p>
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
          <AddNewBoard setIsOpen={setIsOpen} />
        </Modal>
      )}
    </Styled.LeftSide>
  );
}
