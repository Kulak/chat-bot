export default class AppConfig {
    public constructor(
        // Example: 'http://qs-dev01.ebu.nextnet.com:10010'
        public baseApiUrl:string = "",
        // Example: 'http://qs-dev01.ebu.nextnet.com'
        public baseWebUrl:string = "",
        // Example: '/AlmeAPI'
        public apiPrefix:string = '/AlmeAPI'
    ) {}
}
