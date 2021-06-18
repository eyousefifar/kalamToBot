






import { IBuildCRUD, IUpdateConfirm } from "../types";
import { ErrorFactory } from "aba-utils";

export function buildUpdateConfirm(args: IBuildCRUD) {
  const { client, findByMessageId } = args;
  if (!findByMessageId)
    throw new ErrorFactory({
      error: "findByMessageIdNotDefined",
      message: "findByMessageId function must be defined",
      path: "kalamToBot, adapters, updateConfirm",
    });
  
  const query = `UPDATE essay SET confirmed = :confirmed, tlgMessageId = :tlgMessageId WHERE userId = :userId and chatId = :chatId and 
  category = :category and messageId = :messageId`;
  return async function updateConfirm(info: IUpdateConfirm) {
    const { confirmed, messageId, tlgMessageId } = info;
    const essay = await findByMessageId(messageId);
    if(essay){
      let result;
      const { userId, chatId,category } = essay;
      const  params = {
        userId,
        chatId,
        category,
        messageId,
        confirmed,
        tlgMessageId
      }
    try {
      result = await client.execute(query, params,{ prepare: true });
      return !!result;
    } catch (error) {
      console.log(error);
    }
    }else throw new ErrorFactory({
      error: "essayNotFound",
      message: "essay not found in database"
    })  
    
  };
}
