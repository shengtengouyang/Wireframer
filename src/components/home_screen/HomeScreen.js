import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import WireframeLinks from './WireframeLinks';
import {createTodoList} from '../../store/database/asynchHandler'
import { getFirestore } from 'redux-firestore';
class HomeScreen extends Component {
    handleNewList=(e)=>{
        const newTodo={
            name:'unknown',
            owner:'unknown',
            items:[],
            date: new Date()
        }
        const firestore=getFirestore();
        firestore.collection('users').doc(this.props.auth.uid).collection("wireframes")
            .add(newTodo).then((docRef)=>{
            this.props.history.push('/wireframe/'+docRef.id)
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
                                      TM<br />
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
        auth: state.firebase.auth
    };
};

const mapDispatchToProps=(dispatch)=>{
    return{
        createTodoList: wireframe=>{
            dispatch(createTodoList(wireframe));
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props=>{ return [
      { collection:'users',
        doc: props.auth.uid,
        subcollections: [{collection:"wireframes", orderBy: ['date', 'desc']}]
        }
    ];
    })
)(HomeScreen);