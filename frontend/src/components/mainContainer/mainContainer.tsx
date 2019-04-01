import * as React from "react";

import IWithChildren from '../iWithChildren'

const MainContainer  = (props:IWithChildren) => {
  return (
    <div className='hs-mainContainer'>
      {props.children}
    </div>
  );
};
export default MainContainer