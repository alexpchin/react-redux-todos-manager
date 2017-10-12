import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Todo = ({ text, completed, toggle, isLast }) => {
  const todoClass = classNames(
    'ph3 pv3 pointer bg-animate hover-bg-light-gray',
    {
      'bb b--light-silver': !isLast,
      'strike i': completed
    }
  )

  return (
    <li className={todoClass} onClick={() => toggle()}>{text}</li> // eslint-disable-line jsx-a11y/no-static-element-interactions
  )
}

Todo.propTypes = {
  text: PropTypes.string.isRequired,
  isLast: PropTypes.bool,
  completed: PropTypes.bool,
  toggle: PropTypes.func
}

export default Todo
