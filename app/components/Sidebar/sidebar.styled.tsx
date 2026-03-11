import styled from "styled-components";

export const LeftSide = styled.div`
  width: 15%;
  padding: 10px;
  border-right: 1px solid var(--defaultfont);

  h2 {
    text-align: center;
    margin-top: 15px;
  }

  b {
    color: var(--colorTomato);
  }
`;

export const ListContainer = styled.div`
  margin-top: 40px;

  p {
    font-size: 12px;
    margin-left: 15px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 15px auto 0;
  }
`;

interface ListsPorps {
  $boardId: number;
  $activeBoard: number;
}

export const List = styled.li<ListsPorps>`
  position: relative;
  padding: 10px;
  font-weight: 800;
  margin-bottom: 10px;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -10px;
    width: ${({ $boardId, $activeBoard }) =>
      $boardId === $activeBoard ? "100%" : "0%"};
    height: 100%;
    background-color: var(--colorTomato);
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    z-index: -1;
    transition: 0.3s ease-in-out;
  }

  &:hover {
    &::after {
      width: 100%;
    }
  }
`;

export const Listlabel = styled.div`
  position: relative;
  display: flex;
  gap: 10px;
`;

export const AddboardBtn = styled.button`
  all: unset;
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 10px;
  color: tomato;

  p {
    font-size: 14px;
    font-weight: 800;
    letter-spacing: normal;
  }
`;
