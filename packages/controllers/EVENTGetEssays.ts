import { TTelegramContext } from "../types"
    import { getEssays } from "../usecases"
    export function buildEVENTGetEssays(){
        // TODO: inject any tool that's needed, like request cache
        return async function EVENTGetEssays(ctx: TTelegramContext) {
            const userId = ctx.from?.id;
            const chatId = ctx.chat?.id;
            if(userId && chatId) {
                const result = await getEssays({userId, chatId});
                if(result) {
                    return result;
                }
            }
            
        }
    }