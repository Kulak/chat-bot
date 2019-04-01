import * as React from "react";

import IWithChildren from '../iWithChildren'
import './draggableContainer.css'

const DraggableMainBox  = (props:IWithChildren) => {
    const [style, setStyle] = React.useState({top:0, left:0})
    const [mouseTracer, setMouseTracer] = React.useState({tracing: false, x:0, y:0})
    const onMouseDown = (ev:any) => {
        setMouseTracer({tracing: true, x:ev.clientX, y:ev.clientY})
        setStyle({top:style.top, left:style.left})
    }
    const onMouseUp = (ev:any) => {
        setMouseTracer({tracing:false, x:0, y:0})
        setStyle({top:style.top, left:style.left})
    }
    const onMouseMove = (ev:any) => {
        if (mouseTracer.tracing) {
            const dX = ev.clientX - mouseTracer.x
            const dY = ev.clientY - mouseTracer.y
            setStyle({top:style.top+dY, left: style.left + dX})
            setMouseTracer({tracing: true, x:ev.clientX, y:ev.clientY})
        }
    }
  return (
    <div className='hs-draggableContainer' style={style} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
        {props.children}
    </div>
  );
};
export default DraggableMainBox