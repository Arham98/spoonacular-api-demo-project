/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Placeholder from 'react-bootstrap/Placeholder';
import useFetch from '../../hooks/useFetch';
import imgPlaceholder from '../../images/imgPlaceholder.png';
import Loading from '../../images/Loading.png';
import titleCaseConverter from '../../utils/titleCaseConverter';

export default function ProductLoadingCard({ apiKey, objectStr }) {
  const productData = JSON.parse(objectStr);

  // Intializing credentials and header parameters
  const headerParametersJSON = {
    'x-api-key': apiKey,
    'content-type': 'application/json',
  };
  const optionsJSON = {
    method: 'GET',
    headers: headerParametersJSON,
  };
  const optionsStrJSON = JSON.stringify(optionsJSON);

  // API Call setup for Ingredient's information
  const urlIngredientInfo = `https://api.spoonacular.com/food/products/${productData.id}`;
  const {
    data: dataIngredientInfo,
    success: successIngredientInfo,
    loading: loadingIngredientInfo,
  } = useFetch(
    urlIngredientInfo,
    optionsStrJSON,
  );

  if (loadingIngredientInfo) {
    return (
      <Col className="col-auto" style={{ paddingBottom: '24px' }}>
        <Card style={{ width: '300px', height: 'auto' }}>
          <Card.Img
            variant="top"
            src={Loading}
            alt="Loading"
            style={{ maxHeight: '300px' }}
          />
          <Card.Header>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
          </Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item className="list-group-item-card">
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={4} size="lg" />
                </Placeholder>
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-card">
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={8} size="lg" />
                </Placeholder>
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-card">
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={6} size="lg" />
                  {' '}
                  <Placeholder xs={4} size="lg" />
                </Placeholder>
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item-card">
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={3} size="lg" />
                  {' '}
                  <Placeholder xs={8} size="lg" />
                </Placeholder>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    );
  } if (!(successIngredientInfo)) {
    console.log('The following errors were encountered:');
    if (dataIngredientInfo.error) {
      console.log(`URL -> ${urlIngredientInfo}`);
      console.log(`Error -> ${dataIngredientInfo.error}\n`);
    }
    return (
      <Col className="col-auto" style={{ paddingBottom: '24px' }}>
        <Card style={{ width: '300px', height: 'auto' }}>
          <a
            href={`/products/${productData.id}`}
            className="stretched-link"
            style={{
              color: 'white', fontSize: 14, textDecoration: 'none',
            }}
          >
            <Card.Img
              variant="top"
              src={imgPlaceholder}
              alt="Image Not Found"
              style={{ maxHeight: '300px' }}
            />
            <Card.Header style={{ borderRadius: '0em 0em 0.5em 0.5em' }}>{`${titleCaseConverter(productData.title)}`}</Card.Header>
          </a>
        </Card>
      </Col>
    );
  }
  return (
    <Col className="col-auto" style={{ paddingBottom: '24px' }}>
      <Card style={{ width: '300px', height: 'auto' }}>
        <a
          href={`/products/${productData.id}`}
          className="stretched-link"
          style={{
            color: 'white', fontSize: 14, textDecoration: 'none',
          }}
        >
          <Card.Img
            variant="top"
            src={`${dataIngredientInfo.image}`}
            alt="Image Not Found"
            style={{ maxHeight: '300px' }}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = imgPlaceholder;
            }}
          />
          <Card.Header>{`${titleCaseConverter(dataIngredientInfo.title)}`}</Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item className="list-group-item-card">{`Price: $${dataIngredientInfo.price}`}</ListGroup.Item>
              <ListGroup.Item className="list-group-item-card">{`Servings: ${dataIngredientInfo.servings.number}`}</ListGroup.Item>
              <ListGroup.Item className="list-group-item-card">{`Brand: ${dataIngredientInfo.brand}`}</ListGroup.Item>
              <ListGroup.Item className="list-group-item-card">{`Type: ${dataIngredientInfo.aisle}`}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </a>
      </Card>
    </Col>
  );
}

ProductLoadingCard.propTypes = {
  apiKey: PropTypes.string.isRequired,
  objectStr: PropTypes.string.isRequired,
};
