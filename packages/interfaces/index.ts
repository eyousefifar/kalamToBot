import { bot } from "../adapters";
import { addCategoryStep } from "./addCategoryStep";
import { sendCategories, category } from "./sendCategories";
import { start } from "./start";
import { confirm } from "./confirm";
import { cancel } from "./cancel";
import { onMessage } from "./onMessage";
import { futureRequest } from "./futureRequest";
import { getEssays } from "./getEssays";
bot.start(start);

bot.hears("ارسال پست", sendCategories);
bot.hears("لغو", cancel);
bot.hears("درخواست ویژگی", futureRequest);
bot.hears("پست های من", getEssays);
bot.hears(category, addCategoryStep);

bot.on("message", onMessage);

bot.action("confirm", confirm);

export async function startBot() {
  
  // // Set telegram webhook
  // // The second argument is necessary only if the client uses a self-signed 
  // // certificate. Including it for a verified certificate may cause things to break.
  
  // // Start https webhook
  // bot.startWebhook(`/${secretPath}`, null, 80)
  await bot.launch({
    webhook: {
      domain: "https://a7152a833ca9.ngrok.io",
      port: 3000
    }
  });
}
