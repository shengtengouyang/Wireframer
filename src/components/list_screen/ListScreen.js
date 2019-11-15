import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect, getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import {Button, Modal} from 'react-materialize';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        const firestore=getFirestore();
        firestore.collection('todoLists').doc(this.props.todoList.id).set({
            ...this.props.todoList,
            [target.id]: target.value
        })
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if(!todoList)
	        return <React.Fragment />
        return (
            <div className="container pink lighten-5">
                <div className="row">
                    <h5 className="grey-text text-darken-3 col s2">Todo List</h5>
                    <Modal header="Delete list?"
                        options={{dismissible:false}}
                        trigger={<i className="material-icons medium right col offset-s6">delete</i>}
                        actions={
                            <p className="left" style={{padding:'0 0 0 20px'}}>The list will not be retreivable.</p>}
                        >
                        <p>Are you sure you want to delete this list?</p>  
                        <Button waves="light" style={{marginRight: '5px'}}>
                            Yes
                        </Button>
                        <Button waves="light" style={{marginRight: '5px'}}>
                            No
                        </Button>
                    </Modal>
                </div>
                <div className="input-field">
                    <label className={todoList.name?"active":""} htmlFor="email">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                </div>
                <div className="input-field">
                    <label className={todoList.owner?"active":""} htmlFor="password">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
                </div>
                <ItemsList todoList={todoList} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  if(todoList)
	todoList.id = id;

  return {
    todoList,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);