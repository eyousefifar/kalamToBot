import { makeEssay } from "../entities";
import { result, ErrorFactory, IResult } from "aba-utils";
import { IReplyStep, IBuildReplyStep, IMadeEssay } from "../types";

export function buildReplyStep(args: IBuildReplyStep) {
  const { clearReplyStep, insertReplyStep,clearCategoryStep ,findByMessageId } = args;
  return async function replyStep(
    replyStep: IReplyStep
  ): Promise<Readonly<IMadeEssay> | undefined> {
    const { repliesTo } = replyStep;
    const foundMessage = await findByMessageId(repliesTo);
    const replyCleared = await clearReplyStep(replyStep);
    // const categoryCleared = await clearCategoryStep(replyStep);
    if (replyCleared  && foundMessage ) {
      const essay = makeEssay({
        ...replyStep,
        category: foundMessage.category,
      });
      const inserted = await insertReplyStep({
        userId: essay.get.userId(),
        chatId: essay.get.chatId(),
        category: essay.get.category(),
        createdOn: essay.get.createdOn(),
        repliesTo: essay.get.repliesTo() || "",
        modifiedOn: essay.get.modifiedOn()
      });
      return inserted ? makeEssay(foundMessage) : inserted;
    } else {
      return undefined;
    }

    // if(inserted){
    //     // TODO: return stuff;
    // } else {
    //     // TODO: return failed result;
    // }
  };
}
