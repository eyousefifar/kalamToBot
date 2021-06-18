import { TTelegramContext } from "../types";

export function cancel(ctx: TTelegramContext) {
    // should save user and chat id when sending the post
    ctx.reply("میتونی هرچی میخوایی انتخاب کنی", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: "ارسال پست" }],
            [{ text: "درخواست ویژگی" }, { text: "پست های من" }],
          ],
      },
    });
  }
  