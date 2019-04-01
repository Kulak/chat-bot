import * as React from "react";

import AppEventRes from '../../services/alme/model/AppEventRes';
import "./inputContainer.css";

export type MessageSentHandler = (msg:AppEventRes) => void

export interface IInputContainerParams {
  onMessageSent: MessageSentHandler
}

const InputContainer = (params:IInputContainerParams) => {
  const [msg, setMsg] = React.useState("");
  const onSendClick = (ev: React.MouseEvent<HTMLButtonElement>): void => {
    setMsg('');
    const res = new AppEventRes()
    res.maskedInput = msg
    res.text = 'no response yet...'
    params.onMessageSent(res)
  };
  const onInputChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    setMsg(ev.target.value);
  };
  return (
    <div className="hs-inputContainer">
      <input
        className="hs-inputContainer-input"
        type="text"
        value={msg}
        onChange={onInputChange}
      />
      <button className='hs-inputContainer-button' onClick={onSendClick}>Send</button>
    </div>
  );
};
export default InputContainer;
