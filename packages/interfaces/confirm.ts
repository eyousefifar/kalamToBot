import { EVENTConfirm } from "../controllers";
    import { TTelegramContext } from "../types";
    export async function confirm(ctx: TTelegramContext){
        try {
            await EVENTConfirm(ctx);
            await ctx.answerCbQuery();
            await ctx.editMessageReplyMarkup({inline_keyboard: [[{text: "تایید شده", callback_data: "exp"}]]})
        } catch(error) {
            console.log(error)
            ctx.reply("مشکلی پیش آمده");
        }
    }