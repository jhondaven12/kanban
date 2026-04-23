export type SubtaskListsType = {
  taskId: number;
  subTaskId: number;
  subTask: string;
  subTaskStatus: boolean;
};

export type TaskListsType = {
  columnId: number;
  taskId: number;
  taskTitle: string;
  taskDescription: string;
  subTasks: SubtaskListsType[];
};
