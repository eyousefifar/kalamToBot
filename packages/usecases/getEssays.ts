// import { } from "../entities";
import { result, ErrorFactory, IResult } from "aba-utils";
import { IBuildGetEssays, IEssay, IGetEssays } from "../types";

export function buildGetEssays(args: IBuildGetEssays) {
  const { findUserMessages } = args;
  return async function getEssays(info: IGetEssays): Promise<IEssay[] | undefined> {
    const messages = await findUserMessages(info);
    if(messages) {
        return messages;
    }
  };
}
