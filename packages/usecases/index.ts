import {
  findCategoryStep,
  insertCategoryStep,
  updateMessage,
  sendToChannel,
  findMessageNone,
  updateConfirm,
  findByMessageId,
  findReplyStep,
  insertReplyStep,
  clearCategoryStep,
  clearReplyStep,
  findUserMessages,
  sendToChat
} from "../adapters";

import { buildStart } from "./start";
import { buildAddCategoryStep } from "./addCategoryStep";
import { buildAddMessage } from "./addMessage";
import { buildConfirm } from "./confirm";
import { buildReplyStep } from "./replyStep";
import { buildReplyEssay } from "./replyEssay";
import {  buildGetEssays } from "./getEssays";


export const start = buildStart();
export const addCategoryStep = buildAddCategoryStep({
  clearCategoryStep,
  insertCategoryStep,
  clearReplyStep,
});
export const addMessage = buildAddMessage({
  findMessageNone,
  updateMessage,
  sendToChannel,
});
export const confirm = buildConfirm({
  sendToChannel,
  findByMessageId,
  updateConfirm,
  sendToChat
});
export const replyStep = buildReplyStep({
  clearReplyStep,
  insertReplyStep,
  findByMessageId,
  clearCategoryStep,
});
export const replyEssay = buildReplyEssay({
  findMessageNone,
  sendToChannel,
  updateMessage,
});
export const getEssays = buildGetEssays({findUserMessages})