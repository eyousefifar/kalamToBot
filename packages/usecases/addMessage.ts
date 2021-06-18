import { makeEssay } from "../entities";
import { result, ErrorFactory, IResult } from "aba-utils";
import { IBuildAddMessage, IMessage } from "../types";

export function buildAddMessage(args: IBuildAddMessage) {
  const { findMessageNone, updateMessage, sendToChannel } = args;
  return async function addMessage(message: IMessage): Promise<void> {
    const exists = await findMessageNone(message);
    if (exists) {
      const essay = makeEssay(exists);
      essay.set.message(message.message);
      const updated = await updateMessage({
        userId: essay.get.userId(),
        chatId: essay.get.chatId(),
        category: essay.get.category(),
        message: essay.get.message() || "",
        messageId: essay.get.messageId() || "",
        tlgMessageId: essay.get.tlgMessageId() || -1,
        createdOn: essay.get.createdOn(),
        modifiedOn: essay.get.modifiedOn()
      });
      if (updated) {
        const sent = await sendToChannel({
          category: essay.get.category(),
          message: essay.get.message() || "",
          messageId: essay.get.messageId() || "",
          mode: "management",
        });
        // TODO : return result
      } else {
        console.log("not updated")
        // TODO: return error result;
      }
    }
  };
}
