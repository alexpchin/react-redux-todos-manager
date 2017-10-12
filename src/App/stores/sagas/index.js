import { fork } from 'redux-saga/effects'

import watchTodos from 'App/screens/Todos/stores/sagas'
import watchLists from 'App/screens/Lists/stores/sagas'

export default function * sagas () {
  yield [
    fork(watchTodos),
    fork(watchLists)
  ]
}
