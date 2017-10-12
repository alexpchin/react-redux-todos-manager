import { put, fork, call, take } from 'redux-saga/effects'
import { normalize } from 'normalizr'
import api from 'config/api'
import * as actions from 'App/stores/resources/actions'
import t from 'App/stores/resources/actions/constants'
import * as schema from '../schema'

export function * receiveResponse (response) {
  if (response.ok) {
    let list = []
    if (response.data.lists) {
      list = normalize(response.data.lists, schema.list)
    }
    if (response.data.list) {
      list = normalize(response.data.list, schema.list)
    }
    yield put(actions.setEntity(list, { type: 'lists' }))
  } else {
    const error = response.data.error
    yield put(actions.requestFailure(error, { type: 'lists' }))
  }
}

export function * fetchLists () {
  while (true) {
    const action = yield take(t.FETCH_ENTITIES)
    if (action.meta && action.meta.type === 'lists') {
      const response = yield call(api.get, '/lists')
      yield fork(receiveResponse, response)
    }
  }
}

export function * fetchList () {
  while (true) {
    const action = yield take(t.FETCH_ENTITY)
    if (action.meta && action.meta.type === 'lists' && action.meta.listID) {
      const response = yield call(api.get, `/lists/${action.meta.listID}`)
      yield fork(receiveResponse, response)
    }
  }
}

export function * addList () {
  while (true) {
    const action = yield take(t.SUBMIT_ENTITY)
    if (action.meta && action.meta.type === 'lists' && !action.meta.parentId) {
      const list = {
        ...action.payload
      }
      const response = yield call(api.post, '/lists', { ...list })
      yield fork(receiveResponse, response)
    }
  }
}

/*
 * Watchers
 */

export default function * watchLists () {
  yield [
    fork(addList),
    fork(fetchList),
    fork(fetchLists)
  ]
}
