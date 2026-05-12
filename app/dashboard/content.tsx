"use client";

import { useEffect, useState } from "react";
import * as Styled from "./dashboard.styled";
import Content from "../components/Content/content";
import Sidebar from "../components/Sidebar/sidebar";
import Topbar from "../components/Topbar/topbar";
import { Modal } from "../UI/modal";
import { AddnewTaskForm } from "./form";
import { useAppDispatch, useAppSelector } from "../redux/slice/hook";
import { Loading } from "../UI/loading";
import { setEditTasks, setTasksInfo } from "../redux/slice/boardSlice";

export function DashboardContent() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const currentBoard = useAppSelector((state) => state.boardSlice);

  // OPEN MODAL IF editTasks is true
  useEffect(() => {
    setIsOpen(!!currentBoard.editTasks);
  }, [currentBoard?.editTasks]);

  console.log("currentBoard.editTasks", currentBoard.editTasks);

  // CLOSE MODAL
  const onCloseModal = () => {
    setIsOpen(false);
    dispatch(setEditTasks(false));
    dispatch(setTasksInfo(null));
  };

  const modalTitle = currentBoard?.editTasks
    ? "Edit Task and Subtasks"
    : "Add new task";

  return (
    <Styled.Main>
      <Styled.Main>
        <Sidebar />
        <Styled.RightSide>
          <Topbar setIsOpen={setIsOpen} />
          <Content />
        </Styled.RightSide>

        {isOpen && (
          <Modal title={modalTitle} width="550px" onClose={onCloseModal}>
            <AddnewTaskForm setIsOpen={setIsOpen} />
          </Modal>
        )}
        {currentBoard.boardLoad && <Loading />}
      </Styled.Main>
    </Styled.Main>
  );
}
