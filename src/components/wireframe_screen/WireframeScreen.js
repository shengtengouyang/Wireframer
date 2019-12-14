import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import {Button, Icon} from 'react-materialize';
import Control from './Control';

class WireframeScreen extends Component {
    state = {
        wireframe: this.props.wireframe,
        width:this.props.wireframe?this.props.wireframe.width:0,
        height:this.props.wireframe?this.props.wireframe.height:0,
        selectedControl: null
    }

    handleChange = (e) => {
        const { target } = e;
        this.setState((state)=>({
            ...state,
            wireframe: {...this.state.wireframe, [target.id]:target.value},
        }));
        console.log("wireframe after change: ", this.state.wireframe);
    }
    handleChangeDimension=(e)=>{
        const{target}=e;
        this.setState({[target.id]:target.value})
    }
    handleUpdate=()=>{
        const {width, height}=this.state;
        var {wireframe}=this.state;
        if(width&&height&&!(wireframe.width==width&&wireframe.height==height)){
            wireframe.width=width;
            wireframe.height=height;
            this.setState({wireframe})
        }
    }

    handleChangeControl=(e)=>{
        const{target}=e;
        console.log("changeControl id",target.id)
        console.log("changeControl value",target.value)
        var wireframe=this.state.wireframe;
        var selectedControl=this.state.selectedControl;
        const index=wireframe.controls.indexOf(selectedControl);
        wireframe.controls[index]={...selectedControl, [target.id]:target.value};
        selectedControl=wireframe.controls[index];
        this.setState({wireframe, selectedControl})
    }

    handleAddControl=(e)=>{
        const{target}=e;
        const id=target.id;
        var wireframe=this.state.wireframe;
        var control={};
        switch (id){
            case "container":
                control={
                id:id,
                height:50,
                width: 80,
                background:"white",
                border_color: "black",
                border_radius:2,
                border_thickness:1,
                position_left:0,
                position_top:0}; break;
            case "label":
                control={
                    id:id,
                    height: 22.5,
                    width:120,
                    properties: "Promote for Input",
                    font_size:16,
                    background:null,
                    text_color:"black",
                    border_color:null,
                    border_radius:0,
                    border_thickness:0,
                    position_left:0,
                    position_top:0
                }; break;
            case "button":
                control={
                    id:id,
                    height: 25,
                    width:90,
                    properties: "Submit",
                    font_size: 16,
                    background:"#E8E8E8",
                    border_color:"black",
                    text_color:"black",
                    border_thickness:1,
                    border_radius:2,
                    position_left:0,
                    position_top:0
                }; break;
            case "textfield":
                control={
                    id:id,
                    height:25,
                    width:160,
                    properties: "Input",
                    font_size:16,
                    background: "white",
                    border_color:"black",
                    text_color:"gray",
                    border_thickness:1,
                    border_radius:2,
                    position_left:0,
                    position_top:0
                };
        }
        wireframe.controls.push(control);
        this.setState({wireframe});
    }

    handleSelect=(control)=>{
        this.setState({selectedControl:control});
    }
    handleDeselect=()=>{
        this.setState({selectedControl:null})
    }

    handleDrag=(x, y, index)=>{
        var wireframe=this.state.wireframe;
        console.log("drag end x"+x);
        console.log("drag end y"+y);
        wireframe.controls[index].position_left=x;
        wireframe.controls[index].position_top=y;
        this.setState({wireframe,selectedControl:wireframe.controls[index]});
    }

    handleResize=(width, height,position, index)=>{
        var wireframe=this.state.wireframe;
        width=width.match(/\d+/g);
        height=height.match(/\d+/g);
        wireframe.controls[index]={...wireframe.controls[index], width:width, height:height, 
            position_left:position.x, 
            position_top:position.y}
        this.setState({wireframe, selectedControl:wireframe.controls[index]});
    }
    handleZoomIn=()=>{
        var wireframe=this.state.wireframe;
        if(wireframe.zoomLevel<2){
            wireframe.zoomLevel+=0.1;
            this.setState({wireframe: wireframe});
        }
    }

    handleZoomOut=()=>{
        var wireframe=this.state.wireframe;
        if(wireframe.zoomLevel>0.5){
            wireframe.zoomLevel-=0.1;
            this.setState({wireframe: wireframe});
        }
    }

