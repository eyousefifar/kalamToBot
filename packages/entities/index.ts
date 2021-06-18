import { buildMakeEssay } from "./essay";
import { v4 } from "uuid";

export const makeEssay = buildMakeEssay({ uuidGenerator: v4 });
