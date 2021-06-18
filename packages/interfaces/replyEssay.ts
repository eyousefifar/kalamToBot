import { EVENTReplyEssay } from "../controllers";
    import { TTelegramContext } from "../types";
    export async function replyEssay(ctx: TTelegramContext){
        try {
            const result = await EVENTReplyEssay(ctx);
            if(result) {
                ctx.reply("در صف انتشار قرار گرفت :)", {
                    reply_markup: {
                      resize_keyboard: true,
                      keyboard: [
                        [{ text: "ارسال پست" }],
                        [{ text: "درخواست ویژگی" }, { text: "پست های من" }],
                      ],
                    },
                  });
            }
            // TODO: set status code, return response
        } catch(error) {
            // TODO: set status code, return response
            console.log(error);
            ctx.reply("مشکلی پیش آمده");
        }
    }