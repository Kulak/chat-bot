import AppEvContext from './AppEvContext';

export default class AppEvParams {
    constructor (
        public Context = new AppEvContext(),
    ) { }
}