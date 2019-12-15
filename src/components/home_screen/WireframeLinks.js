import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WireframeCard from './WireframeCard';
import { getFirestore } from 'redux-firestore';

import {Button, Modal} from 'react-materialize'
class WireframeLinks extends React.Component {
    handleModalYes=(wireframe)=>{
        const wireframes=this.props.wireframes;
        wireframes.splice(wireframe.key,1);
        for(var x=0; x<wireframes.length;x++){
            wireframes[x].key=x;
        }
        const firestore=getFirestore();
        firestore.collection("users").doc(this.props.auth.uid).update({wireframes});
    }
    handleEditWireframe=(key, wireframe)=>{
        const wireframes=this.props.wireframes;
        const index=this.props.wireframes.indexOf(wireframe);
        wireframes.splice(index,1);
        wireframes.unshift(wireframe);
        const firestore=getFirestore();
        firestore.collection("users").doc(this.props.auth.uid).update({wireframes});
    }
    render() {
        const auth=this.props.auth;
        const wireframes=this.props.wireframes;
        console.log("wireframes is", wireframes);
        return (
            <div className="todo-lists section">
                {wireframes && wireframes.map(wireframe => (
                    <div>
                    <Modal header="Delete Wireframe?" options={{dismissible:false}} trigger={<div><i onClick={()=>{}} className="close material-icons right" style={{position:"relative",zIndex:"1"}}>close</i></div>}
                        actions={<p className="left" style={{padding:'0 0 0 20px'}}>The wireframe will not be retreivable.</p>}>
                        <p>Are you sure you want to delete this wireframe?</p>  
                        <Button className="modal-close" waves="light" style={{marginRight: '5px'}} onClick={()=>this.handleModalYes(wireframe)}>Yes</Button>
                        <Button className="modal-close" waves="light" style={{marginRight: '5px'}}> No</Button></Modal>
                    <Link to={'/wireframe/'+wireframe.key} key={wireframe.key} onClick={()=>this.handleEditWireframe(wireframe.key, wireframe)}>
                        <WireframeCard wireframes={wireframes} wireframe={wireframe} auth={auth}/>
                    </Link>
                    </div>))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const auth= state.firebase.auth
    const {wireframes}=state.firebase.profile;
    return {
        auth,
        wireframes,
    };
};

export default compose(connect(mapStateToProps),
)(WireframeLinks);