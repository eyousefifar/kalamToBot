

import { startBot } from './packages/interfaces'
import { initDb } from "./packages/adapters"


(async () => {
    await initDb();
    // console.log(dbInit);
    await startBot();
})()