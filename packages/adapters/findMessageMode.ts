import { IBuildCRUD, IMessageMode } from "../types";
import { ErrorFactory } from "aba-utils";

export function buildFindMessageMode(args: IBuildCRUD) {
  const { client } = args;
  const errorPath = "kalamToBot, adapters, findMessageMode";
  const essayQuery = `SELECT * FROM essay WHERE userId = :userId AND chatId = :chatId AND messageId = 00000000-0000-0000-0000-000000000000;`;
  const replyQuery = `SELECT * FROM essay WHERE userId = :userId AND chatId = :chatId AND messageId = 6946345f-07fd-4296-8ac4-72ce6c09eede;`;
  return async function findMessageMode(
    info: IMessageMode
  ): Promise<"essay" | "reply" | undefined> {
    let essayResult;
    let replyResult;
    try {
      essayResult = await client.execute(essayQuery, info, { prepare: true });
      replyResult = await client.execute(replyQuery, info, { prepare: true });
    } catch (error) {
      console.log(error);
    }
    if (essayResult?.rowLength === 0 && replyResult?.rowLength === 0) {
      return undefined;
    } else if (essayResult?.rowLength === 1) {
      return "essay";
    } else if (replyResult?.rowLength === 1) {
      return "reply";
    } else {
      throw new ErrorFactory({
        error: "mustBeUnique",
        message: "category step must be unique",
        detail: "maybe not updated properly, or chatId change",
        path: errorPath,
      });
    }
  };
}
