import CoreService from '../core/CoreService'
import AppEvConfigurationRes from './model/AppEvConfigurationRes';
import AppEvent, { AppEventName, AppPathSuffix } from './model/AppEvent'
import AppEventRes from './model/AppEventRes';
import IAppEventRes from './model/IAppEventRes'
import { UserSession } from './model/userSession'

export interface ILoadRes {
    msgConf?: AppEvConfigurationRes
    session?: UserSession
    msgs?: AppEventRes[]
}

export default class AlmeService {

    public static generateUUID() {
        /* tslint:disable */
        let d = new Date().getTime();
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
        /* tslint:enable */
    }

    public userSession: UserSession
    public appEvents: IAppEventRes[]

    public constructor(
        private core: CoreService,
        private fetchOptions: any,
    ) {
        this.init()
    }

   public createSession():UserSession{
        const id = AlmeService.generateUUID()
        this.userSession = new UserSession(id, id)
        return this.userSession
    }

    public async get<T>(pathSuffix:AppPathSuffix, t: new()=>T):Promise<T> {
        const url = this.apiUrl(pathSuffix)
        return fetch(url, this.options({method: 'GET'}))
        .then((response: Response) => this.core.handleResponse<T>(response, t))
        .catch((err: any) => this.handleError<T>(url, err))
    }

    public doAppEvent<T>(appEv:AppEvent, pathSuffix:AppPathSuffix, t: new()=>T) {
        this.sendAppEvent<T>(appEv, pathSuffix, t)
        .then((data:T) => {
            this.addAppEvents([data])
        })
        .catch(err => {
            // console.log('error:', err)
        })
    }

    public async sendAppEvent<T>(appEv:AppEvent, pathSuffix:AppPathSuffix, t: new()=>T):Promise<T>  {
        appEv.sessionId = this.userSession.sessionId
        appEv.userId = this.userSession.userId
        const url = this.apiUrl(pathSuffix)
        return fetch(url, this.options({
            body: JSON.stringify(appEv),
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
        }))
        .then((response: Response) => this.core.handleResponse<T>(response, t))
        .catch((err: any) => this.handleError<T>(url, err))
    }

    public async initialLoad():Promise<ILoadRes> {
        const rv = {} as ILoadRes
        rv.msgs = []
        try {
            rv.msgConf = await this.get(AppPathSuffix.Configuration, AppEvConfigurationRes)
            rv.session = this.createSession()
            const appEv = new AppEvent(AppEventName.QuestionBeforeModeSelect)
            rv.msgs.push(await this.sendAppEvent(appEv, AppPathSuffix.AppEvent, AppEventRes))
            return rv
        } catch(err) {
            this.core.handleError(err)
            return rv
        }
    }

    private addAppEvents(appEvs: IAppEventRes[]) {
        this.appEvents.push(...appEvs)
    }

    private apiUrl(suffix:AppPathSuffix):string {
        return `${this.core.Config.baseApiUrl}${this.core.Config.apiPrefix}${suffix}`
    }

    private options(opts:any):any {
        return Object.assign({}, this.fetchOptions, opts)
    }

    private async handleError<T>(url:string, err:any):Promise<T> {
        throw new Error(`${err} for URL ${url}`)
    }

    private init():void {
        this.appEvents = []
    }

}