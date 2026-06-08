import axios from "axios";
import {
  InsertBoard,
  InsertColumnType,
  InsertTaskType,
  ModifyTaskColumnType,
  ModifyTaskType,
  SubtasksType,
} from "./api.types";
import { BoardType } from "../types";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

export const getBoardAPI = async () => {
  return await api({
    url: "/boards",
    method: "GET",
  });
};

export const insertBoardAPI = async (data: InsertBoard) => {
  return await api({
    url: "/insertBoard",
    method: "POST",
    data,
  });
};

export const removeBoardAPI = async (params: number) => {
  return await api({
    url: `/removeBoard/${params}`,
    method: "delete",
  });
};

export const modifyBoardAPI = async (data: BoardType) => {
  return await api({
    url: "/modifyBoard",
    method: "PUT",
    data,
  });
};

export const getColumnAPI = async (params: number) => {
  return await api({
    url: `/columns/${params}`,
    method: "GET",
  });
};

export const insertColumnAPI = async (data: InsertColumnType[]) => {
  return await api({
    url: `/modifyColumns`,
    method: "POST",
    data,
  });
};

export const removeColumnAPI = async (data: number[]) => {
  return await api({
    url: `/removeColumns`,
    method: "POST",
    data,
  });
};

export const getTasksAPI = async (boardId: number) => {
  return await api({
    url: `/tasks/${boardId}`,
    method: "GET",
  });
};

export const insertTasksAPI = async (data: InsertTaskType) => {
  return await api({
    url: `/insertTasks`,
    method: "POST",
    data,
  });
};

export const modifyTasksAPI = async (data: ModifyTaskType) => {
  return await api({
    url: `/modifyTasks`,
    method: "PUT",
    data,
  });
};

export const removeTaskAPI = async (params: number) => {
  return await api({
    url: `removeTasks/${params}`,
    method: "delete",
  });
};

export const modifyTaskColumnAPI = async (data: ModifyTaskColumnType) => {
  return await api({
    url: `/modifyTaskColumn`,
    method: "PUT",
    data,
  });
};

export const getSubTasksAPI = async (id: number) => {
  return await api({
    url: `/getSubTasks/${id}`,
    method: "GET",
  });
};

export const inertSubTasksAPI = async (data: SubtasksType[]) => {
  return await api({
    url: `insertSubTasks`,
    method: "POST",
    data,
  });
};

export const modifySubTasksAPI = async (data: SubtasksType[]) => {
  return await api({
    url: `/modifySubTasks`,
    method: "PUT",
    data,
  });
};

export const removeSubTasksAPI = async (data: number[]) => {
  return await api({
    url: `removeSubTasks`,
    method: "DELETE",
    data,
  });
};
