import { IBuildCRUD} from "../types";




export function buildInitDb(args: IBuildCRUD) {
    const{ client } = args;
    return async function initDb() {
        const createTableQuery  = `CREATE TABLE IF NOT EXISTS essay (
            userId bigint,
            chatId bigint,
            category text,
            messageId uuid,
            tlgMessageId int,
            message text,
            repliesTo uuid,
            confirmed boolean,
            createdOn bigint,
            modifiedOn bigint,
            PRIMARY KEY ((userId, chatId), category, messageId)
        )`;
    const confirmedIndexQuery = `CREATE INDEX IF NOT EXISTS ON essay(confirmed)`;
    const messageIdIndexQuery = `CREATE INDEX IF NOT EXISTS ON essay(messageId)`;
    const tlgMessageIdIndexQuery = `CREATE INDEX IF NOT EXISTS ON essay(tlgMessageId)`;
    let tableResult;
    let confirmedIndexResult;
    let messageIdIndexResult;
    let tlgMessageIdIndexResult; 
    try {
      tableResult = await client.execute(createTableQuery, undefined, { prepare: true });
      
    } catch (error) {
        // TODO: use Error factory
        console.log(error)
    }
    try {
        confirmedIndexResult = await client.execute(confirmedIndexQuery, undefined, {prepare: true});

    } catch (error) {
        // TODO: use Error factory
        console.log(error);
    }
    try {
        messageIdIndexResult = await client.execute(messageIdIndexQuery, undefined, {prepare: true});

    } catch (error) {
        // TODO: use Error factory
        console.log(error);
    }
    try {
        tlgMessageIdIndexResult = await client.execute(tlgMessageIdIndexQuery, undefined, {prepare: true});

    } catch (error) {
        // TODO: use Error factory
        console.log(error);
    }
    // TODO: log meaning full info and return better data
    return {
        tableResult,
        confirmedIndexResult,
        messageIdIndexResult,
        tlgMessageIdIndexResult
    }
    }
}