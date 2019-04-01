import AppEvDisplayLinkLocation from './AppEvDisplayLinkLocation'
import AppEvExtensionData from './AppEvExtensionData'
import IAppEventRes from './IAppEventRes'

export default class AppEventRes implements IAppEventRes {
    public constructor(
        public userId: string = "",
        public text: string = "",
        public responseId: string = "",
        public responseRevision: string = "",
        public unitId: string = "",
        public displayLinkCollection = new AppEvDisplayLinkLocation(),
        public displayLinks: string[] = [],
        public displayLinkMetadata: any = null,
        public navUrl: any = "",
        public responseActions: any[] = [],
        public deferredAppCall: any = null,
        public userDisplayName: string = "",
        public agentDisplayName: string = "",
        public maskedInput: any = null,
        public maintainUiLock: boolean = false,
        public isReverted: boolean = false,
        public extensionData = new AppEvExtensionData(),
    ) { }
}

/*
    "userId": "b6012916-9acb-4beb-8c46-2498d26434b7",
    "text": "Thank you for your input. Before I can show you results, you need to select a user mode. Please select a mode from the dropdown menu highlighted in red above.",
    "responseId": "00000000-0000-0000-0000-000000000000",
    "responseRevision": 1,
    "unitId": "00000000-0000-0000-0000-000000000000",
    "displayLinkCollection": {
        "Sections": [],
        "Metadata": null
    },
    "displayLinks": [],
    "displayLinkMetadata": null,
    "navUrl": null,
    "responseActions": [],
    "deferredAppCall": null,
    "userDisplayName": "You: ",
    "agentDisplayName": "Alme: ",
    "maskedInput": null,
    "maintainUiLock": false,
    "isReverted": false,
    "extensionData": {
        "entryId": "7cb6700d-fec5-435f-850e-51387995bcac"
    }
*/
