import { RawAxiosRequestHeaders } from "axios";

type axiosType = {
  baseUrl: string;
  timeout: number;
  headers: RawAxiosRequestHeaders;
};

type BoardType = {
  boardId: number;
  boardName: string;
};

type ColumnName = {
  columnName: string;
};

export type InsertBoard = {
  boardName: string;
  columns: ColumnName[];
};

export type InsertColumnType = {
  boardId: number;
  columnId: number | null | string;
  columnName: string;
};

export type SubtasksType = {
  taskId?: number;
  subTaskStatus?: boolean;
  subTaskId?: number;
  subTask: string;
};

export type InsertTaskType = {
  boardId: number | null;
  columnId: number | null;
  taskTitle: string;
  taskDescription: string;
  subTasks: SubtasksType[];
};

export type ModifyTaskType = {
  taskId: number;
  taskTitle: string;
  taskDescription: string;
  subTasks: SubtasksType[];
};

export type ModifyTaskColumnType = {
  taskId: number;
  columnId: number;
};
