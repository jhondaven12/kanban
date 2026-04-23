export type ColumnListsType = {
  boardId: number;
  columnId: number | string;
  columnName: string;
};

export type BoardStateType = {
  boardId: number | null;
  boardName: string;
  boardColumn: ColumnListsType[];
  boardLoad: boolean;
};

export type BoardType = {
  boardId: number;
  boardName: string;
};
