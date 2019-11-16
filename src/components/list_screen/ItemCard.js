import React from 'react';
import { Link } from 'react-router-dom';

import {Button, Icon} from 'react-materialize';
import { getFirestore } from 'redux-firestore';
class ItemCard extends React.Component {
    handleMoveUp=(e)=>{  
        e.preventDefault();
        const { item, todoList } = this.props;
        if(item.key===0){
            return;
        }
        todoList.items[item.key]=todoList.items[item.key-1];
        todoList.items[item.key-1]=item;
        this.reorderKey();
        const firestore=getFirestore();
        firestore.collection("todoLists").doc(todoList.id).set({
            ...todoList
        })
    }
    handleMoveDown=(e)=>{
        e.preventDefault();
        const { item, todoList } = this.props;  
        if(item.key===todoList.items.length-1){
            return;
        }
        todoList.items[item.key]=todoList.items[item.key+1];
        todoList.items[item.key+1]=item;
        this.reorderKey();
        const firestore=getFirestore();
        firestore.collection("todoLists").doc(todoList.id).set({
            ...todoList
        })
    }
    handleDelete=(e)=>{
        e.preventDefault();
        const { item, todoList } = this.props;  
        todoList.items.splice(item.key, 1);
        this.reorderKey();
        const firestore=getFirestore();
        firestore.collection("todoLists").doc(todoList.id).set({
            ...todoList
        })
    }
    reorderKey(){
        const {todoList}=this.props;
        console.log("current todoList is ",todoList);
        if(todoList){
            todoList.items.map(function(item){
                item.key=todoList.items.indexOf(item);
                item.id=item.key;
                return item;
            })
        }
    }
    render() {
        const { item, todoList } = this.props;  
        return (
            <div className="card z-depth-1 todo-list-link teal lighten-3 hoverable">
                <Link to={'/todoList/'+todoList.id+'/item/'+item.id}>
                <div className="card-content grey-text text-darken-3">
                    
                    <div className="row">
                        <span className={"card-title col"}>{item.description}</span>
                    </div> 
                    <div className="row">
                        <span className="col s3">{'Assigned To: '+item.assigned_to} </span>
                        <span className="col s3">{item.due_date}</span>
                        <span className={"col s3 "+(item.completed?"green-text":"red-text")}>
                            {item.completed?'Completed':'Pending'}</span>
                    </div>        
                    <Button
                        floating
                        fab={{direction: 'left'}}
                        className="blue lighten-2 right"
                        large
                    >
                        <Button onClick={this.handleMoveUp}floating icon={<Icon>arrow_upward</Icon>} 
                            className={(item.key===0)?"pink lighten-5":"green hoverable"} />
                        <Button onClick={this.handleMoveDown} floating icon={<Icon>arrow_downward</Icon>} 
                            className={(item.key===todoList.items.length-1)?"pink lighten-5":"yellow darken-1 hoverable"} />
                        <Button onClick={this.handleDelete} floating icon={<Icon>close</Icon>} className="hoverable red" />
                    </Button>
                    
                </div>
                </Link>
            </div>
        );
    }
}
export default ItemCard;