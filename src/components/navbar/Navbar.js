import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import LoggedInLinks from './LoggedInLinks';
import LoggedOutLinks from './LoggedOutLinks';
import { registerSuccess } from '../../store/actions/actionCreators'
class Navbar extends React.Component {

  goHome=()=>{
    const firestore=getFirestore();
    this.props.clearError();
    if(this.props.auth.uid){
    firestore.collection("users").doc(this.props.auth.uid).get().then((doc)=>
      {
        var wireframes=doc.data().wireframes;
        for(var x=0; x<wireframes.length;x++){
          wireframes[x].zoomLevel=1;
        }
        firestore.collection("users").doc(this.props.auth.uid).update({wireframes})
      }
  );}
}
  render() {
    const { auth, profile } = this.props;
    const links = auth.uid ? <LoggedInLinks profile={profile} /> : <LoggedOutLinks />;

    return (
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          <Link to="/" className="brand-logo" onClick={this.goHome}>Wireframer!</Link>
          {links}
          <Link to="/databaseTester" className="right" style={!auth.uid||profile.UIDesigner?{opacity:0.3, cursor:'default'}:{}} 
          onClick={(e)=>{if(profile.UIDesigner||!auth.uid){e.preventDefault()}}}>Test</Link>
        </div>
      </nav>
    );
  };
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});
const mapDispatchToProps = dispatch => ({
  clearError: ()=>dispatch(registerSuccess()),
});
export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect( [
    { collection:"users"}
  ]
  ),
)(Navbar);