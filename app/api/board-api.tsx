import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

export const getBoardAPI = async () => {
  return await api({
    url: "/api/boards",
    method: "GET",
  });
};

export const getColumnAPI = async (params: number) => {
  return await api({
    url: `/api/columns/${params}`,
    method: "GET",
  });
};

export const getTasksAPI = async () => {
  return await api({
    url: `/api/tasks`,
    method: "GET",
  });
};
