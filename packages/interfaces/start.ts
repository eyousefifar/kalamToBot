import { EVENTStart } from "../controllers";
import { replyStep } from "./replyStep"
import { TTelegramContext } from "../types";
export async function start(ctx: TTelegramContext) {
  try {
    const input = ctx.message?.text?.split(" ");
    if(input && input.length === 1) {
      const result = await EVENTStart(ctx);
      ctx.reply(result.message, {
          reply_markup: {
             resize_keyboard: true,
             keyboard: [
              [{ text: "ارسال پست" }],
              [{ text: "درخواست ویژگی" }, { text: "پست های من" }],
            ]
          }
      })
    } else if(input && input.length === 2) {
      // * pass to replyStep interface;
      await replyStep(ctx,  input[1]);
    } else {
      ctx.reply("مشکلی پیش آمده");
    }
    
  } catch (error) {
    // TODO: log error or something
    console.log(error);
    ctx.reply("مشکلی پیش آمده");
  }
}
