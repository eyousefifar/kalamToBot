import {
  TFindCategoryStep,
  TInsertCategoryStep,
  TUpdateMessage,
  TSendToChannelFunc,
  TFindMessageNoneFunc,
  TFindByMessageIdFunc,
  TUpdateConfirmFunc,
  TFindReplyStepFunc,
  TInsertReplyStepFunc,
  TClearCategoryFunc,
  TClearReplyStepFunc,
  TFindUserMessagesFunc,
  TSendToChatFunc,
} from "./adapters";

export interface IBuildAddCategoryStep {
  clearCategoryStep: TClearCategoryFunc;
  clearReplyStep: TClearReplyStepFunc;
  insertCategoryStep: TInsertCategoryStep;
}

export interface IBuildAddMessage {
  findMessageNone: TFindMessageNoneFunc;
  updateMessage: TUpdateMessage;
  sendToChannel: TSendToChannelFunc;
}
export interface ICategoryStep {
  userId: number;
  chatId: number;
  category: string;
}

export interface IMessage {
  userId: number;
  chatId: number;
  message: string;
  tlgMessageId: number;
}

export type TTelegramKeyboard = Array<Array<{ text: string }>>;
export interface IStart {
  message: string;
  keyboard: TTelegramKeyboard;
}

export interface IBuildConfirm {
  findByMessageId: TFindByMessageIdFunc;
  sendToChannel: TSendToChannelFunc;
  sendToChat: TSendToChatFunc;
  updateConfirm: TUpdateConfirmFunc;
}

export interface IBuildReplyStep {
  clearReplyStep: TClearReplyStepFunc;
  clearCategoryStep: TClearCategoryFunc;
  insertReplyStep: TInsertReplyStepFunc;
  findByMessageId: TFindByMessageIdFunc;
}

export interface IReplyStep {
  userId: number;
  chatId: number;
  repliesTo: string;
  category?: string;
}

export interface IBuildReplyEssay {
  findMessageNone: TFindMessageNoneFunc;
  updateMessage: TUpdateMessage;
  sendToChannel: TSendToChannelFunc;
}

export interface IBuildGetEssays {
  findUserMessages: TFindUserMessagesFunc;
}

export interface IGetEssays {
  userId: number;
  chatId: number;
}
