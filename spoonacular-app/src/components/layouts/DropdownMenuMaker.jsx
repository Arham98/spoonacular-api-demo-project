import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';

export default function DropdownMenuMaker({ data, val, defaultName }) {
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
      {(defaultName !== 'noLabel') && <Dropdown.Item eventKey="" key={defaultName} active={val === `${defaultName}`} style={(val === `${defaultName}`) ? { backgroundColor: '#01B636' } : {}}>{defaultName}</Dropdown.Item>}
      {(defaultName !== 'noLabel') && <Dropdown.Divider style={{ backgroundColor: 'grey' }} />}
      { listOptions }
    </Dropdown.Menu>
  );
}

DropdownMenuMaker.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  val: PropTypes.string.isRequired,
  defaultName: PropTypes.string.isRequired,
};
