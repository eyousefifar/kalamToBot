import fetch from 'node-fetch';
// @ts-ignore
global.fetch = fetch;

import unsplashApi from "unsplash-js";
const unsplash = new unsplashApi({accessKey: "HKgV7vViP7a3vio_HkjspGQ4dcYwMI70xEQyx7ZdneA", secret: "0yzOQRXz05tDETyIyoYCndjfKebwW8w3lEjiabCynDE"})
import {
  IBuildSendToChannel,
  ISendToChannel,
  TTelegramMessage,
} from "../types";

export function buildSendToChannel(args: IBuildSendToChannel) {
  const manageChannelId = -1001137964093;
  const primaryChannelId = -1001400238158;
  const { bot } = args;
  function makeManagementMessage(info: ISendToChannel, reply?: boolean) {
    const { messageId, category, message, mode } = info;
    if (mode === "management") {
      return `آی دی : ${messageId} 
        دسته بندی : ${category} 
        متن پیام: 
        ${message}`;
    } else {
      return `#${category}
      ${reply ? "#پاسخ" : ""}
      ${message}
      
      @kalamtobot
      @kalaamto
      `;
    }
  }
  return async function sendToChannel(
    info: ISendToChannel
  ): Promise<TTelegramMessage> {
    const { mode, messageId, reply, replyId } = info;
    const message = makeManagementMessage(info, reply);
    const isManagement = mode === "management";
    const chatId = isManagement ? manageChannelId : primaryChannelId;
    if(!isManagement) {
      const randomImage = await unsplash.photos.getRandomPhoto({query: "nature"});
      const result = await randomImage.json();
      const imageUrl = await result.urls.regular;
      if(result.urls.small){
        const sentPic = await bot.telegram.sendPhoto(chatId, imageUrl);
      }
     
        
    }
    const sent = await bot.telegram.sendMessage(chatId, message, {
      reply_markup: {
        inline_keyboard: isManagement
          ? [[{ text: "تایید", callback_data: "confirm" }]]
          : reply && replyId
          ? [
              [
                {
                  text: "پاسخ",
                  url: `https://t.me/kalamtobot?start=${messageId}`,
                },
                {
                  text: "رفتن به پیام",
                  url: `https://t.me/kalaamto/${replyId}`,
                },
              ],
            ]
          : [
              [
                {
                  text: "پاسخ",
                  url: `https://t.me/kalamtobot?start=${messageId}`,
                },
              ],
            ],
      },
    });
    return sent;
  };
}
