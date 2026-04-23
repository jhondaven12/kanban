import { ColumnListsType } from "../types";

export const verifyChangesById = (
  storedArr: ColumnListsType[],
  currentArr: ColumnListsType[],
) => {
  const addedColumns = currentArr.filter(
    (n) => !storedArr.some((o) => o.columnId === n.columnId),
  );

  const updatedColumns = currentArr.filter((n) => {
    const existing = storedArr.find((o) => o.columnId === n.columnId);
    return existing && existing.columnName !== n.columnName;
  });

  const removedColumns = storedArr.filter(
    (o) => !currentArr.some((n) => n.columnId === o.columnId),
  );

  return { addedColumns, updatedColumns, removedColumns };
};
