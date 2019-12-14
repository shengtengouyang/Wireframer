import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import WireframeLinks from './WireframeLinks';
import { getFirestore } from 'redux-firestore';
class HomeScreen extends Component {
    handleNewList=(e)=>{
        const newWireframe={
            name:'unknown',
            owner:'unknown',
            width: 450,
            height: 450,
            zoomLevel:1,
            controls:[]
        }
        const wireframes=this.props.wireframes;
        console.log(wireframes);
        const firestore=getFirestore();
        wireframes.unshift(newWireframe);
        for(var x=0; x<wireframes.length;x++){
            wireframes[x].key=x;
        }
        firestore.collection("users").doc(this.props.auth.uid).update({wireframes}).then(()=>{
            this.props.history.push('/wireframe/'+newWireframe.key);
        })
    }
    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <WireframeLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            Best <br/>
                            <h5 className="col offset-s9" style={{marginBottom:"-5%"}}>TM</h5>
                            Wireframer
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New Wireframe
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("state in homescreen", state)
    return {
        auth: state.firebase.auth,
        wireframes: state.firebase.profile.wireframes
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users'},
      ]),
)(HomeScreen);