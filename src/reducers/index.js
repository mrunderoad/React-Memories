import formVisibleReducer from './form-visible-reducer';
import memoryListReducer from './memory-list-reducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  mainMemoryList: memoryListReducer,
  firestore: firestoreReducer
});

export default rootReducer;