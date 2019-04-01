import ConfigurationEntry from './ConfigurationEntry';
import IAppEventRes from './IAppEventRes';

export default class AppEvConfigurationRes implements IAppEventRes {
    public constructor(
        public configurationSettings: ConfigurationEntry[] = []
    ) { }
}
