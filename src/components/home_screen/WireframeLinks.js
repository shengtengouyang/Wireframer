import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WireframeCard from './WireframeCard';
import { getFirestore } from 'redux-firestore';
import { firestoreConnect } from 'react-redux-firebase';

class WireframeLinks extends React.Component {
    render() {
        const auth=this.props.auth;
        const wireframes=this.props.wireframes;
        console.log("wireframes is", wireframes);
        return (
            <div className="todo-lists section">
                {wireframes && wireframes.map(wireframe => (
                    <Link to={'/wireframe/' + wireframe.key} key={wireframe.key} onClick={()=>{
                        const firestore=getFirestore();
                        wireframes[wireframe.key]={...wireframe, date: new Date()};
                        firestore.collection('users').doc(auth.uid).update({
                            wireframes:wireframes
                        })
                    }}>
                        <WireframeCard wireframe={wireframe} auth={auth}/>
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const auth= state.firebase.auth
    const users=state.firestore.data.users
    const wireframes=users?users[auth.uid]?users[auth.uid].wireframes:null:null;
    return {
        auth,
        wireframes,
    };
};

export default compose(connect(mapStateToProps),
)(WireframeLinks);