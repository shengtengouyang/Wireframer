import React from 'react';
import { Link } from 'react-router-dom';
class ItemCard extends React.Component {
    render() {
        const { item } = this.props;  
        return (
            <div className="card z-depth-1 todo-list-link teal lighten-3 hoverable">
                <Link to='/'>
                <div className="card-content grey-text text-darken-3">
                    
                <div className="row">
                    <span className={"card-title "+"col"}>{item.description}</span>
                </div> 
                <div className="row">
                    <span className="col s3">{'Assigned To: '+item.assigned_to} </span>
                    <span className="col s3">{item.due_date}</span>
                    <span className={"col s3 "+(item.completed?"green-text":"red-text")}>
                        {item.completed?'Completed':'Pending'}</span></div>
                </div>
                </Link>
            </div>
        );
    }
}
export default ItemCard;