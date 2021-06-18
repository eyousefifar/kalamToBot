import { IBuildCRUD, ICategoryStep, IEssay } from "../types";
import { ErrorFactory } from "aba-utils";

export function buildFindCategoryStep(args: IBuildCRUD) {
  const { client, rowToEssay } = args;
  const errorPath = "kalamToBot, adapters, findCategoryStep";
  if (!rowToEssay)
    throw new ErrorFactory({
      error: "rowToEssayNotDefined",
      message: "row to essay function must be defined",
      path: errorPath,
    });
  const query = `SELECT * FROM essay WHERE userId = :userId AND chatId = :chatId AND category = :category AND messageId = 00000000-0000-0000-0000-000000000000;`;
  return async function findCategoryStep(
    info: ICategoryStep
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
        message: "category step must be unique",
        detail: "maybe not updated properly, or chatId change",
        path: errorPath,
      });
    }
  };
}
