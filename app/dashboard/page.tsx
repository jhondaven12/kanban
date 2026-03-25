"use client";

import { useState } from "react";
import Content from "../components/Content/content";
import Sidebar from "../components/Sidebar/sidebar";
import Topbar from "../components/Topbar/topbar";
import { Modal } from "../UI/modal";
import * as Styled from "./dashboard.styled";
import { AddnewTaskForm } from "./form";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [boardId, setBoardId] = useState<number | null>(null); // tobe move to redux

  return (
    <Styled.Main>
      <Sidebar setBoardId={setBoardId} />

      <Styled.RightSide>
        <Topbar setIsOpen={setIsOpen} />
        <Content boardId={boardId} />
      </Styled.RightSide>

      {isOpen && (
        <Modal
          title="Add new task"
          width="550px"
          onClose={() => setIsOpen(false)}
        >
          <AddnewTaskForm />
        </Modal>
      )}
    </Styled.Main>
  );
}
