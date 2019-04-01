import { createContext } from 'react'

import AlmeService from './alme/AlmeService'
import CoreService from './core/CoreService'

export default class RootStore {
    public constructor(
        public core = new CoreService(),
        public alme = new AlmeService(core, {})
    ) {
    }
}

export const RootContext = createContext<RootStore>(
    (null as unknown) as RootStore
  );
