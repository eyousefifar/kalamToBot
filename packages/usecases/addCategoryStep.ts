import { makeEssay} from "../entities";
import { result, ErrorFactory, IResult } from "aba-utils";
import { ICategoryStep, IBuildAddCategoryStep } from "../types";

export function buildAddCategoryStep(args: IBuildAddCategoryStep) {
  const { clearCategoryStep, insertCategoryStep, clearReplyStep} = args;
  return async function addCategoryStep(categoryStep: ICategoryStep): Promise<true | undefined> {
    const categoryCleared = await clearCategoryStep(categoryStep);
    const replyCleared = await clearReplyStep(categoryStep);
    if(categoryCleared || replyCleared) {
        const essay = makeEssay(categoryStep);
        const inserted = await insertCategoryStep({
          userId: essay.get.userId(),
          chatId: essay.get.chatId(),
          category: essay.get.category(),
          createdOn: essay.get.createdOn(),
          modifiedOn: essay.get.modifiedOn()
        });
        return inserted;
        // if(inserted){
        //     // TODO: return stuff;
        // } else {
        //     // TODO: return failed result;
        // }
    } else {
      throw new Error("steps must be cleared");
    }

  };
}
