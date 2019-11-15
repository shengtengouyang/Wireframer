import React from 'react';
import { Link } from 'react-router-dom';

import {Button, Icon} from 'react-materialize';
class ItemCard extends React.Component {
    handleMoveUp=(e)=>{
        e.preventDefault();
    }
    handleMoveDown=(e)=>{
        e.preventDefault();
    }
    handleDelete=(e)=>{
        e.preventDefault();
    }
    render() {
        const { item } = this.props;  
        return (
            <div className="card z-depth-1 todo-list-link teal lighten-3 hoverable">
                <Link to='/'>
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
                        <Button onClick={this.handleMoveUp} floating icon={<Icon>arrow_upward</Icon>} className="hoverable green" />
                        <Button onClick={this.handleMoveDown} floating icon={<Icon>arrow_downward</Icon>} className="hoverable yellow darken-1" />
                        <Button onClick={this.handleDelete} floating icon={<Icon>close</Icon>} className="hoverable red" />
                    </Button>
                    
                </div>
                </Link>
            </div>
        );
    }
}
export default ItemCard;