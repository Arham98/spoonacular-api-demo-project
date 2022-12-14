import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import imgPlaceholder from '../../images/imgPlaceholder.png';
import ListGroup from 'react-bootstrap/ListGroup';

export default function RecipeCard({ recipeStr }) {
  const recipeData = JSON.parse(recipeStr);
  const recipeImg = `https://spoonacular.com/recipeImages/${recipeData.id}-556x370.${recipeData.imageType}`;

  return (
    <Col className="col-3" style={{ paddingBottom: '24px' }}>
      <Card>
        <Card.Img variant="top" src={recipeImg} alt="Image Not Found"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src=imgPlaceholder;
          }}
        />
        <Card.Header className="header">{recipeData.title}</Card.Header>
        <Card.Body>
          <a
            href={`/recipes/${recipeData.id}`}
            className="stretched-link"
            style={{
              color: 'white', fontSize: 14, textDecoration: 'none',
            }}
          >
            <ListGroup variant="flush">
              <ListGroup.Item className="list-group-item-card">{`Ready in ${recipeData.readyInMinutes} minutes`}</ListGroup.Item>
              <ListGroup.Item className="list-group-item-card">{`Servings: ${recipeData.servings}`}</ListGroup.Item>
            </ListGroup>
          </a>
        </Card.Body>
      </Card>
    </Col>
  );
}

RecipeCard.propTypes = {
  recipeStr: PropTypes.string.isRequired,
};
