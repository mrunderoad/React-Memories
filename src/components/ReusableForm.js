import React from "react";
import PropTypes from "prop-types";

function ReusableForm(props){
  return (
    <React.Fragment>
      <div>
        <form onSubmit={props.formSubmissionHandler}>
          <input
            type='text'
            name='name'
            placeholder='Title' />
          <input
            type='text'
            name='notes'
            placeholder='Memory' />
            <button type='submit'>{props.buttonText}</button>
        </form>
      </div>
    </React.Fragment>  
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;