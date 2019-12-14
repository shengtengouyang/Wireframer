import React from 'react';
import {Rnd} from 'react-rnd';
import { relative } from 'path';
class Control extends React.Component {

    render() {
        const { index,selectedIndex,control, select, zoomLevel,drag, changeSize} = this.props;
        const selected=selectedIndex===index
        console.log("width in control"+index, control.width)
        console.log("height in control"+index, control.height)
        return (
            <Rnd
                onClick={(e)=>{select(control);e.stopPropagation()}}
                default={{
                    x:control.position_left,
                    y:control.position_top,
                    width:control.width,
                    height: control.height,
                }}
                style={{
                    display:"flex",
                    background:control.background, 
                    borderColor:control.border_color,
                    borderStyle:"solid",
                    alignItems:"center",
                    justifyContent: control.id==="textfield"?null:"center",
                    borderWidth: control.border_thickness+"px",
                    borderRadius: control.border_radius+"px",
                    fontSize: control.font_size+"px",
                    color: control.text_color,
                }}
                scale={zoomLevel}
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
                <div className={selected?"topLeftCorner":""} ></div>
                <div className={selected?"topRightCorner":""} ></div>
                <div className={selected?"bottomLeftCorner":""} ></div>
                <div className={selected?"bottomRightCorner":""}></div>
            </Rnd>
        );
    }
}
export default Control;