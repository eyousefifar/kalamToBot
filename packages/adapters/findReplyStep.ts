import { IBuildCRUD, IReplyStep, IEssay } from "../types";
import { ErrorFactory } from "aba-utils";
// const replyStepId = "6946345f-07fd-4296-8ac4-72ce6c09eede";
export function buildFindReplyStep(args: IBuildCRUD) {
  const { client, rowToEssay } = args;
  const errorPath = "kalamToBot, adapters, findReplyStep";
  if (!rowToEssay)
    throw new ErrorFactory({
      error: "rowToEssayNotDefined",
      message: "row to essay function must be defined",
      path: errorPath,
    });
  const query = `SELECT * FROM essay WHERE userId = :userId AND chatId = :chatId AND category = :category AND
   messageId = 6946345f-07fd-4296-8ac4-72ce6c09eede`;
  return async function findReplyStep(
    info: IReplyStep
  ): Promise<IEssay | undefined> {
    let result;
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
        message: "category step line must be unique",
        detail: "maybe not updated properly, or chatId change",
        path: errorPath,
      });
    }
  };
}



