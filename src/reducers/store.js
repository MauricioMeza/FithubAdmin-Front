import {createStore} from "redux"
import reducerStore from './mainReducer';

const store = createStore(reducerStore, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store