import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";
import { useFirestore } from "react-redux-firebase";
import { updateLocale } from "moment";

function EditMemoryForm(props){
  const firestore = useFirestore();
  const { memory } = props;

  function handleEditMemoryFormSubmission(event){
    event.preventDefault();
    props.onEditMemory();
    const propertiesToUpdate = {
      name: event.target.name.value,
      notes: event.target.notes.value,
    }
    return firestore.update({ collection: 'memories', doc: memory.id }, propertiesToUpdate);
  }

  return (
    <React.Fragment>
      <ReusableForm
        formSubmissionHandler={handleEditMemoryFormSubmission}
        buttonText="Update Memory" />
    </React.Fragment>
  );
}

EditMemoryForm.propTypes = {
  memory: PropTypes.object,
  onEditMemory: PropTypes.func
};

export default EditMemoryForm;