import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App, { RootID } from './app/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AppConfig from './services/core/AppConfig';
import CoreService from './services/core/CoreService';

const core = new CoreService()

// load deployment configuration - could be better - i.e. this is not the fastest
fetch('/appConfig.json', {method: 'GET'})
.then(async (res: Response) => {
  core.Config = await core.handleResponse(res, AppConfig)

  ReactDOM.render(
    (<App core={core} />),
    document.getElementById(RootID) as HTMLElement
  );
  registerServiceWorker();  
})
.catch((err: any) => {
  core.handleError(err)
})
