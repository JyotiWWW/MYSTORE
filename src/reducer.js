import { combineReducers } from 'redux'
import cartReducer from './redux/reducers/cartReducer'
// import filtersReducer from './features/filters/filtersSlice'

const rootReducer = combineReducers({
  cart: cartReducer
//   filters: filtersReducer,
})
export default rootReducer