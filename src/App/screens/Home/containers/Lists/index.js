import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router'
import classNames from 'classnames'
import * as actions from 'App/stores/resources/actions'

const sortByDate = arr => arr.sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)))

class Lists extends Component {
  componentDidMount () {
    this.fetchData()
  }

  fetchData () {
    const { fetchLists } = this.props
    fetchLists()
  }

  render () {
    const { lists } = this.props

    const sortedLists = lists && lists[0]
      ? sortByDate(lists)
      : null

    return (
      <ul className='list pl0 ml0 center mw6 ba b--light-silver br2'>
        {sortedLists
          ? lists.map((list, i) => (
            <Link className='link dim dark-gray' to={`/lists/${list.id}/`} key={i}>
              <li
                className={classNames('ph3 pv3 pointer bg-animate hover-bg-light-gray ', {
                  'bb b--light-silver': !((lists.length - 1) === i)
                })}
              >{list.name}
              </li>
            </Link>
          ))
          : <p className='ph3 pv3 tc'>No lists found</p>
        }
      </ul>
    )
  }
}

Lists.propTypes = {
  lists: PropTypes.array.isRequired,
  fetchLists: PropTypes.func.isRequired
}

export default withRouter(connect(
  null,
  dispatch => ({ fetchLists: () => dispatch(actions.fetchEntities({}, { type: 'lists' }))
  }))(Lists))
