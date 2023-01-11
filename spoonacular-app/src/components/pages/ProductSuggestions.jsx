/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import CardSlider from '../layouts/CardSlider';
import useFetch from '../../hooks/useFetch';

export default function ProductSuggestions({ apiKey, ingredientName }) {
  // API Call setup for Ingredient's products
  const headerParametersJSON = {
    'x-api-key': apiKey,
    'content-type': 'application/json',
  };
  const bodyParameters = JSON.stringify({
    ingredients: [
      `${ingredientName}`,
    ],
    servings: 2,
  });
  const optionsJSON = {
    method: 'POST',
    headers: headerParametersJSON,
    body: bodyParameters,
  };
  const optionsStrJSON = JSON.stringify(optionsJSON);
  const urlIngredientProduct = 'https://api.spoonacular.com/food/ingredients/map';
  const {
    data: dataIngredientProduct,
    success: successIngredientProduct,
    loading: loadingIngredientProduct,
  } = useFetch(
    urlIngredientProduct,
    optionsStrJSON,
  );

  if (loadingIngredientProduct) {
    return (
      <Spinner animation="border" variant="primary" style={{ color: '#01B636' }} size="lg" />
    );
  } if (!(successIngredientProduct)) {
    console.log('The following errors were encountered:');
    if (dataIngredientProduct.error) {
      console.log(`URL -> ${urlIngredientProduct}`);
      console.log(`Error -> ${dataIngredientProduct.error}\n`);
    }
    return (
      <Container>
        <pre>
          <h5 style={{ color: 'white' }}>No Procucts Found</h5>
        </pre>
      </Container>
    );
  }
  if (dataIngredientProduct.length === 0) {
    return (
      <Container>
        <pre>
          <h5 style={{ color: 'white' }}>No Procucts Found</h5>
        </pre>
      </Container>
    );
  }
  return (
    <Container>
      <Col className="align-items-center">
        <CardSlider data={dataIngredientProduct[0].products} type="product-loading" emptyMessage="No Products Found" apiKey={apiKey} />
      </Col>
    </Container>
  );
}

ProductSuggestions.propTypes = {
  apiKey: PropTypes.string.isRequired,
  ingredientName: PropTypes.string.isRequired,
};
