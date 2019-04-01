import * as React from "react";

import AlmeService from '../../services/alme/AlmeService';
import AppEvConfigurationRes from '../../services/alme/model/AppEvConfigurationRes';
import AppEventRes from '../../services/alme/model/AppEventRes';
import RootStore, { RootContext } from '../../services/RootStore';

export interface IConversationContainerProps {
  msgConf: AppEvConfigurationRes
  msgs: AppEventRes[]
}

const ConversationContainer  = (props:IConversationContainerProps) => {
  const root = React.useContext<RootStore>(RootContext);
  if (props.msgs == null) {
    root.core.trace("ConversationContainer: msgs is null")
    return null
  }
  const msgs:JSX.Element[] = []
  props.msgs.forEach(each => {
    const uuid = AlmeService.generateUUID()
    if (each.maskedInput !== '') {
      msgs.push(<p key={`${uuid}-in`}>{each.maskedInput}</p>)
    }
    if (each.text !== '') {
      msgs.push(<p key={`${uuid}-out`}>{each.text}</p>)
    }
  });
  return (
    <div className='hs-ConversationContainer'>
    {msgs}
    </div>
  );
};
export default ConversationContainer