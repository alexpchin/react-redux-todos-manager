import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router';

const FilterLink = ({ filter, children, params: { listID } }) => (
  <Link
    to={filter === 'all' ? `/lists/${listID}/` : `/lists/${listID}/${filter}`}
    activeStyle={{
      textDecoration: 'none',
      color: 'black',
    }}
  >
    {children}
  </Link>
);

FilterLink.propTypes = {
  filter: PropTypes.oneOf(['all', 'completed', 'active']).isRequired,
  children: PropTypes.node.isRequired,
  params: PropTypes.any,
};

export default withRouter(FilterLink);
