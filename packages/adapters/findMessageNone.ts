import { IBuildCRUD, IMessageNone, IEssay } from "../types";
import { ErrorFactory } from "aba-utils";

export function buildFindMessageNone(args: IBuildCRUD) {
  const { client, rowToEssay } = args;
  const errorPath = "kalamToBot, adapters, findMessageNone";
  if (!rowToEssay)
    throw new ErrorFactory({
      error: "rowToEssayNotDefined",
      message: "row to essay function must be defined",
      path: errorPath,
    });
  const essayQuery = `SELECT * FROM essay WHERE userId = :userId AND chatId = :chatId AND messageId = 00000000-0000-0000-0000-000000000000;`;
  const replyQuery = `SELECT * FROM essay WHERE userId = :userId AND chatId = :chatId AND messageId = 6946345f-07fd-4296-8ac4-72ce6c09eede;`;
  return async function findMessageNone(
    info: IMessageNone
  ): Promise<IEssay | undefined> {
    const { reply } = info;
    let result;
    const query = reply ? replyQuery : essayQuery;
    try {
      result = await client.execute(query, info, { prepare: true });
    } catch (error) {
      console.log(error);
    }
    if (result?.rowLength === 0) {
      return undefined;
    } else if (result?.rowLength === 1) {
      return rowToEssay(result.rows[0]);
    } else {
      throw new ErrorFactory({
        error: "mustBeUnique",
        message: "essay must be unique",
        detail: "maybe not updated properly, or chatId change",
        path: errorPath,
      });
    }
  };
}
