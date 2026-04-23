import { RawAxiosRequestHeaders } from "axios";

type axiosType = {
  baseUrl: string;
  timeout: number;
  headers: RawAxiosRequestHeaders;
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

type SubtasksType = {
  subTask: string;
};

export type InsertTaskType = {
  columnId: number | null;
  taskTitle: string;
  taskDescription: string;
  subTasks: SubtasksType[];
};
