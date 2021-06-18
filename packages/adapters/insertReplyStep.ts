import { IBuildCRUD,  IInsertReplyStep } from "../types";

export function buildInsertReplyStep(args: IBuildCRUD) {
  const { client } = args;
  const query = `INSERT INTO essay (userId, chatId, category, messageId, repliesTo ,createdOn, modifiedOn)
  VALUES (:userId, :chatId, :category, 6946345f-07fd-4296-8ac4-72ce6c09eede, :repliesTo, :createdOn, :modifiedOn);`;
  return async function insertReplyStep(
    info: IInsertReplyStep
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
