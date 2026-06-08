import { SubtaskListsType } from "./components/Content/content.type";

export type ColumnListsType = {
  boardId: number;
  columnId: number | string;
  columnName: string;
};

export type TaskInfoType = {
  taskId: number;
  title: string;
  description: string;
  subTasks: SubtaskListsType[];
};

export type BoardStateType = {
  boardId: number | null;
  boardName: string;
  boardColumn: ColumnListsType[];
  boardLoad: boolean;
  columnModal: boolean;
  editTasks: boolean;
  tasksInfo: TaskInfoType | null;
  taskColumnId: number | null;
};

export type BoardType = {
  boardId: number;
  boardName: string;
};
