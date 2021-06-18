export interface IBuildMakeEssay {
    uuidGenerator: () => string;
}

export type TMode = "category" | "message";

export interface IEssay {
  userId: number;
  chatId: number;
  category: string;
  messageId?: string;
  tlgMessageId?: number;
  message?: string;
  repliesTo?: string;
  confirmed?: boolean;
  createdOn?: number;
  modifiedOn?: number;
}


export interface IMadeEssay {
    get: {
        userId: () => number;
        chatId: () => number;
        confirmed: () => boolean;
        category: () => string;
        messageId: () => string | undefined;
        tlgMessageId: () => number | undefined;
        message: () => string | undefined;
        repliesTo: () => string | undefined;
        createdOn: () => number;
        modifiedOn: () => number;
    };
    set: {
        message: (text: string) => void;
        tlgMessageId: (id: number) => void;
        confirm: () => void;
    }
}