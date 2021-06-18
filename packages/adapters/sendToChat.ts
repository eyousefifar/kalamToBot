import { IBuildSendToChat, ISendToChat } from "../types/adapters";

export function buildSendToChat(args: IBuildSendToChat) {
  const { bot } = args;
  function makeMessage(info: ISendToChat) {
    const { message, category, reply, replyMessage } = info;
    if (reply) {
      return `پاسخ جدیدی برای شما ارسال شده:
        
        پیام شما:
        #${category ? category : ""}
        
        ${message}

        پاسخ به پیام شما:

        ${replyMessage ? replyMessage : ""};
        `;
    } else {
      return `${category}
        ${message}`;
    }
  }
  return async function sendToChat(info: ISendToChat) {
    const { chatId, replyMessageId, reply } = info;
    const sent = await bot.telegram.sendMessage(
      chatId,
      makeMessage(info),
      reply
        ? {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "پاسخ",
                    url: `https://t.me/kalamtobot?start=${replyMessageId}`,
                  },
                ],
              ],
            },
          }
        : undefined
    );
    return !!sent;
  };
}
