import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import titleCaseConverter from '../../utils/titleCaseConverter';

export default function TagMaker({ data }) {
  let listTags = <div />;
  if (data) {
    listTags = data.map((tagName) => (
      <React.Fragment key={tagName}>
        <Col className="col-auto">
          <Badge className="tag-color badge-design-main">
            {titleCaseConverter(tagName)}
          </Badge>
        </Col>
      </React.Fragment>
    ));
  }

  return (
    <Row className="d-flex flex-row">
      { listTags }
    </Row>
  );
}

TagMaker.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
};
