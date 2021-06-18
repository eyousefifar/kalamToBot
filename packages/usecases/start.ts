// import { } from "../entities";
import { result, ErrorFactory, IResult } from "aba-utils";
import { IStart, TTelegramKeyboard } from "../types";

export function buildStart() {
  function startMessage(firstName?: string) {
    return `
          ${firstName} به بات هم صحبت خوش اومدی
          میتونی به صورت کاملا ناشناس
          و به طور رایگان برای همیشه بدون محدودیت
          حرف دلت رو با بقیه بزنی و به حرفاشون گوش کنی
          
          کانال کلام: @kalaamto`;
  }
  // TODO: a mechanism to make every config changeable from db (hot change)
  const keyboard: TTelegramKeyboard = [
    [{ text: "ارسال پست" }],
    [{ text: "جستجو" }, { text: "پست های من" }],
  ];
  return async function start(firstName: string): Promise<IStart> {
    // TODO: use user information here
    return {
      message: startMessage(firstName),
      keyboard,
    };
  };
}
