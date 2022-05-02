import React from 'react';
import NewMemoryForm from './NewMemoryForm';
import MemoryList from './MemoryList';
import MemoryDetail from './MemoryDetail';
import EditMemoryForm from './EditMemoryForm';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';
import { withFirestore, isLoaded } from 'react-redux-firebase';

class MemoryControl extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      selectedMemory: null,
      editing: false
    };
  }

  componentWillUnmount(){
    clearInterval(this.waitTimeUpdateTimer);
  }

  handleClick = () => {
    if (this.state.selectedMemory != null) {
      this.setState({
        selectedMemory: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  }

  handleAddingNewMemoryToList = () => {
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
  }

  handleChangingSelectedMemory = (id) => {
    this.props.firestore.get({ collection: 'memories', doc: id }).then((memory) => {
      const firestoreMemory = {
        name: memory.get("name"),
        notes: memory.get("notes"),
        id: memory.id
      }
      this.setState({selectedMemory: firestoreMemory});
    });    
  }

  handleEditClick = () => {
    this.setState({editing: true});
  }

  handleEditingMemoryInList = () => {
    this.setState({
      editing: false,
      selectedMemory: null
    });
  }

  handleDeletingMemory = (id) => {
    this.props.firestore.delete({ collection: 'memories', doc: id });
    this.setState({selectedMemory});
  }

  render(){
    const auth = this.props.firebase.auth();
    if (!isLoaded(auth)) {
      return (
        <React.Fragment>
          <h1 className="text-center">LoAdInG...</h1>
        </React.Fragment>
      )
    }
    if ((isLoaded(auth)) && (auth.currentUser == null)) {
      return (
        <React.Fragment>
          <h1>You must be signed in to access your memories..</h1>
        </React.Fragment>
    )}
    if ((isLoaded(auth)) && (auth.currentUser != null)) {
      let currentlyVisibleState = null;
      let buttonText = null;
      if (this.state.editing) {
        currentlyVisibleState = <EditMemoryForm memory = {this.state.selectedMemory} onEditMemory = {this.handleEditingMemoryInList} />
        buttonText = "Return to Memory List";
      } else if (this.state.selectedMemory != null) {
        currentlyVisibleState = <MemoryDetail memory = {this.state.selectedMemory} onClickingDelete = {this.handleDeletingMemory} onClickingEdit = {this.handleEditClick} />
        buttonText = "Return to Memory List";
      } else if (this.props.formVisibleOnPage) {
        currentlyVisibleState = <NewMemoryForm onNewMemoryCreation={this.handleAddingNewMemoryToList} />
        buttonText = "Return to Memory List";
      } else {
        currentlyVisibleState = <MemoryList onMemorySelection={this.handleChangingSelectedMemory} />
        buttonText = "Add Memory";
      }
      return (
        <React.Fragment>
          {currentlyVisibleState}
          <div>
            <button onClick={this.handleClick}>{buttonText}</button>
          </div>
        </React.Fragment>
      );
    } 
  }
}

MemoryControl.propTypes ={
  mainMemoryList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    formVisibleOnPage: state.formVisibleOnPage
  }
}

MemoryControl = connect(mapStateToProps)(MemoryControl);

export default withFirestore(MemoryControl);