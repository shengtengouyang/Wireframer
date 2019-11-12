import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks';
import {createTodoList} from '../../store/database/asynchHandler'
import { getFirestore } from 'redux-firestore';
class HomeScreen extends Component {
    handleNewList=(e)=>{
        const newTodo={
            name:'',
            owner:'',
            items:[],
            date: new Date()
        }
        const firestore=getFirestore();
        firestore.collection('todoLists').add(newTodo).then((docRef)=>{
            this.props.history.push('/todoList/'+docRef.id)
        })
        // this.props.createTodoList(newTodo);
    }
    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New To Do List
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
        createTodoList: todoList=>{
            dispatch(createTodoList(todoList));
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'todoLists', orderBy: ['date', 'desc']},
    ]),
)(HomeScreen);