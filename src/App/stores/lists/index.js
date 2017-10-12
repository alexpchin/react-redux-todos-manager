import { createSelector } from 'reselect'
import createResource, * as fromResource from '../resources'

const lists = createResource('lists')

export default lists

export const selectLists = createSelector(
  state => state,
  state => fromResource.getEntities('lists')(state)
)

export const selectList = listID => createSelector(
  state => state,
  state => fromResource.getEntity('lists', listID)(state)
)

export const selectListName = listID => createSelector(
  state => selectList(listID)(state),
  list => list.name
)

export const selectAllTodos = listID => createSelector(
  state => state,
  state => selectList(listID)(state),
  (state, list) => {
    if (!list.todos || list.todos.length < 1) return []
    return list.todos.map(todo => fromResource.getEntity('todos', todo.id)(state))
  }
)

// filtering todos instead of mapping list.todos
// export const selectAllTodos = listID => createSelector(
//   state => state,
//   state => (fromResource.getEntities('todos')(state)).filter(todo => todo.listID === listID),
// );

// without "make"
// export const selectVisibleTodos = (filter, listID) => createSelector(
//   state => state,
//   state => selectAllTodos(listID)(state),
//   (state, allTodos) => {
//     console.log('Calculating selector...');
//     switch (filter) {
//       case 'all':
//         return allTodos;
//       case 'completed':
//         return allTodos.filter(t => t.completed);
//       case 'active':
//         return allTodos.filter(t => !t.completed);
//       default:
//         throw new Error(`Unknown filter: ${filter}.`);
//     }
//   }
// );

export const makeSelectVisibleTodos = () => {
  return createSelector(
    (state, props) => selectAllTodos(props.params.listID)(state),
    (state, props) => props.params.filter || 'all',
    (allTodos, filter) => {
      console.log('Calculating selector...')
      switch (filter) {
        case 'all':
          return allTodos
        case 'completed':
          return allTodos.filter(t => t.completed)
        case 'active':
          return allTodos.filter(t => !t.completed)
        default:
          throw new Error(`Unknown filter: ${filter}.`)
      }
    }
  )
}
