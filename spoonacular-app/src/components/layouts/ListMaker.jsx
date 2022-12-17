import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import titleCaseConverter from '../../utils/titleCaseConverter';

export default function ListMaker({ data }) {
  let listOptions = <div />;
  if (data) {
    let index = 0;
    listOptions = data.map((object) => {
      index += 1;
      return (
        <Row key={object}>
          <p>
            <b>{`${index}) `}</b>
            {`${titleCaseConverter(object)}`}
          </p>
          { index !== data.length ? <hr /> : <div />}
        </Row>
      );
    });
  }
  console.log(data);
  return (
    <Col>
      { listOptions }
    </Col>
  );
}

ListMaker.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
};
