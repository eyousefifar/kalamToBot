import { EVENTReplyStep } from "../controllers";
import { TTelegramContext } from "../types";
export async function replyStep(ctx: TTelegramContext, messageId: string) {
  try {
    const result = await EVENTReplyStep(ctx, messageId);
    if (result) {
      const message = `پیام مورد نظر شما:
                #${result.get.category()}
                
                ${result.get.message()}
                
                پاسخ خود را بنویسید:`;
      ctx.reply(message, {
        reply_markup: {
          resize_keyboard: true,
          keyboard: [[{ text: "لغو" }]],
        },
      });
    }
  } catch (error) {
    // TODO: set status code, return response
    ctx.reply("مشکلی پیش آمده");
  }
}
