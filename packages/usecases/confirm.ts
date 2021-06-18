import { makeEssay } from "../entities";
// import { result, errorFactory, IResult } from "aba-utils";
import { IBuildConfirm } from "../types";

export function buildConfirm(args: IBuildConfirm) {
  const { findByMessageId, sendToChannel, updateConfirm, sendToChat } = args;
  return async function confirm(messageId: string): Promise<boolean> {
    const exists = await findByMessageId(messageId);
    const isReply = exists?.repliesTo ? await findByMessageId(exists?.repliesTo) : undefined;
    if (exists) {
      const essay = makeEssay(exists);
      essay.set.confirm();
      const sent = await sendToChannel({
        messageId: essay.get.messageId() || "",
        message: essay.get.message() || "",
        category: essay.get.category(),
        mode: "primaryChannel",
        reply: isReply ? true : false,
        replyId: isReply?.tlgMessageId
      });
      
      if (sent) {
        essay.set.tlgMessageId(sent.message_id);
        
        const result = await updateConfirm({
          messageId: essay.get.messageId() || "",
          confirmed: essay.get.confirmed(),
          tlgMessageId: essay.get.tlgMessageId() || -1
        });
        if(result && isReply) {
          const sentToChat = await sendToChat({
            chatId: isReply.chatId,
            message: isReply.message || "",
            category: isReply.category,
            reply: true,
            replyMessage: exists.message,
            replyMessageId: exists.messageId
          })
        }
        return result ? true : false;
      } else return false; 
    } else return false;
  };
}
