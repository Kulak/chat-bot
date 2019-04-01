export default class AppEvUrlContext {
    constructor(
        public AbsolutePath: string = "",
        public Protocol: string = "",
        public Host: string = "",
        public HostName: string = "",
        public Port: string = "",
        public Uri: string = "",
        public Query: string = "",
        public Fragment: string = "",
        public Origin: string = "",
        public Type: string = "",
        public PageName: string = ""
    ) { }
}
