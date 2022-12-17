import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';

export default function DropdownMenuMaker({ data, val }) {
  let listOptions = <option>Disabled</option>;
  if (data) {
    listOptions = data.map((optionName) => (
      <Dropdown.Item eventKey={optionName} key={optionName} active={val === `${optionName}`} style={(val === `${optionName}`) ? { backgroundColor: '#01B636' } : {}}>
        {optionName}
      </Dropdown.Item>
    ));
  }
  return (
    <Dropdown.Menu variant="dark">
      { listOptions }
    </Dropdown.Menu>
  );
}

DropdownMenuMaker.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  val: PropTypes.string.isRequired,
};
