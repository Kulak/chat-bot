import AppEvParams from './AppEvParams';

export enum AppEventName {
    Empty = "",
    QuestionBeforeModeSelect = "QuestionBeforeModeSelect"
}

export enum AppPathSuffix {
    Empty = "",
    AppEvent = "/api/Conversation/AppEvent",
    Configuration = "/api/Configuration/GetConfiguration"
}

export default class AppEvent {
    constructor(
        public eventName: AppEventName,
        public userId: string = "",
        public sessionId: string = "",
        public origin: string = "Internal",
        public parameters = new AppEvParams(),
        public channel: string = "Web",
        public language: string = "en-US",
        public accessKey: string = "00000000-0000-0000-0000-000000000000"
    ) { }
}
