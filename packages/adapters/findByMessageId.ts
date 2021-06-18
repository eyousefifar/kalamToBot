import { IBuildCRUD,  IEssay } from "../types";
import { ErrorFactory } from "aba-utils";

export function buildFindByMessageId(args: IBuildCRUD) {
  const { client, rowToEssay } = args;
  const errorPath = "kalamToBot, adapters, findByMessageId";
  if (!rowToEssay)
    throw new ErrorFactory({
      error: "rowToEssayNotDefined",
      message: "row to essay function must be defined",
      path: errorPath,
    });
  const query = `SELECT * FROM essay WHERE  messageId = :messageId;`;
  return async function findByMessageId(
    messageId:string
  ): Promise<IEssay | undefined> {
    let result;
    try {
      result = await client.execute(query, {messageId}, { prepare: true });
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
        message: "category step line must be unique",
        detail: "maybe not updated properly, or chatId change",
        path: errorPath,
      });
    }
  };
}
