import { IBuildCRUD, IUpdateMessage } from "../types";

export function buildUpdateMessage(args: IBuildCRUD) {
  const { client } = args;
  const essayDeleteQuery = `DELETE FROM essay WHERE userId = :userId and chatId = :chatId and 
    category = :category and messageId = 00000000-0000-0000-0000-000000000000;`;
  const replyDeleteQuery = `DELETE FROM essay WHERE userId = :userId and chatId = :chatId and 
  category = :category and messageId = 6946345f-07fd-4296-8ac4-72ce6c09eede`;
  const insertEssayQuery = `INSERT INTO essay (userId, chatId, category, messageId, tlgMessageId, message, confirmed, createdOn, modifiedOn)
    VALUES (:userId, :chatId, :category, :messageId, :tlgMessageId , :message, false, :createdOn, :modifiedOn)`;
  const insertReplyQuery = `INSERT INTO essay (userId, chatId, category, messageId, tlgMessageId, message, confirmed, repliesTo ,createdOn, modifiedOn)
  VALUES (:userId, :chatId, :category, :messageId, :tlgMessageId , :message, false, :repliesTo ,:createdOn, :modifiedOn)`
  return async function updateMessage(info: IUpdateMessage) {
    const { userId, chatId, category, reply } = info;
    const deleteParams = {
      userId,
      chatId,
      category,
    };
    const deleteQuery = reply ? replyDeleteQuery : essayDeleteQuery;
    const insertQuery = reply ? insertReplyQuery : insertEssayQuery;
    const queries = [
      { query: deleteQuery, params: deleteParams },
      { query: insertQuery, params: info },
    ];
    let result;
    try {
      result = await client.batch(queries, { prepare: true });
      return !!result;
    } catch (error) {
      console.log(error);
    }
  };
}
