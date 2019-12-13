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

    handleSelect=(control)=>{
        this.setState({selectedControl:control});
    }
    handleDeselect=()=>{
        this.setState({selectedControl:null})
    }

    handleDrag=(x, y, index)=>{
        var wireframe=this.state.wireframe;
        wireframe.controls[index].position_left=x;
        wireframe.controls[index].position_top=y;
        this.setState({wireframe: wireframe});
    }

    handleResize=(width, height,position, index)=>{
        var wireframe=this.state.wireframe;
        width=width.match(/\d+/g);
        height=height.match(/\d+/g);
        wireframe.controls[index]={...wireframe.controls[index], width:width, height:height, 
            position_left:position.x, 
            position_top: position.y}
        this.setState({wireframe: wireframe});
    }

    render() {
        const auth = this.props.auth;
        const wireframe = this.state.wireframe;
        const selectedControl=this.state.selectedControl;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if(!wireframe)
	        return <Redirect to="/" />
        return (
            <div className="pink lighten-5">
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
                        <div className="col s2">
                            <Icon>zoom_in</Icon>
                        </div>
                        <div className="col s2">
                            <Icon>zoom_out</Icon>
                        </div>
                        <div className="col s2 offset-s4">save</div>
                        <div className="col s2">close</div>
                    </div>    
                    <div className="controlPlace col s12 center">
                        <div className="containerShape"></div>
                        <div className="containerLabel">container</div>
                        <div>Promote for Input</div>
                        <div className="labelLabel">Label</div>
                        <button className="buttonShape">Submit</button>
                        <div className="buttonLabel">Button</div>
                        <input className="inputShape browser-default" type="text" placeholder="Input" readOnly onClick={()=>{alert("bbb")}}></input>
                        <div className="inputLabel">Textfield</div>

                        <div className="input-field col s6">
                            <label className={wireframe.width?"active":""} htmlFor="digit">Width</label>
                            <input className="active" type="number" name="width" id="width" onChange={this.handleChange} value={wireframe.width} />
                        </div>
                        <div className="input-field col s6">
                            <label className={wireframe.height?"active":""} htmlFor="digit">Height</label>
                            <input className="active" type="number" name="height" id="height" onChange={this.handleChange} value={wireframe.height} />
                        </div>

                        <div className="center"><Button>Update</Button></div>
                        
                    </div>
                    </div>
                    <div className="col s6 showPlace hideOverflow">
                        <div className="wireframePlace hideOverflow" style={
                            {
                                width: wireframe.width,
                                height:wireframe.height,
                            }
                        }>
                        {wireframe.controls && wireframe.controls.map(control => (
                                <Control 
                                index={wireframe.controls.indexOf(control)}
                                selectedIndex={wireframe.controls.indexOf(this.state.selectedControl)}
                                control={control} 
                                select={this.handleSelect}
                                deselect={this.handleDeselect}
                                drag={this.handleDrag}
                                changeSize={this.handleResize}
                                >
                                </Control>
                            ))}
                        </div>
                    </div>
                    <div className="col s3 editPlace z-depth-999">
                        {!selectedControl?null:
                        <div>
                        <div>Properties
                        <input className="browser-default" type="text" name="properties" id="properties" onChange={this.handleChange} value={selectedControl.properties} />
                        </div>
                        <div>Font Size: 
                        <input className="browser-default" type="text" name="font_size" id="font_size" onChange={this.handleChange} value={selectedControl.font_size} />
                        </div>
                        <div>
                            Background:
                            <input type="color" name="background" id="background" onChange={this.handleChange} value={selectedControl.background}/>
                        </div>
                        <div>
                            Border Color:
                            <input type="color" name="border_color" id="border_color" onChange={this.handleChange} value={selectedControl.border_color} />
                        </div>
                        <div>
                            Text Color:
                            <input type="color" name="text_color" id="text_color" onChange={this.handleChange} value={selectedControl.text_color} />
                        </div>
                        <div>
                            Border Thickness:
                            <input className="browser-default" type="text" name="border_thickness" id="border_thickness" onChange={this.handleChange} value={selectedControl.border_thickness}/>
                        </div>
                        <div>
                            Border Radius:
                            <input className="browser-default" type="text" name="border_radius" id="border_radius" onChange={this.handleChange} value={selectedControl.border_radius} />
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