import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import {Button, Modal, Icon} from 'react-materialize';

class WireframeScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    handleChange = (e) => {
        const { target } = e;
        const auth=this.props.auth;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        const firestore=getFirestore();
        firestore.collection('users').doc(auth.uid).collection('wireframes').set({
            ...this.props.wireframe,
            [target.id]: target.value
        })
    }
    handleModalYes=()=>{
        const firestore=getFirestore();
        firestore.collection('todoLists').doc(this.props.todoList.id).delete();
    }

    render() {
        const auth = this.props.auth;
        const wireframe = this.props.wireframe;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if(!wireframe)
	        return <Redirect to="/" />
        return (
            <div className="container pink lighten-5">
                <div className="row">
                    <h5 className="grey-text text-darken-3 col s2">wireframe</h5>
                    <Modal header="Delete list?"
                        options={{dismissible:false}}
                        trigger={<Button className="col offset-s9 btn-large red hoverable"><Icon large>delete</Icon></Button>}
                        actions={
                            <p className="left" style={{padding:'0 0 0 20px'}}>The list will not be retreivable.</p>}
                        >
                        <p>Are you sure you want to delete this list?</p>  
                        <Button className="modal-close" waves="light" style={{marginRight: '5px'}} onClick={this.handleModalYes}>
                            Yes
                        </Button>
                        <Button className="modal-close" waves="light" style={{marginRight: '5px'}} onClick={()=>{}}>
                            No
                        </Button>
                    </Modal>
                </div>
                <div className="input-field">
                    <label className={wireframe.name?"active":""} htmlFor="email">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={wireframe.name} />
                </div>
                <div className="input-field">
                    <label className={wireframe.owner?"active":""} htmlFor="password">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={wireframe.owner} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log("state is ", state)
    const { id } = ownProps.match.params;
    if(state.firestore.data.users){
        const { wireframes } = state.firestore.data.users[state.firebase.auth.uid];
        const wireframe = wireframes ? wireframes[id] : null;
        if(wireframe){
            wireframe.id = id;
            return {
                wireframe,
                auth: state.firebase.auth,
            };
        }
    }
    return{
        wireframe: null,
        auth: state.firebase.auth,
    }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props=> [
    { collection:"users",
      doc: props.auth.uid,
      subcollections: [{collection:"wireframes", orderBy:['date', 'desc']}]
      }
  ]
  ),
)(WireframeScreen);