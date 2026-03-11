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

  return (
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
          <AddnewTaskForm />
        </Modal>
      )}
    </Styled.Main>
  );
}
