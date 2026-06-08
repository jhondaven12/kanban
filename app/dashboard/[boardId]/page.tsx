import { use } from "react";
export default function BoardContent({
  params,
}: {
  params: Promise<{ boardId: string }>;
}) {
  const { boardId } = use(params);

  return <h2>Sample Board {`${boardId}`}</h2>;
}
