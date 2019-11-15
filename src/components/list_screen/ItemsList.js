import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';

class ItemsList extends React.Component {
    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                <div className={"row itemsHeader lime darken-2 z-depth-1"}>
                    <h5 className="col s3">Task</h5>
                    <h5 className="col s3">Due Date</h5>
                    <h5 className="col s3">Status</h5>
                </div>
                {items && items.map(function(item) {
                    item.id = item.key;
                    return (
                        <ItemCard todoList={todoList} item={item} key={item.id} />
                    );})
                }
                <div className="center-align">
                <button className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></button>
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
        { collection: 'todoLists' },
    ]),
)(ItemsList);