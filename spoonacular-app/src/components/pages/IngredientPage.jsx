/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { useParams } from 'react-router-dom';
import Loading from '../utilities/Loading';
import PageError from './PageError';
import ProductSuggestions from './ProductSuggestions';
import TagMaker from '../layouts/TagMaker';
import OptionsMaker from '../layouts/OptionsMaker';
import useFetch from '../../hooks/useFetch';
import ListMaker from '../layouts/ListMaker';
import imgPlaceholder from '../../images/imgPlaceholder.png';
import titleCaseConverter from '../../utils/titleCaseConverter';

export default function IngredientPage({ apiKey }) {
  const params = useParams();
  const [primaryInValid, setprimaryInValid] = useState(false);

  // Setting initial loading states as true
  const placeholderImage = imgPlaceholder;

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
  const [queryParametersIngredientInfo, setQueryParametersIngredientInfo] = useState('');
  const urlIngredientInfo = `https://api.spoonacular.com/food/ingredients/${params.ingredientId}/information?${queryParametersIngredientInfo}`;
  const {
    data: dataIngredientInfo,
    success: successIngredientInfo,
    loading: loadingIngredientInfo,
  } = useFetch(
    urlIngredientInfo,
    optionsStrJSON,
  );

  // API Call setup for Ingredient's substitutes
  const queryParametersIngredientSubstitute = new URLSearchParams({
  });
  const urlIngredientSubstitute = `https://api.spoonacular.com/food/ingredients/${params.ingredientId}/substitutes?${queryParametersIngredientSubstitute}`;
  const {
    data: dataIngredientSubstitute,
    success: successIngredientSubstitute,
    loading: loadingIngredientSubstitute,
  } = useFetch(
    urlIngredientSubstitute,
    optionsStrJSON,
  );

  // Dropdown Function to update widget
  const quantityUpdate = (event) => {
    event.preventDefault();
    if (!event.target[0].value) {
      setprimaryInValid(true);
    } else {
      setprimaryInValid(false);
      setQueryParametersIngredientInfo(`amount=${event.target[0].value}&unit=${event.target[1].value}`);
    }
  };

  if (loadingIngredientInfo || loadingIngredientSubstitute) {
    return (
      <Loading />
    );
  } if (!(successIngredientInfo && successIngredientSubstitute)) {
    console.log('The following errors were encountered:');
    if (dataIngredientInfo.error) {
      console.log(`URL -> ${urlIngredientInfo}`);
      console.log(`Error -> ${dataIngredientInfo.error}\n`);
    }
    if (dataIngredientSubstitute.error) {
      console.log(`URL -> ${urlIngredientSubstitute}`);
      console.log(`Error -> ${dataIngredientSubstitute.error}\n`);
    }
    return (
      <PageError errorMessage="Oops! Something went wrong" />
    );
  }

  return (
    <Container>
      <Col className="align-items-center">
        <Row style={{ paddingTop: '20px' }}>
          <Col>
            <Row>
              <h2 className="header1-design">{titleCaseConverter(dataIngredientInfo.name)}</h2>
              <TagMaker data={dataIngredientInfo.categoryPath} />
              <p />
            </Row>
            <Row>
              <h3 className="header3-design">Ingredient Details</h3>
            </Row>
            <Row>
              <Card>
                <Card.Body>
                  <Row>
                    <Col style={{ textAlign: 'center', color: '#01B636' }}>
                      <b>Quantity</b>
                    </Col>
                    <Col style={{ textAlign: 'center' }}>
                      <Form onSubmit={quantityUpdate}>
                        <Row>
                          <Col>
                            <Form.Control
                              placeholder="Quantity"
                              type="number"
                              step="0.01"
                              defaultValue={dataIngredientInfo.amount
                                ? dataIngredientInfo.amount : null}
                            />
                          </Col>
                          <Col>
                            <OptionsMaker data={dataIngredientInfo.possibleUnits} />
                          </Col>
                          <Col>
                            <Button className="button" type="submit">Update</Button>
                          </Col>
                        </Row>
                        <Row style={{ textAlign: 'left' }}>
                          {primaryInValid && <p className="text-danger">Invalid Amount</p>}
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col style={{ textAlign: 'center', color: '#01B636' }}>
                      <b>Price</b>
                    </Col>
                    <Col style={{ textAlign: 'center' }}>
                      {
                        (dataIngredientInfo.estimatedCost)
                          ? `${dataIngredientInfo.estimatedCost.value}
                          ${dataIngredientInfo.estimatedCost.unit}` : '–'
                      }
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col style={{ textAlign: 'center', color: '#01B636' }}>
                      <b>Supermarket Section</b>
                    </Col>
                    <Col style={{ textAlign: 'center' }}>
                      {
                        `${dataIngredientInfo.aisle}`
                      }
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col style={{ textAlign: 'center', color: '#01B636' }}>
                      <b>Consistency</b>
                    </Col>
                    <Col style={{ textAlign: 'center' }}>
                      {
                        `${titleCaseConverter(dataIngredientInfo.consistency)}`
                      }
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
          </Col>
          <Col className="col-auto">
            <Image
              className="img-fluid"
              src={(dataIngredientInfo.image) ? `https://spoonacular.com/cdn/ingredients_500x500/${dataIngredientInfo.image}` : placeholderImage}
              alt=""
              style={{ borderRadius: '0.5em', maxHeight: '400px' }}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = imgPlaceholder;
              }}
            />
          </Col>
        </Row>
        <Row>
          <h3 className="header3-design">Ingredient Substitutes</h3>
        </Row>
        <Row style={{ paddingBottom: '20px' }}>
          <Col>
            <Row>
              <Card>
                <Card.Body>
                  {(dataIngredientSubstitute.status === 'success')
                    ? <ListMaker data={dataIngredientSubstitute.substitutes} />
                    : <h4>No Substitutes Available</h4>}
                </Card.Body>
              </Card>
            </Row>
          </Col>
        </Row>
        <Row>
          <h3 className="header3-design">{`Grocery Products with ${titleCaseConverter(dataIngredientInfo.name)}`}</h3>
        </Row>
        <ProductSuggestions apiKey={apiKey} ingredientName={dataIngredientInfo.name} />
      </Col>
    </Container>
  );
}

IngredientPage.propTypes = {
  apiKey: PropTypes.string.isRequired,
};
