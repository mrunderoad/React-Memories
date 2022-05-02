import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import { useFirestore } from 'react-redux-firebase';

function NewMemoryForm(props){

  const firestore = useFirestore();

  function addMemoryToFirestore(event){
    event.preventDefault();
    props.onNewTicketCreation();
    return firestore.collection('memories').add(
      {
        name: event.target.name.value,
        notes: event.target.notes.value,
        timeOpen: firestore.FieldValue.serverTimeStamp()
      }
    );
  }

  return (
    <React.Fragment>
      <ReusableForm
        formSubmissionHandler={addMemoryToFirestore}
        buttonText="Submit" />
    </React.Fragment>
  );
}

NewMemoryForm.propTypes = {
  onNewMemoryCreation: PropTypes.func
};

export default NewMemoryForm;