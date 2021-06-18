import { createReadStream } from "fs";
import { TTelegramContext } from "../types";
import { emoji } from "node-emoji";
import { join } from "path";

export async function futureRequest(ctx: TTelegramContext) {
  const caption = `مرسی که به بهتر شدن ما کمک میکنی
  کلام تو رو برای خودت ساختیم ${emoji.heart_eyes}
  هرچی که نیاز داری رو میتونی به آی دی زیر بفرستی
  میتونه یه پیام یا ویس باشه، راحت باش ${emoji.hearts}
  @kalamToManager`;
  const sent = await ctx.replyWithPhoto("AgACAgQAAxkDAAIDSV9fkXxVKddG-QABbJEioz-2bJPozgACVbUxGzg7AVMvCb3-QUviJMnU0iJdAAMBAAMCAAN3AAOHBAYAARsE",
    { caption }
  );
}
