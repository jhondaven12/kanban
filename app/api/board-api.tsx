import axios from "axios";
import { InsertBoard, InsertColumnType, InsertTaskType } from "./api.types";

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
    url: "/addBoards",
    method: "POST",
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

export const getTasksAPI = async () => {
  return await api({
    url: `/tasks`,
    method: "GET",
  });
};

export const insertTasksAPI = async (data: InsertTaskType) => {
  return await api({
    url: `/tasks`,
    method: "POST",
    data,
  });
};
