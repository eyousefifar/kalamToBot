import { TTelegramContext } from "../types";
import { start } from "../usecases";
export function buildEVENTStart() {
  // TODO: inject any tool that's needed, like request cache
  return async function EVENTStart(ctx: TTelegramContext) {
            
            const result = await start(ctx.from?.first_name || "کاربر عزیز");
            return result;
        
  };
}
