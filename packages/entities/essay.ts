import { IBuildMakeEssay, IEssay, IMadeEssay } from "../types";

export function buildMakeEssay(args: IBuildMakeEssay) {
  const { uuidGenerator } = args;
  return function makeEssay(essay: IEssay) {
    const {
      userId,
      chatId,
      category,
      repliesTo,
      createdOn = Date.now(),
    } = essay;
    let {
      message,
      messageId,
      tlgMessageId,
      confirmed = false,
      modifiedOn = Date.now(),
    } = essay;

    if (message && !messageId) {
      messageId = uuidGenerator();
    }

    function setMessage(text: string) {
      message = text;
      messageId = uuidGenerator();
      modifiedOn = Date.now();
    }
    function setTlgId(id: number) {
      tlgMessageId = id;
      modifiedOn = Date.now();
    }
    function confirm() {
      confirmed = true;
      modifiedOn = Date.now();
    }
    const madeEssay: IMadeEssay = {
      get: {
        userId: () => userId,
        chatId: () => chatId,
        category: () => category,
        confirmed: () => confirmed,
        message: () => message,
        messageId: () => messageId,
        tlgMessageId: () => tlgMessageId,
        repliesTo: () => repliesTo,
        createdOn: () => createdOn,
        modifiedOn: () => modifiedOn,
      },
      set: {
        message: setMessage,
        tlgMessageId: setTlgId,
        confirm
      },
    };
    // FIXME: interface for madeEssay

    return Object.freeze(madeEssay);
  };
}
