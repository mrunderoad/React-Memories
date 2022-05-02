import React from "react";
import PropTypes from "prop-types";
import reactLogo from "./../img/reactLogo.png";

function MemoryDetail(props){
  const { memory, onClickingDelete } = props;
  return (
    <React.Fragment>
      <div className="flex items-center justify-center">
        <div className="max-w-sm rounded overflow-hidden shadow-lg mt-2 mb-2">
          <div className="flex items-center justify-center">
            <img className="h-12 w-21" src={reactLogo} alt="React Logo" />
            <br/>
          </div>
          <div className="px-6 py-4">
            <p className="text-center text-gray-700 text-base"></p>
            <h1 className="text-center text-gray-700 text-base">Memory Detail</h1>
            <h3 className="text-center text-gray-700 text-base"> {memory.names}</h3>
            <p className="text-center text-gray-700 text-base"><em>{memory.notes}</em></p>
            <button className="bg-yellow-500 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-full" onClick={ props.onClickingEdit }>Update Memory</button>
            <button className="bg-yellow-500 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-full mt-2" onClick={()=> onClickingDelete(memory.id) }>Close Memory</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

MemoryDetail.propTypes = {
  memory: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default MemoryDetail;