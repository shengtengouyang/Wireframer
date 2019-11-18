import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';

class ItemsList extends React.Component {
    sort=(e)=>{
        const { target } = e;
        const id=target.id;
        const todoList = this.props.todoList;
        const items = todoList.items;
        console.log("items before sort", items);
        for(var i=0; i<items.length-1; i++){
            if(items[i][id]>items[i+1][id]){
                this.sortByDesc(id, items);
                return;
            }
        }
        this.sortByAsce(id, items);
    }
    sortByDesc=(id, items)=>{
        console.log("items before sort: ", items)
        items.sort((a,b)=>{
            if(a[id]<b[id]){
                return -1;
            }
            if(a[id]>b[id]){
                return 1;
            }
            return 0;
        })
        console.log("items after desc sort: ", items)
        this.firestoreUpdate(items);
    }
    sortByAsce=(id,items)=>{
        items.sort((a,b)=>{
            if(a[id]<b[id]){
                return 1;
            }
            if(a[id]>b[id]){
                return -1;
            }
            return 0;
        })

        console.log("items after asce sort: ", items)
        this.firestoreUpdate(items);
    }
    firestoreUpdate=(items)=>{
        const todoList = this.props.todoList;
        items.map(item=>{item.key=items.indexOf(item);item.id=item.key;return item;})
        const firestore=getFirestore();
        firestore.collection("todoLists").doc(todoList.id).set({
            ...todoList,
            items:items,
        })
    }
    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                <div className={"row itemsHeader lime darken-2 z-depth-1"}>
                    <h5 className="col s3 toolbar" id="description" onClick={this.sort}>Task</h5>
                    <h5 className="col s3 toolbar" id="due_date" onClick={this.sort}>Due Date</h5>
                    <h5 className="col s3 toolbar" id="completed"onClick={this.sort}>Status</h5>
                </div>
                {items && items.map(function(item) {
                    item.id = item.key;
                    return (
                        <ItemCard todoList={todoList} item={item} key={item.id} />
                    );})
                }
                <div className="center-align">
                <Link to={"/todoList/"+todoList.id+"/item/-1"} className="btn-floating btn-large waves-effect waves-light red hoverable">
                    <i className="material-icons">add</i>
                </Link>
            </div></div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists', orderBy: ['date', 'desc'] },
    ]),
)(ItemsList);