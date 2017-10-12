import { put, fork, call, take } from 'redux-saga/effects'
import { normalize } from 'normalizr'

import api from 'config/api'
import * as actions from 'App/stores/resources/actions'
import t from 'App/stores/resources/actions/constants'
import * as schema from '../schema'

/*
 * Subroutines
 */

export function * receiveResponse (response) {
  if (response.ok) {
    if (response.data.todo) {
      const todo = normalize(response.data.todo, schema.todo)
      yield put(actions.setEntity(todo, { type: 'todos' }))
    }
    if (response.data.todos) {
      const todos = normalize(response.data.todos, schema.todo)
      yield put(actions.setEntities(todos, { type: 'todos' }))
    }
  } else {
    const error = response.data.error
    yield put(actions.requestFailure(error, { type: 'todos' }))
  }
}

export function * fetchTodos () {
  while (true) {
    const action = yield take(t.FETCH_ENTITIES)
    if (action.meta && action.meta.type === 'todos' && action.meta.listID) {
      const response = yield call(api.get, `/lists/${action.meta.listID}`)
      yield fork(receiveResponse, response)
    }
  }
}

export function * addTodo () {
  while (true) {
    const action = yield take(t.SUBMIT_ENTITY)

    if (action.meta && action.meta.type === 'todos' && action.meta.parentId) {
      const todo = {
        ...action.payload,
        listID: action.meta.parentId
      }

      const response = yield call(api.post, '/todos', { ...todo })

      // fetch the new list
      if (response.ok) {
        yield put(actions.fetchEntity({}, { type: 'lists', listID: todo.listID }))
      }

      yield fork(receiveResponse, response)
    }
  }
}

export function * toggleTodo () {
  while (true) {
    const action = yield take(t.UPDATE_ENTITY)
    if (action.meta && action.meta.type === 'todos') {
      const todo = action.payload
      const response = yield call(api.put, `/todos/${todo.id}`, { ...todo })

      // fetch the new list
      if (response.ok) {
        yield put(actions.fetchEntity({}, { type: 'lists', listID: todo.listID }))
      }

      yield fork(receiveResponse, response)
    }
  }
}

/*
 * Watchers
 */

export default function * watchTodos () {
  yield [
    fork(addTodo),
    fork(toggleTodo),
    fork(fetchTodos)
  ]
}
