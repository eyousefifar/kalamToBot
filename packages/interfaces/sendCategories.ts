import { TKeyboard, TTelegramContext } from "../types";
export const category: string[] = [
  "سایر",
  "کودک_آزاری",
  "کودک_همسری",
  "آزار جنسی_در_محل_کار",
  "آزار_جنسی_در_محل_تحصیل",
  "آزار_جنسی_در_اجتماع",
  "بارداری",
  "انتخاب_همسر",
  "روابط_قبل_از_ازدواج",
  "هم_جنس_گرایی",
  "ترنس",
  "اعتیاد",
  "نوجوانی_و_جوانی",
  "خانواده",
  "زناشویی",
  "روابط_جنسی",
  "مشورت",
  "طلاق",
  "اجتماع"
].reverse();
// TODO: can be cached
function categoryKeyboard() {
  const keyboard: TKeyboard = [];

  for (let index = 0; index < category.length; index++) {
    // * index is always a number, so no prototype changing attack
    const keyboardPairIndex = Math.floor(index / 2);
    // eslint-disable-next-line security/detect-object-injection
    if (Array.isArray(keyboard[keyboardPairIndex])) {
      // eslint-disable-next-line security/detect-object-injection
      keyboard[keyboardPairIndex].push({ text: category[index] });
    } else {
      // eslint-disable-next-line security/detect-object-injection
      keyboard[keyboardPairIndex] = [{ text: category[index] }];
    }
  }
  return [[{text: "لغو"}], ...keyboard];
}

export function sendCategories(ctx: TTelegramContext) {
  // should save user and chat id when sending the post
  ctx.reply("دسته بندی مورد نظرتو انتخاب کن", {
    reply_markup: {
      resize_keyboard: true,
      keyboard: categoryKeyboard(),
    },
  });
}
