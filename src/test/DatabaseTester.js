import React from 'react'
import { connect } from 'react-redux';
import todoJson from './TestJson.json'
import { getFirestore } from 'redux-firestore';
import { Redirect } from 'react-router-dom'

class DatabaseTester extends React.Component {

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        const fireStore = getFirestore();
        const auth=this.props.auth;
        fireStore.collection('users').doc(auth.uid).update({wireframes:[]});
    }

    handleReset = () => {
        const fireStore = getFirestore();
        const firebase=this.props.firebase;
        const auth=this.props.auth;
        const wireframes=[];
        todoJson.wireframes.forEach(wireframeJson => {
            const wireframe={
                    key: wireframeJson.key,
                    name: wireframeJson.name,
                    owner: wireframeJson.owner,
                    width:wireframeJson.width,
                    height:wireframeJson.height,
                    controls:wireframeJson.controls,
                    user: auth.uid,
                    zoomLevel:wireframeJson.zoomLevel,
                    date: new Date()
                }
            wireframes.push(wireframe);
        });
        fireStore.collection('users').doc(auth.uid).update({
            wireframes,}
            ).then(() => {
                console.log("DATABASE RESET");
            }).catch((err) => {
                console.log(err);
            });
    }

    render() {
        const auth = this.props.auth;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        return (
            <div>
                <button onClick={this.handleClear}>Clear Database</button>
                <button onClick={this.handleReset}>Reset Database</button>
            </div>)
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        firebase: state.firebase
    };
}

export default connect(mapStateToProps)(DatabaseTester);