    render() {
        const auth = this.props.auth;
        const {wireframe, selectedControl, width, height} = this.state;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if(!wireframe)
	        return <Redirect to="/" />
        return (
            <div className="pink lighten-5" onClick={(e)=>{this.handleDeselect()}}>
                <div className="row">
                    <div className="input-field col s6">
                        <label className={wireframe.name?"active":""} htmlFor="email">Name</label>
                        <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={wireframe.name} />
                    </div>
                    <div className="input-field col s6">
                        <label className={wireframe.owner?"active":""} htmlFor="password">Owner</label>
                        <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={wireframe.owner} />
                    </div>
                </div>
                <div className="row card horizontal">
                    <div className="toolPlace">
                    <div className="controlHead col s12">
                        <div className="col s2" onClick={()=>{this.handleZoomIn()}} style={wireframe.zoomLevel>=2?{opacity:0.3}:{}}>
                            <Icon>zoom_in</Icon>
                        </div>
                        <div className="col s2" onClick={()=>this.handleZoomOut()} style={wireframe.zoomLevel<=0.5?{opacity:0.3}:{}}>
                            <Icon>zoom_out</Icon>
                        </div>
                        <div className="col s2 offset-s4">save</div>
                        <div className="col s2">close</div>
                    </div>    
                    <div className="controlPlace col s12 center">
                        <div className="containerShape" id="container" onClick={this.handleAddControl}></div>
                        <div className="containerLabel">container</div>
                        <div className="labelShape" id="label" onClick={this.handleAddControl}>Promote for Input</div>
                        <div className="labelLabel">Label</div>
                        <div id="button" className="buttonShape" onClick={this.handleAddControl}>Submit</div>
                        <div className="buttonLabel">Button</div>
                        <div id="textfield" className="inputShape"onClick={this.handleAddControl}>Input</div>
                        <div className="inputLabel">Textfield</div>

                        <div className="input-field col s6">
                            <label className={wireframe.width?"active":""} htmlFor="digit">Width</label>
                            <input className="active" type="number" name="width" id="width" onChange={this.handleChangeDimension} value={width} />
                        </div>
                        <div className="input-field col s6">
                            <label className={wireframe.height?"active":""} htmlFor="digit">Height</label>
                            <input className="active" type="number" name="height" id="height" onChange={this.handleChangeDimension} value={height} />
                        </div>

                        <div className="center"><Button onClick={this.handleUpdate} style={
                            {opacity:(width==wireframe.width&&height==wireframe.height)||!width||!height?0.2:1}
                            }>Update</Button></div>
                        
                    </div>
                    </div>
                    <div className="col s6 showPlace hideOverflow">
                        <div className="wireframePlace hideOverflow" style={
                            {
                                width: wireframe.width+"px",
                                height: wireframe.height+"px",
                                transform: "translate(-50%, -50%) scale("+wireframe.zoomLevel+")",
                            }
                        }>
                        {wireframe.controls && wireframe.controls.map(control => (
                                <Control 
                                index={wireframe.controls.indexOf(control)}
                                selectedIndex={wireframe.controls.indexOf(this.state.selectedControl)}
                                control={control} 
                                select={this.handleSelect}
                                drag={this.handleDrag}
                                changeSize={this.handleResize}
                                zoomLevel={wireframe.zoomLevel}
                                >
                                </Control>
                            ))}
                        </div>
                    </div>
                    <div className="col s3 editPlace">
                        {!selectedControl?null:
                        <div onClick={(e)=>{e.stopPropagation()}}>
                        <div className={selectedControl.id==="container"?"hide":null}>Properties
                        <input className="browser-default" type="text" name="properties" id="properties" onChange={this.handleChangeControl} value={selectedControl.properties} />
                        </div>
                        <div className={selectedControl.id==="container"?"hide":null}>Font Size: 
                        <input className="browser-default" type="text" name="font_size" id="font_size" onChange={this.handleChangeControl} value={selectedControl.font_size} />
                        </div>
                        <div>
                            Background:
                            <input type="color" name="background" id="background" onChange={this.handleChangeControl} value={selectedControl.background}/>
                        </div>
                        <div>
                            Border Color:
                            <input type="color" name="border_color" id="border_color" onChange={this.handleChangeControl} value={selectedControl.border_color} />
                        </div>
                        <div className={selectedControl.id==="container"?"hide":null}>
                            Text Color:
                            <input type="color" name="text_color" id="text_color" onChange={this.handleChangeControl} value={selectedControl.text_color} />
                        </div>
                        <div>
                            Border Thickness:
                            <input className="browser-default" type="text" name="border_thickness" id="border_thickness" onChange={this.handleChangeControl} value={selectedControl.border_thickness}/>
                        </div>
                        <div>
                            Border Radius:
                            <input className="browser-default" type="text" name="border_radius" id="border_radius" onChange={this.handleChangeControl} value={selectedControl.border_radius} />
                        </div>
                        </div>}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log("state is ", state)
    const { id } = ownProps.match.params;
    const {wireframes}=state.firebase.profile;
    const wireframe=wireframes?wireframes[id]:null
    if(wireframe){
        wireframe.id=id;
    }
    return{
        wireframe,
        auth: state.firebase.auth
    }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect( [
    { collection:"users"}
  ]
  ),
)(WireframeScreen);