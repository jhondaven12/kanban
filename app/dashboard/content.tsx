"use client";

import { useState } from "react";
import * as Styled from "./dashboard.styled";
import Content from "../components/Content/content";
import Sidebar from "../components/Sidebar/sidebar";
import Topbar from "../components/Topbar/topbar";
import { Modal } from "../UI/modal";
import { AddnewTaskForm } from "./form";
import { useAppSelector } from "../redux/slice/hook";
import { Loading } from "../UI/loading";

export function DashboardContent() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const boardLoad = useAppSelector((state) => state.boardSlice.boardLoad);

  return (
    <Styled.Main>
      <Styled.Main>
        <Sidebar />

        <Styled.RightSide>
          <Topbar setIsOpen={setIsOpen} />
          <Content />
        </Styled.RightSide>

        {isOpen && (
          <Modal
            title="Add new task"
            width="550px"
            onClose={() => setIsOpen(false)}
          >
            <AddnewTaskForm setIsOpen={setIsOpen} />
          </Modal>
        )}

        {boardLoad && <Loading />}
      </Styled.Main>
    </Styled.Main>
  );
}
