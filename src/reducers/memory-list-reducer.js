import * as c from './../actions/ActionTypes';

const memoryListReducer = (state = {}, action) => {
  const { id, formattedWaitTime } = action;
  switch (action.type) {
  case c.DELETE_MEMORY:
    let newState = { ...state };
    delete newState[id];
    return newState;
  case c.UPDATE_TIME:
    const newMemory = Object.assign({}, state[id], {formattedWaitTime});
    const updatedState = Object.assign({}, state, {
      [id]: newMemory
    });
    return updatedState;
  default:
    return state;
  }
};

export default memoryListReducer;