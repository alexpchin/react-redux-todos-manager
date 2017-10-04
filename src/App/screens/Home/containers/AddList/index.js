import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

const AddList = ({ handleSubmit }) =>
  (<form
    className="mw6 center pa4 mb4 br2 ba b--light-silver"
    onSubmit={handleSubmit}
  >
    <fieldset className="cf bn ma0 pa0">
      <legend className="pa0 f5 f4-ns mb3 black-80">Add list</legend>
      <div className="cf">
        <Field
          className="f6 f5-l input-reset fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2 br--left ba b--light-silver"
          placeholder="New list"
          name="list"
          type="text"
          component="input"
        />

        <button
          className="f6 f5-l button-reset fl pv3 tc bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2 br--right ba b--black-70"
          type="submit"
        >
          Add
        </button>
      </div>
    </fieldset>
  </form>);

AddList.propTypes = {
  handleSubmit: PropTypes.func,
};


export default reduxForm({ form: 'addList' })(AddList);
