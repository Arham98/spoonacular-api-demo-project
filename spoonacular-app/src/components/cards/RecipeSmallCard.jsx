/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import imgPlaceholder from '../../images/imgPlaceholder.png';
// import titleCaseConverter from '../../utils/titleCaseConverter';

export default function RecipeSmallCard({ objectStr }) {
  const recipeData = JSON.parse(objectStr);
  const recipeImg = recipeData.image;

  return (
    <Col className="col-auto" style={{ paddingBottom: '20px' }}>
      <Card style={{ width: '300px', height: 'auto' }}>
        <a
          href={`/recipes/${recipeData.id}`}
          className="stretched-link"
          style={{
            color: 'white', fontSize: 14, textDecoration: 'none',
          }}
        >
          <Card.Img
            variant="top"
            src={recipeImg}
            alt="Image Not Found"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = imgPlaceholder;
            }}
          />
          <Card.Header style={{ borderRadius: '0em 0em 0.5em 0.5em' }}>{`${recipeData.title}`}</Card.Header>
        </a>
      </Card>
    </Col>
  );
}

RecipeSmallCard.propTypes = {
  objectStr: PropTypes.string.isRequired,
};
