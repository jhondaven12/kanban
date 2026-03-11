import * as Styled from "./topbar.styled";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Dispatch, SetStateAction } from "react";

interface TopbarProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Topbar({ setIsOpen }: TopbarProps) {
  return (
    <Styled.Topbar>
      <div>
        <h2>Board One</h2>
      </div>

      <Styled.ButtonContainer>
        <Styled.Button onClick={() => setIsOpen(true)}>
          + Add New Tasks
        </Styled.Button>

        <Styled.DotsButton>
          <HiOutlineDotsVertical />
        </Styled.DotsButton>
      </Styled.ButtonContainer>
    </Styled.Topbar>
  );
}
