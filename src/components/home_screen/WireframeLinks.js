import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WireframeCard from './WireframeCard';
import { getFirestore } from 'redux-firestore';

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
                        <WireframeCard wireframe={wireframe} />
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        wireframes: state.firestore.ordered.users?state.firestore.ordered.users.filter(user=>state.firebase.auth.uid===user.id)[0]?
        state.firestore.ordered.users.filter(user=>state.firebase.auth.uid===user.id)[0].wireframes:null:null,
    };
};

export default compose(connect(mapStateToProps))(WireframeLinks);