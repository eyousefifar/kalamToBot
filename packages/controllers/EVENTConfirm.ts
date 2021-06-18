import { TTelegramContext } from "../types";
import { confirm } from "../usecases";
export function buildEVENTConfirm() {
  // TODO: inject any tool that's needed, like request cache
  const reg = /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/;
  return async function EVENTConfirm(ctx: TTelegramContext) {
    const message = ctx.callbackQuery?.message?.text;
    if (message) {
      const uuidStartIndex = message.search(reg);
    
      if (uuidStartIndex >= 0) {
        const uuid = message.substr(uuidStartIndex, 36);
        const confirmed = await confirm(uuid);
        if (confirmed) {
          return;
        }
      } else {
        throw new Error("noUUIDFound");
      }
    } else {
      throw new Error("undefinedMessage");
    }
  };
}
