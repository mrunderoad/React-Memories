import React from "react";
import Memory from "./Memory";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';

function MemoryList(props){
  
  useFirestoreConnect([
    { collection: 'memories' }
  ]);

  const memories = useSelector(state => state.firestore.ordered.memories);

  if(isLoaded(memories)) {
    return (
      <React.Fragment>
        <div className="grid grid-cols-5">
          {memories.map((memory) => {
            return <Memory 
            whenMemoryClicked = { props.onMemorySelection }
            name={Memory.name}
            notes={Memory.notes}
            formattedWaitTime={memory.formattedWaitTime}
            id={memory.id}
            key={memory.id}/>
        })}
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h1 className="text-center">Loading...</h1>
      </React.Fragment>
    )
  }
}

MemoryList.propTypes = {
  onMemorySelection: PropTypes.func
};

export default MemoryList;