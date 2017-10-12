import React from 'react'; import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as actions from 'App/stores/resources/actions'
import { selectListName } from 'App/screens/Lists/stores'
import AddTodo from './components/AddTodo'
import Footer from './components/Footer'
import VisibleTodoList from './components/VisibleTodoList'

const Todos = ({ todos, addTodo, listName, params: { listID } }) => (
  <section className='pa3 pa5-ns'>
    <h1 className='f3 bold center mw6 tc ttu'>{listName}</h1>

    <AddTodo
      onSubmit={({ todo }, _, { reset }) => {
        addTodo(todo, listID)
        reset()
      }}
    />

    <h1 className='f4 bold center mw6'>Todos</h1>

    <VisibleTodoList />

    <Footer />
  </section>
)

Todos.propTypes = {
  todos: PropTypes.array,
  addTodo: PropTypes.func,
  listName: PropTypes.string,
  params: PropTypes.any
}

const mapStateToProps = (state, ownProps) => ({
  listName: selectListName(ownProps.params.listID)(state)
})

const mapDispatchToProps = dispatch => ({
  addTodo: (text, listID) => {
    dispatch(actions.submitEntity({ text }, { type: 'todos', parentType: 'lists', parentId: listID }))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos)
