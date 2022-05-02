import React from "react";
import PropTypes from "prop-types";

function Memory(props){
  return (
    <React.Fragment>
      <div onClick = {() => props.whenMemoryClicked(props.id)}>
        <h2>{props.name}</h2>
        <p>{props.notes}</p>
        <p><em>{props.formattedWaitTime}</em></p>
      </div>
    </React.Fragment>
  );
}

Memory.propTypes = {
  name: PropTypes.string,
  notes: PropTypes.string,
  id: PropTypes.string,
  whenMemoryClicked: PropTypes.func,
  formattedWaitTime: PropTypes.string
};

export default Memory;