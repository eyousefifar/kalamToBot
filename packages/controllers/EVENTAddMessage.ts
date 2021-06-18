import { TTelegramContext } from "../types";
import { addMessage } from "../usecases";
export function buildEVENTAddMessage() {
  // TODO: inject any tool that's needed, like request cache
  return async function EVENTAddMessage(ctx: TTelegramContext) {
    const userId = ctx.from?.id;
    const chatId = ctx.chat?.id;
    const messageText = ctx.message?.text;
    const tlgMessageId = ctx.message?.message_id;
    if (userId && chatId && messageText && tlgMessageId) { 
      try {
        const result = await addMessage({userId, chatId, message: messageText, tlgMessageId});        
      } catch (error) {
        console.log(error)
      }

    }
  };
}
