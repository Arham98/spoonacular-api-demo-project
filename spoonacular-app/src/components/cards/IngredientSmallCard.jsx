import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import imgPlaceholder from '../../images/imgPlaceholder.png';
import titleCaseConverter from '../../utils/titleCaseConverter';

export default function IngredientSmallCard({ ingredientStr }) {

  // Dropdown Function to update widget
  function dropdownWidgetUpdate(widgetName) {
    setWidgetName(widgetName);
    let widgetPath = widgetName.replaceAll(' ', '');
    widgetPath = widgetPath.substr(0, 1).toLowerCase() + widgetPath.substr(1, widgetPath.length-1);
    const newWidgetPath = `https://api.spoonacular.com/recipes/${params.recipeId}/${widgetPath}?${queryParametersRecipeWidget}`;
    setUrlRecipeWidget(newWidgetPath);
  }

  const ingredientData = JSON.parse(ingredientStr);
  const ingredientImg = `https://spoonacular.com/cdn/ingredients_500x500/${ingredientData.image}`;

  return (
    <Col className="col-auto">
      <Card style={{width: '120px', height: 'auto'}}>
        <Card.Img variant="top" src={ingredientImg} alt="Image Not Found"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src=imgPlaceholder;
          }}
        />
        <Card.Header style={{borderRadius: '0em 0em 0.5em 0.5em'}}>{`${titleCaseConverter(ingredientData.name)}`}</Card.Header>
      </Card>
    </Col>
  );
}

IngredientSmallCard.propTypes = {
  ingredientStr: PropTypes.string.isRequired,
};
