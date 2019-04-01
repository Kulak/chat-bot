import AppEvUrlContext from './AppEvUrlContext';

export default class AppEvContext {
    constructor(public CurrentUrl = new AppEvUrlContext()) { }
}
