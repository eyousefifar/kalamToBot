import { FastifyRequest, FastifyReply } from "fastify";
import { Client, types } from "cassandra-driver";
import { IEssay } from "./entities";
import { ICategoryStep, IMessage, IReplyStep } from "./usecases";
import { Context, Telegraf } from "telegraf";
import { Message } from "telegraf/typings/telegram-types";

export type TRow = types.Row;
export type TLong = types.Long;
export type TRequest = FastifyRequest;
// http interfaces start
export type TReply = FastifyReply;
// http interfaces end

export type TFindCategoryStep = (
  info: ICategoryStep
) => Promise<IEssay | undefined>;
export type TInsertCategoryStep = (
  info: IInsertCategoryStep
) => Promise<true | undefined>;
export type TRowToEssay = (row: TRow) => IEssay;

export type TUpdateMessage = (
  info: IUpdateMessage
) => Promise<true | undefined>;

export interface IUpdateMessage extends IMessage {
  category: string;
  messageId: string;
  tlgMessageId: number;
  createdOn: number;
  modifiedOn: number;
  reply?: boolean;
  repliesTo?: string
}

export interface IBuildCRUD {
  client: Client;
  rowToEssay?: TRowToEssay;
  findByMessageId?: TFindByMessageIdFunc
}

export interface IInsertCategoryStep extends ICategoryStep {
  createdOn: number;
  modifiedOn: number;
}

export interface IBuildSendToChannel {
  bot: Telegraf<Context>;
}

export interface ISendToChannel {
  messageId: string;
  message: string;
  category: string;
  mode: "management" | "primaryChannel";
  reply?: boolean;
  replyId?: number
}

export type TTelegramMessage = Message;
export type TSendToChannelFunc = (
  info: ISendToChannel
) => Promise<TTelegramMessage>;


export type TFindMessageNoneFunc = (info: IMessageNone) => Promise<IEssay | undefined>

export interface IMessageNone {
  userId: number;
  chatId: number;
  reply?: boolean;
}


export type TFindByMessageIdFunc = (id: string) => Promise<IEssay | undefined>;


export interface IUpdateConfirm {
  messageId: string;
  confirmed: boolean,
  tlgMessageId: number;
}

export type TUpdateConfirmFunc = (info: IUpdateConfirm) => Promise<true | undefined>;




export interface IInsertReplyStep extends IInsertCategoryStep {
  repliesTo: string;
  category: string;
}


export type TFindReplyStepFunc = (info: IReplyStep) => Promise<IEssay | undefined>;

export type TInsertReplyStepFunc = (info: IInsertReplyStep) => Promise<true | undefined>;



export interface IClearCategoryStep {
  userId: number;
  chatId: number;
}


export type TClearCategoryFunc = (info: IClearCategoryStep) => Promise<boolean>;


export type TClearReplyStep = IClearCategoryStep;

export type TClearReplyStepFunc = (info: TClearReplyStep) => Promise<boolean>;



export interface IMessageMode {
  userId: number;
  chatId: number;
}

export interface IFindUserMessages {
  userId: number;
  chatId: number;
}


export type TFindUserMessagesFunc = (info: IFindUserMessages) => Promise<IEssay[] | undefined>;




export interface IBuildSendToChat {
  bot: Telegraf<Context>;
}


export interface ISendToChat {
  chatId: number;
  message: string;
  category?: string;
  reply?: boolean;
  replyMessage?: string;
  replyMessageId?: string;
}

export type TSendToChatFunc = (info: ISendToChat) => Promise<boolean>;