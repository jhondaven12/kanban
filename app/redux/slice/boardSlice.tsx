import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  ColumnListsType,
  BoardStateType,
  BoardType,
  TaskInfoType,
} from "@/app/types";

const initialState: BoardStateType = {
  boardId: null,
  boardName: "",
  boardColumn: [],
  boardLoad: false,
  editTasks: false,
  tasksInfo: null,
  taskColumnId: null,
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
    setEditTasks: (state, action: PayloadAction<boolean>) => {
      state.editTasks = action.payload;
    },
    setTasksInfo: (state, action: PayloadAction<TaskInfoType | null>) => {
      state.tasksInfo = action.payload;
    },
    setTaskColumnId: (state, action: PayloadAction<number | null>) => {
      state.taskColumnId = action.payload;
    },
  },
});

export const {
  setBoardName,
  setBoardColumn,
  setBoardLoad,
  setEditTasks,
  setTasksInfo,
  setTaskColumnId,
} = boardReducer.actions;

export const selectBoardSlice = (state: RootState) => state.boardSlice;

// Memoized Prevents unnecessary re-renders
export const selectBoardData = createSelector([selectBoardSlice], (board) => ({
  boardName: board.boardName,
  boardColumn: board.boardColumn,
  boardLoad: board.boardLoad,
  editTasks: board.editTasks,
  tasksInfo: board.tasksInfo,
  taskColumnId: board.taskColumnId,
}));

export default boardReducer.reducer;
