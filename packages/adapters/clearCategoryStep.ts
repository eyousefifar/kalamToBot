import { IBuildCRUD, IClearCategoryStep } from "../types";

export function buildClearCategoryStep(args: IBuildCRUD) {
  const { client } = args;
  const selectQuery = `SELECT * FROM essay WHERE userId = :userId and chatId = :chatId and messageId = 00000000-0000-0000-0000-000000000000;`;
  const deleteQuery = `DELETE FROM essay WHERE userId = :userId and chatId = :chatId and category = :category and messageId = 00000000-0000-0000-0000-000000000000;`;
  return async function clearCategoryStep(info: IClearCategoryStep) {
    const { userId, chatId } = info;
    const foundResults = await client.execute(selectQuery,  info, {prepare: true});
    if(foundResults.rowLength !== 0) {
      const deleteParams = [];
    for (let index = 0; index < foundResults.rowLength; index++) {
     
        const params = {
            userId,
            chatId,
            category: foundResults.rows[index].get("category"),
        }
        deleteParams.push({query: deleteQuery, params});    
    }
    const deleteResult = await client.batch(deleteParams, {prepare: true});
    return !!deleteResult;
    } else {
      return true;
    }
    
  };
}
