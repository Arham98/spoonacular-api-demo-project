import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import RecipeCard from '../cards/RecipeCard';
import ProductCard from '../cards/ProductCard';
import ProductLoadingCard from '../cards/ProductLoadingCard';
import IngredientSmallCard from '../cards/IngredientSmallCard';
import EquipmentSmallCard from '../cards/EquipmentSmallCard';

function CardSlider({
  data, type, emptyMessage, apiKey,
}) {
  let listCards = <div />;
  if (data) {
    if (data.length === 0) {
      return (
        <Container fluid>
          <p>{emptyMessage}</p>
        </Container>
      );
    }
    listCards = data.map((object) => {
      const dataObjStr = JSON.stringify(object);
      if (type === 'recipe') {
        return (
          <React.Fragment key={object.id}>
            <RecipeCard recipeStr={dataObjStr} />
          </React.Fragment>
        );
      } if (type === 'product') {
        return (
          <React.Fragment key={object.id}>
            <ProductCard objectStr={dataObjStr} />
          </React.Fragment>
        );
      } if (type === 'product-loading') {
        return (
          <React.Fragment key={object.id}>
            <ProductLoadingCard objectStr={dataObjStr} apiKey={apiKey} />
          </React.Fragment>
        );
      } if (type === 'ingredient-small') {
        return (
          <React.Fragment key={`${object.id}-${object.name}`}>
            <IngredientSmallCard ingredientStr={dataObjStr} />
          </React.Fragment>
        );
      } if (type === 'equipment-small') {
        return (
          <React.Fragment key={`${object.id}-${object.name}`}>
            <EquipmentSmallCard equipmentStr={dataObjStr} />
          </React.Fragment>
        );
      }
      return (<div />);
    });
  } else {
    return (
      <Container fluid>
        <p>{emptyMessage}</p>
      </Container>
    );
  }
  return (
    <Row className="d-flex flex-row flex-nowrap overflow-auto">
      { listCards }
    </Row>
  );
}

CardSlider.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  type: PropTypes.string.isRequired,
  emptyMessage: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
};

export default CardSlider;
