import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import titleCaseConverter from '../../utils/titleCaseConverter';

export default function OptionsMaker({ data }) {
  let listOptions = <option>Disabled</option>;
  if (data) {
    listOptions = data.map((optionName) => (
      <option key={optionName} value={optionName}>
        {titleCaseConverter(optionName)}
      </option>
    ));
  }
  return (
    <Form.Select defaultValue="Choose..." disabled={(data.length === 0)}>
      { listOptions }
    </Form.Select>
  );
}

OptionsMaker.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
};
