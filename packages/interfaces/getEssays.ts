import { EVENTGetEssays } from "../controllers";
import { emoji } from "node-emoji";
import { TTelegramContext } from "../types";
export async function getEssays(ctx: TTelegramContext) {
  
  try {
    const result = await EVENTGetEssays(ctx);
    if (Array.isArray(result) && result.length > 0) {
      for (let index = 0; index < result.length; index++) {
        const { category, message, tlgMessageId } = result[index];
       
        if (message && tlgMessageId) {
          await ctx.reply(
            `#${category}
                
                ${message}`,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "دیدن پیام در کانال",
                      url: `https://t.me/kalaamto/${tlgMessageId}`,
                    },
                  ],
                ],
              },
            }
          );
        }
      }
    } else {
      ctx.reply(`هنوز پست تایید شده ای نداری ${emoji.slightly_frowning_face}`);
    }
    // TODO: set status code, return response
  } catch (error) {
    console.log(error);
    ctx.reply("مشکلی پیش آمده");
    // TODO: set status code, return response
  }
}
