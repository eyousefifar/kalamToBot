import { TTelegramContext } from "../types";
import { replyStep } from "../usecases";
export function buildEVENTReplyStep() {
  // TODO: inject any tool that's needed, like request cache
  return async function EVENTReplyStep(
    ctx: TTelegramContext,
    messageId: string
  ) {
    const userId = ctx.from?.id;
    const chatId = ctx.chat?.id;
    if (userId && chatId) {
      const result = await replyStep({ userId, chatId, repliesTo: messageId });
      return result;
    } else {
      throw new Error("fuuuuuuck")
    }
  };
}
