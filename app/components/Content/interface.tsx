export type ContentProps = {
  boardId: number | null;
};

export type StatuslistsProps = {
  statusId: number;
  statusName: string;
};

export type ColumnListsType = {
  boardId: number;
  columnId: number;
  columnName: string;
};

export type SubtaskListsType = {
  taskId: number;
  subTaskId: number;
  subTasks: string;
  subTaskStatus: boolean;
};

export type TaskListsType = {
  columnId: number;
  taskId: number;
  taskTitle: string;
  taskSubtitle: string;
  subTasks: SubtaskListsType;
};
