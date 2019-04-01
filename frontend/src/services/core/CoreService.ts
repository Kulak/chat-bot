import AppConfig from './AppConfig'

/**
 * Core store provides core application services:
 * 
 * - location of the service API
 * - notifications to the user
 * - trace level logging
 * - debug level support
 * 
 * Some of the calls are provided here, because TSLint
 * does not allow use of of these calls across the application:
 * - logging to console
 * - break into debugger
 * 
 * Thus, core provides restricted calls and a way to control
 * these calls from one place.
 */
export default class CoreService {

    private config: AppConfig

    public set Config(config: AppConfig) {
        this.config = config
    }

    public get Config(): AppConfig {
        return this.config
    }

    // public constructor() {}

    public async handleResponse<T>(response:Response, t: new()=>T):Promise<T> {
        let contentType = response.headers.get("content-type")
        if (contentType == null) {
            throw new Error('content-type is not set in response')
        }
        contentType = contentType.toLowerCase()
        switch (contentType) {
            case "application/json":
            case "application/json; charset=utf-8":
                const data = await response.json()
                return Object.assign(new t(), data)
            default:
                throw new Error(`${contentType}: can't parse content type`)
        }
    }

    public handleError(err:any) {
        this.trace(err)
    }

    /**
     * trace is a trace or debug level logging
     * with a string being an already formatted message.
     * 
     * Messages sent using this call are not going to be displayed to
     * the user unless user goes to application log viewer area.
     * @param message 
     */
    public trace(message: any) {
        // tslint:disable-next-line:no-console
        console.log(message)
    }

    /**
     * tracef is a trace or debug level logging
     * with 1st argument being a format string and other arguments
     * a variable array of anything.
     */
    public tracef(format: string, ...args: any[]) {
        // tslint:disable-next-line:no-console
        console.log(format, ...args)
        // // tslint:disable-next-line:no-console
        // console.trace(format)
    }

    /**
     * Use to break source code into debugger.
     * Comes with TSLint suprression in one place.
     */
    public break() {
        // tslint:disable-next-line:no-debugger
        debugger
    }

    public noop(v:any = null) {
        // tslint:disable-line
    }

}