/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import imgPlaceholder from '../../images/imgPlaceholder.png';
import titleCaseConverter from '../../utils/titleCaseConverter';

export default function IngredientCard({ objectStr }) {
  const ingredientData = JSON.parse(objectStr);
  const ingredientImg = `https://spoonacular.com/cdn/ingredients_500x500/${ingredientData.image}`;

  return (
    <Col className="col-auto">
      <Card style={{ width: '300px', height: 'auto' }}>
        <a
          href={`/ingredients/${ingredientData.id}`}
          className="stretched-link"
          style={{
            color: 'white', fontSize: 14, textDecoration: 'none',
          }}
        >
          <Card.Img
            variant="top"
            src={ingredientImg}
            alt="Image Not Found"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = imgPlaceholder;
            }}
          />
        </a>
        <Card.Header style={{ borderRadius: '0em 0em 0.5em 0.5em' }}>{`${titleCaseConverter(ingredientData.name)}`}</Card.Header>
      </Card>
    </Col>
  );
}

IngredientCard.propTypes = {
  objectStr: PropTypes.string.isRequired,
};
