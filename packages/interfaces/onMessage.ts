import { findMessageMode } from "../adapters";
import { TTelegramContext } from "../types";
import { addMessage } from "./addMessage";
import { replyEssay } from "./replyEssay";

export async function onMessage(ctx: TTelegramContext) {
  const userId = ctx.from?.id;
  const chatId = ctx.chat?.id;
  if (userId && chatId) {
    const mode = await findMessageMode({ userId, chatId });
    if (mode === "essay") {
      await addMessage(ctx);
    } else if (mode === "reply") {
      await replyEssay(ctx);
    } else {
      ctx.reply("مشکلی پیش آمده");
    }
  } else {
    ctx.reply("مشکلی پیش آمده");
  }
}
