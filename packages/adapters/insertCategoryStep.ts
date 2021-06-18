import { IBuildCRUD, IInsertCategoryStep } from "../types";

export function buildInsertCategoryStep(args: IBuildCRUD) {
  const { client } = args;
  const query = `INSERT INTO essay (userId, chatId, category, messageId, createdOn, modifiedOn) 
  VALUES (:userId, :chatId, :category, 00000000-0000-0000-0000-000000000000, :createdOn, :modifiedOn);`;
  
  return async function insertCategoryStep(
    info: IInsertCategoryStep
  ): Promise<true | undefined> {
    let result;
    try {
      result = await client.execute(query, info, { prepare: true });
      return !!result;
    } catch (error) {
      console.log(error);
    }
  };
}
