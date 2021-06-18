import { ErrorFactory } from "aba-utils";
import { addCategoryStep } from "../usecases";
import { TTelegramContext } from "../types";

export function buildEVENTAddCategoryStep() {
  // TODO: inject any tool that's needed, like request cache
  return async function EVENTAddCategoryStep(ctx: TTelegramContext) {
    const userId = ctx.from?.id;
    const chatId = ctx.chat?.id;
    const messageText = ctx.message?.text;
    if (userId && chatId && messageText) {
      const result = await addCategoryStep({
        userId,
        chatId,
        category: messageText,
      });
      return result;
    } else {
      throw new ErrorFactory({
        error: "dataNotDefined",
        message: "userId, chatId and category in telegram must be define",
        path: "kalamToBot, controllers, EVENTStart",
      });
    }
  };
}
