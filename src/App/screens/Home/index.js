import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectLists } from 'App/stores/lists';
import * as actions from 'App/stores/resources/actions';
import Lists from './containers/Lists';
import AddList from './containers/AddList';

class Home extends Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { lists, addList } = this.props;

    return (
      <section className="pa3 pa5-ns">

        <h1 className="f3 bold center mw6 tc ttu">📌 TODOS MANAGER</h1>

        <AddList
          onSubmit={({ list }, _, { reset }) => {
            addList(list);
            reset();
          }}
        />

        <h1 className="f4 bold center mw6">All Lists</h1>

        <Lists lists={lists} />
      </section>
    );
  }
}

Home.propTypes = {
  lists: PropTypes.array,
  addList: PropTypes.func,
};

const mapStateToProps = state => ({
  lists: selectLists(state),
});

const mapDispatchToProps = dispatch => ({
  addList: name => dispatch(actions.submitEntity({ name }, { type: 'lists' })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
