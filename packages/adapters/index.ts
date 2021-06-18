import { Client } from "cassandra-driver";
import { rowToEssay } from "./rowToEssay";
import { bot } from "./bot";

import { buildInitDb } from "./initDb";
import { buildFindCategoryStep } from "./findCategoryStep";
import { buildInsertCategoryStep } from "./insertCategoryStep";
import { buildUpdateMessage } from "./updateMessage";
import { buildSendToChannel } from "./sendToChannel";
import { buildFindMessageNone } from "./findMessageNone";
import { buildUpdateConfirm } from "./updateConfirm";
import { buildFindByMessageId } from "./findByMessageId";
import { buildFindReplyStep } from "./findReplyStep";
import { buildInsertReplyStep } from "./insertReplyStep";
import { buildClearCategoryStep } from "./clearCategoryStep";
import { buildClearReplyStep } from "./clearReplyStep";
import {  buildFindMessageMode } from "./findMessageMode";
import { buildFindUserMessages } from "./findUserMessages"
import {  buildSendToChat } from "./sendToChat";
const client = new Client({
  contactPoints: ["127.0.1.1"],
  localDataCenter: "datacenter1",
  keyspace: "essay",
});

export const initDb = buildInitDb({ client });
export const findCategoryStep = buildFindCategoryStep({ client, rowToEssay });
export const insertCategoryStep = buildInsertCategoryStep({ client });
export const updateMessage = buildUpdateMessage({ client });
export const sendToChannel = buildSendToChannel({ bot });
export const findMessageNone = buildFindMessageNone({ client, rowToEssay });
export const findByMessageId = buildFindByMessageId({ client, rowToEssay });
export const updateConfirm = buildUpdateConfirm({ client, findByMessageId });
export const findReplyStep = buildFindReplyStep({ client, rowToEssay });
export const insertReplyStep = buildInsertReplyStep({ client });
export const clearCategoryStep = buildClearCategoryStep({ client });
export const clearReplyStep = buildClearReplyStep({ client });
export const findMessageMode = buildFindMessageMode({client});
export const findUserMessages = buildFindUserMessages({client, rowToEssay});
export const sendToChat = buildSendToChat({bot});
export { bot } from "./bot";
