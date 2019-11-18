
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import {Checkbox} from 'react-materialize';
import Button from 'react-materialize/lib/Button';
import { Link } from 'react-router-dom';
class ItemScreen extends Component {
    state={
        item:this.props.item,
    }
    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            item:{...this.state.item, [target.id]:target.value},
        }));
        console.log("item after change: ", this.state.item);
    }
    handleCheck=()=>{
        this.setState({item:{...this.state.item, completed:!this.state.item.completed}});
    }
    handleSubmit=()=>{
        const item=this.state.item;
        const todoList=this.props.todoList;
        const firestore=getFirestore();
        const items=todoList.items;
        items[item.key]=item;
        firestore.collection("todoLists").doc(todoList.id).set({
            ...todoList,
            items:items,
        })
    }
    render(){
        const auth = this.props.auth;
        // if(Object.keys(this.state.item).length===0){
        //     this.setState({item: this.props.item});
        // }
        const item=this.state.item;
        const todoList=this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if(!todoList)
	        return <Redirect to="/" />
        if(!item)
            return <Redirect to="/" />
        return (
            <div className="container pink lighten-5">
                <div className="row">
                    <h5 className="grey-text text-darken-3 col s2">Item</h5>
                </div>
                <div className="input-field">
                    <label className="active">Description</label>
                    <input className="active" type="text" name="description" id="description" onChange={this.handleChange} value={item.description} />
                </div>
                <div className="input-field">
                    <label className="active">Assigned To:</label>
                    <input className="active" type="text" name="assigned_to" id="assigned_to" onChange={this.handleChange} value={item.assigned_to} />
                </div>
                <div className="input-field">
                    <label className="active">Due Date</label>
                    <input className="active" type="date" name="due_date" id="due_date" onChange={this.handleChange} value={item.due_date?item.due_date:'mm/dd/yyyy'} />
                </div>
                <Checkbox value="Completed" label="Completed" checked={item.completed} onChange={this.handleCheck}/>
                <div>
                <Link to={'/todoList/'+todoList.id} onClick={this.handleSubmit}>
                <Button waves="light" style={{marginRight: '5px'}} >
                            Submit
                </Button>
                </Link>
                <Link to={'/todoList/'+todoList.id}>
                <Button waves="light" style={{marginRight: '5px'}}>
                            Cancel
                </Button></Link>
                </div>
            </div>
        );
    }
    

}
const mapStateToProps = (state, ownProps) => {
    const { id, key } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;
    var item=null;
    if(todoList){
        todoList.id = id;
        item=todoList.items[key];
    
    if(!item){
        item={description:'unknown', assigned_to:'unknown', due_date:'mm/dd/yyyy', completed:false, key:todoList.items.length}
        }
    }
    return {
      todoList,
      item,
      auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists', orderBy: ['date', 'desc'] },
    ]),
  )(ItemScreen);