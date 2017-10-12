import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import todos from 'App/screens/Todos/stores'
import lists from 'App/screens/Lists/stores'

export default combineReducers({
  todos,
  lists,
  form: formReducer
})
