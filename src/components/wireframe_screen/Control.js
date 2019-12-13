import React from 'react';
import {Rnd} from 'react-rnd';
import { relative } from 'path';
class Control extends React.Component {

    render() {
        const { index,selectedIndex,control, select, deselect,drag, changeSize} = this.props;
        const selected=selectedIndex===index
        console.log("width in control"+index, control.width)
        console.log("height in control"+index, control.height)
        return (
            <Rnd
                tabIndex="0" 
                // onBlur={()=>deselect()}
                onClick={(e)=>{select(control); e.preventDefault();}}
                default={{
                    x:control.position_left,
                    y:control.position_top,
                    width:control.width,
                    height: control.height,
                }}
                style={{
                    background:control.background, 
                    borderColor:control.border_color,
                    borderWidth: control.border_thickness,
                    borderRadius: control.border_radius,
                    fontSize: control.fontSize,
                    color: control.text_color,
                    position: "absolute"
                }}
                onDragStop={(e,d)=>{drag(d.x, d.y, index)}}
                onResizeStop={(e,d,ref,delta,position)=>{changeSize(ref.style.width,ref.style.height,position,index);
                console.log(position);
                }}
                bounds=".wireframePlace"
                enableResizing={{
                    bottomLeft: selected,
                    bottomRight: selected,
                    topLeft: selected,
                    topRight: selected,
                    top:false,
                    right:false,
                    left:false,
                    bottom:false,
                }
                }
                disableDragging={!selected}
                
            >
                {control.properties}
                {control.width}
                {control.height}
                {control.position_left}
                {control.position_top}
                <div className={selected?"topLeftCorner":""} ></div>
                <div className={selected?"topRightCorner":""} ></div>
                <div className={selected?"bottomLeftCorner":""} ></div>
                <div className={selected?"bottomRightCorner":""}></div>
            </Rnd>
        );
    }
}
export default Control;