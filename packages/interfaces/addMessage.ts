import { EVENTAddMessage } from "../controllers";
import { emoji } from "node-emoji";
import { TTelegramContext } from "../types";
export async function addMessage(ctx: TTelegramContext) {
  try {
    await EVENTAddMessage(ctx);
    ctx.reply(`در صف انتشار قرار گرفت ${emoji.smile}
    
    آدرس کانال: @kalaamto`, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [
          [{ text: "ارسال پست" }],
          [{ text: "درخواست ویژگی" }, { text: "پست های من" }],
        ],
      },
    });
  } catch (error) {
    // TODO: log error or something
    console.log(error);
    ctx.reply("مشکلی پیش آمده");
  }
}
