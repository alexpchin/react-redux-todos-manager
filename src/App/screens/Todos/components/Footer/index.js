import React from 'react';
import { Link } from 'react-router';
import FilterLink from '../FilterLink';

const Footer = () => (
  <div className="center tc">
    <p className="center mw6 tc">
      Show:
      {' '}
      <FilterLink filter="all">
        All
      </FilterLink>
      {', '}
      <FilterLink filter="active">
        Active
      </FilterLink>
      {', '}
      <FilterLink filter="completed">
        Completed
      </FilterLink>
    </p>
    <Link
      to="/"
    >
      <span className="center tc mw6">Back to Home</span>
    </Link>

  </div>
);

export default Footer;
