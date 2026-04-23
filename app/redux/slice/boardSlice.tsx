import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ColumnListsType, BoardStateType, BoardType } from "@/app/types";

const initialState: BoardStateType = {
  boardId: null,
  boardName: "",
  boardColumn: [],
  boardLoad: false,
};

export const boardReducer = createSlice({
  name: "boardSlice",
  initialState,
  reducers: {
    setBoardName: (state, action: PayloadAction<BoardType>) => {
      const { boardId, boardName } = action.payload;

      state.boardId = boardId;
      state.boardName = boardName;
    },
    setBoardColumn: (state, action: PayloadAction<ColumnListsType[]>) => {
      state.boardColumn = action.payload;
    },
    setBoardLoad: (state, action: PayloadAction<boolean>) => {
      state.boardLoad = action.payload;
    },
  },
});

export const { setBoardName, setBoardColumn, setBoardLoad } =
  boardReducer.actions;

export const selectBoardSlice = (state: RootState) => state.boardSlice;

// Memoized Prevents unnecessary re-renders
export const selectBoardData = createSelector([selectBoardSlice], (board) => ({
  boardName: board.boardName,
  boardColumn: board.boardColumn,
  boardLoad: board.boardLoad,
}));

export default boardReducer.reducer;
