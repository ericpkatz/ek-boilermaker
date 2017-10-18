import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import axios from 'axios'

const providersReducer = (state = [], action) => {
  if(action.type === 'SET_PROVIDERS'){
    state = action.providers
  }
  return state;
}

const fetchProviders = ()=> {
  return (dispatch)=> {
    axios.get('/api/providers')
      .then( response => {
        dispatch({
          type: 'SET_PROVIDERS',
          providers: response.data
        });
      });
  }
};

const reducer = combineReducers({
  user,
  providers: providersReducer
});

const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export { fetchProviders }
