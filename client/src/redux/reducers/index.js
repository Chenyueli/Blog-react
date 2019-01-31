import {
  combineReducers
} from 'redux';
import {
booklist
} from './list';
import {
  counter
} from './counter'

const appReducer = combineReducers({
  booklist, counter
})

export default appReducer
