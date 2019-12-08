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
                    <Link to={'/wireframe/' + wireframe.id} key={wireframe.id} onClick={()=>{
                        const firestore=getFirestore();
                        firestore.collection('users').doc(auth.uid).collection('wireframes').doc(wireframe.id).set({
                            ...wireframe,
                            date:new Date()
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
    const wireframes=state.firestore.ordered.users?state.firestore.ordered.users[0]?state.firestore.ordered.users[0].wireframes?
    state.firestore.ordered.users[0].wireframes:(state.firestore.ordered.users[1].wireframes?
        state.firestore.ordered.users[1].wireframes:state.firestore.ordered.users):null:null
    console.log("wireframe in wireframe links state", wireframes)
    return {
        auth,
        wireframes,
    };
};

export default compose(connect(mapStateToProps),
    firestoreConnect(props=> [
        { collection:'users',
        doc: props.auth.uid,
        subcollections: [{collection:"wireframes", orderBy:['date', 'desc']}]
        }
    ])
)(WireframeLinks);