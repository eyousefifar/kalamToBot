import { makeEssay } from "../entities";
import { IBuildReplyEssay, IMessage } from "../types";

export function buildReplyEssay(args: IBuildReplyEssay) {
  const { findMessageNone, sendToChannel, updateMessage } = args;
  return async function replyEssay(message: IMessage): Promise<boolean | undefined> {
    const exists = await findMessageNone({ ...message, reply: true });
    if (exists) {
      const reply = makeEssay(exists);
      reply.set.message(message.message);
      const updated = await updateMessage({
        userId: reply.get.userId(),
        chatId: reply.get.chatId(),
        category: reply.get.category(),
        message: reply.get.message() || "",
        messageId: reply.get.messageId() || "",
        tlgMessageId: reply.get.tlgMessageId() || -1,
        createdOn: reply.get.createdOn(),
        modifiedOn: reply.get.modifiedOn(),
        reply: true,
        repliesTo: reply.get.repliesTo()
      });
      if (updated) {
        const sent = await sendToChannel({
          category: reply.get.category(),
          message: reply.get.message() || "",
          messageId: reply.get.messageId() || "",
          mode: "management",
        });
        return sent ? true : false;
      }
    }
  };
}
