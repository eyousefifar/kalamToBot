import { ErrorFactory } from "aba-utils";
import { IBuildCRUD, IFindUserMessages } from "../types";

export function buildFindUserMessages(args: IBuildCRUD) {
  const { client, rowToEssay } = args;
  const errorPath = "kalamToBot, adapters, findUserMessages";
  if (!rowToEssay)
    throw new ErrorFactory({
      error: "rowToEssayNotDefined",
      message: "row to essay function must be defined",
      path: errorPath,
    });
  const query = `SELECT * FROM essay WHERE userId = :userId AND chatId = :chatId LIMIT 10`;
  return async function findUserMessages(info: IFindUserMessages) {
    let result;
    try {
      result = await client.execute(query, info, { prepare: true });
      if(result && result.rowLength === 0) {
          return undefined;
      } else if(result && result.rowLength > 0) {
        const essays = [];
        for (let index = 0; index < result.rowLength; index++) {
            if(result.rows[index].get("confirmed")){
              essays.push(rowToEssay(result.rows[index]));
            }
            
            
        }
        return essays;
      } else {
        return undefined;
      } 
    } catch (error) {
      console.log(error);
    }
  };
}
