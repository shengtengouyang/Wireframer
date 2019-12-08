import React from 'react';

class WireframeCard extends React.Component {

    render() {
        const { wireframe } = this.props;
        console.log("WireframeCard, Wireframe.id: " + wireframe.id);
        return (
            <div className="card z-depth-1 todo-list-link teal lighten-3 hoverable">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title hideOverflow">{wireframe.name}</span>
                </div>
            </div>
        );
    }
}
export default WireframeCard;