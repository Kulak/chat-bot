export class HistoryReqPayload {
    public constructor(
        public userId: string,
        public sessionId: string,
        public messageLimit: number = 0,
        public includeRevertedEntries: boolean = false
    ) {}
}

/*
{
    "userId": "375a1790-3759-4bd8-ac86-c3e4740d038c",
    "sessionId": "3c344b0c-622b-4693-9609-01f80a83a485",
    "messageLimit": 0,
    "includeRevertedEntries": false
}
*/
