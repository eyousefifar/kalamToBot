import { EVENTAddCategoryStep } from "../controllers";
import { TTelegramContext } from "../types";
export async function addCategoryStep(ctx: TTelegramContext) {
  try {
    const result = await EVENTAddCategoryStep(ctx);
    if (result) {
      ctx.reply("پستت رو بنویس", {
        reply_markup: {
          resize_keyboard: true,
          keyboard: [[{ text: "لغو" }]],
        },
      });
    } else {
      ctx.reply("مشکلی پیش آمده");
    }
  } catch (error) {
    // TODO: log error or something
    ctx.reply("مشکلی پیش آمده");
  }
}
