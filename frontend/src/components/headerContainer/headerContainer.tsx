import * as React from "react";

import IWithChildren from '../iWithChildren'

const HeaderContainer  = (props:IWithChildren) => {
  return (
    <div className='hs-HeaderContainer'>
      {props.children}
    </div>
  );
};
export default HeaderContainer