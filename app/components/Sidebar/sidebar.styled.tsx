import styled from "styled-components";

export const LeftSide = styled.div`
  width: 15%;
  border-right: 1px solid var(--defaultfont);
`;

export const BoardName = styled.h2`
  display: flex;
  align-items: center;
  padding-left: 10px;
  font-size: clamp(12px, 2vw, 18px);
  font-weight: normal;
  color: white;
  border-bottom: 1px solid gray;
  height: 70px;

  b {
    margin-left: 10px;
    color: var(--colorTomato);
  }
`;

export const ListContainer = styled.div`
  padding: 15px;

  ul {
    list-style: none;
    padding: 0;
    margin: 15px auto 0;
  }
`;

export const BoardQuantity = styled.div`
  p {
    font-size: 12px;
    letter-spacing: 1.2px;
    color: darkgray;
  }
`;

interface ListsPorps {
  $boardId: number;
  $activeBoard: number;
}

export const List = styled.li<ListsPorps>`
  position: relative;
  font-weight: 800;
  margin-bottom: 10px;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -10px;
    width: ${({ $boardId, $activeBoard }) =>
      $boardId === $activeBoard ? "2%" : "0%"};
    height: 100%;
    background-color: var(--colorTomato);
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    z-index: -1;
    transition: 0.3s ease-in-out;
  }

  &:hover {
    &::after {
      width: "2%";
    }
  }
`;

export const Listlabel = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  padding: 5px 0;

  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
  }
`;

export const AddboardBtn = styled.button`
  all: unset;
  position: relative;
  display: flex;
  gap: 4px;
  align-items: center;
  color: tomato;
  padding: 5px 0;

  p {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: normal;
  }
`;
