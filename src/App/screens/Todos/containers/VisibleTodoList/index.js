import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { makeSelectVisibleTodos, selectVisibleTodos } from 'App/stores/lists';
import * as actions from 'App/stores/resources/actions';
import TodoList from '../../components/TodoList';

class VisibleTodoList extends Component {

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter || this.props.params.listID !== prevProps.params.listID) {
      this.fetchData();
    }
  }

  fetchData() {
    const { fetchTodos, params: { listID } } = this.props;
    fetchTodos(listID);
  }

  render() {
    console.log('Rendering VisibleTodoList');
    const { toggleTodo, todos } = this.props;

    return (
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
      />
    );
  }
}

VisibleTodoList.propTypes = {
  filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  todos: PropTypes.array.isRequired,
  fetchTodos: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  params: PropTypes.any,
};

// const mapStateToProps = (state, { params }) => {
//   const filter = params.filter || 'all';
//   return {
//     todos: selectVisibleTodos(filter, params.listID)(state),
//     filter,
//     listID: params.listID || '',
//   };
// };

const makeMapStateToProps = () => {
  const getVisibleTodos = makeSelectVisibleTodos();
  const mapStateToProps = (state, props) => {
    const filter = props.params.filter || 'all';
    return {
      todos: getVisibleTodos(state, props),
      filter,
      listID: props.params.listID || '',
    };
  };
  return mapStateToProps;
};


const mapDispatchToProps = dispatch => ({
  toggleTodo: (todo, completed) => dispatch(actions.updateEntity({ ...todo, completed }, { type: 'todos' })),
  fetchTodos: listID => dispatch(actions.fetchEntity({}, { type: 'lists', listID })),
});

export default withRouter(connect(
  // mapStateToProps,
  makeMapStateToProps,
  mapDispatchToProps
)(VisibleTodoList));
