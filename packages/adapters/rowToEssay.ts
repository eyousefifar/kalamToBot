/* eslint-disable security/detect-object-injection */
import { TRow, IEssay, TLong } from "../types";

// IMPORTANT: all keys must be lower case in order to retrieve value
export function rowToEssay(row: TRow): IEssay {
  function parseLong(value: TLong) {
    return value !== null ? parseInt(value.toString(), 10) : undefined;
  }
  
  return {
    userId: parseLong(row.get("userid")) || -1,
    chatId: parseLong(row.get("chatid")) || -1,
    category: row.get("category"),
    messageId: row.get("messageid"),
    tlgMessageId: row.get("tlgmessageid"),
    message: row.get("message"),
    repliesTo: row.get("repliesto"),
    confirmed: row.get("confirmed"),
    createdOn: parseLong(row.get("createdon")),
    modifiedOn: parseLong(row.get("modifiedon")),
  };
}
