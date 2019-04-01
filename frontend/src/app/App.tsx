import * as React from "react"

import ConversationContainer from '../components/conversationContainer/conversationContainer'
import DraggableContainer from '../components/draggableContainer/draggableContainer'
import HeaderContainer from '../components/headerContainer/headerContainer'
import InputContainer from '../components/inputContainer/inputContainer'
import MainContainer from '../components/mainContainer/mainContainer'
import { ILoadRes } from "../services/alme/AlmeService";
import AppEvConfigurationRes from "../services/alme/model/AppEvConfigurationRes";
import AppEventRes from '../services/alme/model/AppEventRes';
import { UserSession } from "../services/alme/model/userSession";
import CoreService from "../services/core/CoreService"
import RootStore, { RootContext } from "../services/RootStore"


import "./App.css"

export const RootID = "root";

export interface IAppParms {
  core: CoreService;
}

const App = (props: IAppParms) => {
  const root = new RootStore(props.core);
  const [msgConf, setMsgConf] = React.useState(
    (null as unknown) as AppEvConfigurationRes
  );
  const [session, setSession] = React.useState(
    (null as unknown) as UserSession
  );
  root.core.noop(session)
  const [msgs, setMsgs] = React.useState((null as unknown) as AppEventRes[]);
  React.useEffect(() => {
    root.core.trace("loading msgConf...");
    root.alme
      .initialLoad()
      .then((res: ILoadRes) => {
        if (res.msgConf) {
          root.core.tracef("loaded conf", res.msgConf);
          setMsgConf(res.msgConf);
        }
        if (res.session) {
          root.core.tracef("loaded session", res.session);
          setSession(res.session);
        }
        if (res.msgs) {
          root.core.tracef("loaded msgs", res.msgs);
          setMsgs(res.msgs);
        }
      })
      .catch(root.core.handleError);
  }, []);

  const onMessageSent=(msg:AppEventRes) => {
    root.core.tracef('msg sent: ', msg)
    const newMsgs = msgs.slice()
    newMsgs.push(msg)
    setMsgs(newMsgs)
  }

  let conversationContainer = (<div />)
  if (msgConf && msgs) {
    conversationContainer = (<ConversationContainer msgConf={msgConf} msgs={msgs} />)
  }
  return (
    <RootContext.Provider value={root}>
      <DraggableContainer>
        <MainContainer>
          <HeaderContainer>
            Eve
          </HeaderContainer>
          {conversationContainer}
          <InputContainer onMessageSent={onMessageSent} />
        </MainContainer>
      </DraggableContainer>
    </RootContext.Provider>
  );
};

export default App;
