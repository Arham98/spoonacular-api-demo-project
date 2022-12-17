import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

export default function NutrientForm({ data }) {
  const queryParams = new URLSearchParams(data);
  const dataObj = Object.fromEntries(queryParams.entries());

  return (
    <Container className="flex">
      <Row>
        <h3 className="header3-design">Filters</h3>
      </Row>
      <Row style={{ paddingBottom: '20px' }}>
        <Col>
          <Form.Control
            placeholder="Minimum Calories"
            type="number"
            step="0.01"
            defaultValue={dataObj.minCalories}
          />
        </Col>
        <Col>
          <Form.Control
            placeholder="Maximum Calories"
            type="number"
            step="0.01"
            defaultValue={dataObj.maxCalories}
          />
        </Col>
        <Col>
          <Form.Control
            placeholder="Minimum Carbohydrates"
            type="number"
            step="0.01"
            defaultValue={dataObj.minCarbs}
          />
        </Col>
        <Col>
          <Form.Control
            placeholder="Maximum Carbohydrates"
            type="number"
            step="0.01"
            defaultValue={dataObj.minCarbs}
          />
        </Col>
      </Row>
      <Row style={{ paddingBottom: '20px' }}>
        <Col>
          <Form.Control
            placeholder="Minimum Proteins"
            type="number"
            step="0.01"
            defaultValue={dataObj.minProtein}
          />
        </Col>
        <Col>
          <Form.Control
            placeholder="Maximum Proteins"
            type="number"
            step="0.01"
            defaultValue={dataObj.maxProtein}
          />
        </Col>
        <Col>
          <Form.Control
            placeholder="Minimum Fats"
            type="number"
            step="0.01"
            defaultValue={dataObj.minFat}
          />
        </Col>
        <Col>
          <Form.Control
            placeholder="Maximum Fats"
            type="number"
            step="0.01"
            defaultValue={dataObj.maxFat}
          />
        </Col>
      </Row>
    </Container>
  );
}

NutrientForm.propTypes = {
  data: PropTypes.string.isRequired,
};
