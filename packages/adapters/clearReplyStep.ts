import { IBuildCRUD,  TClearReplyStep } from "../types";

export function buildClearReplyStep(args: IBuildCRUD) {
  const { client } = args;
  const selectQuery = `SELECT * FROM essay WHERE userId = :userId and chatId = :chatId and messageId = 6946345f-07fd-4296-8ac4-72ce6c09eede;`;
  const deleteQuery = `DELETE FROM essay WHERE userId = :userId and chatId = :chatId and category = :category and messageId = 6946345f-07fd-4296-8ac4-72ce6c09eede;`;
  return async function clearReplyStep(info: TClearReplyStep) {
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
