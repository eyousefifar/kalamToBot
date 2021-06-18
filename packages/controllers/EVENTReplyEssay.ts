import { TTelegramContext } from "../types";
import { replyEssay } from "../usecases";
export function buildEVENTReplyEssay() {
  // TODO: inject any tool that's needed, like request cache
  return async function EVENTReplyEssay(ctx: TTelegramContext) {
    const userId = ctx.from?.id;
    const chatId = ctx.from?.id;
    const message = ctx.message?.text;
    const tlgMessageId = ctx.message?.message_id;
    if (userId && chatId && message && tlgMessageId) {
      const result = await replyEssay({
        userId,
        chatId,
        message,
        tlgMessageId,
      });
      return result;
    } else {
      throw new Error("reply essay controller: data must be defined");
    }
  };
}
