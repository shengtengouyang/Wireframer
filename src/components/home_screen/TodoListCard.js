import React from 'react';

class TodoListCard extends React.Component {

    render() {
        const { todoList } = this.props;
        console.log("TodoListCard, todoList.id: " + todoList.id);
        return (
            <div className="card z-depth-1 todo-list-link teal lighten-3 hoverable">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title hideOverflow">{todoList.name}</span>
                </div>
            </div>
        );
    }
}
export default TodoListCard;