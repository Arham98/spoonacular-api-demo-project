/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsSearch } from 'react-icons/bs';
import Loading from '../utilities/Loading';
import CustomPagination from '../utilities/CustomPagination';
import PageError from './PageError';
import CardList from '../layouts/CardList';
import NutrientForm from '../layouts/NutrientForm';
import DropdownMenuMaker from '../layouts/DropdownMenuMaker';
import useFetch from '../../hooks/useFetch';

export default function Products({ apiKey }) {
  // Initializing initial states of all search parameters
  const [query, setQuery] = useState('Chocolate');
  const [minCalories, setMinCalories] = useState('');
  const [maxCalories, setMaxCalories] = useState('');
  const [minCarbs, setMinCarbs] = useState('');
  const [maxCarbs, setMaxCarbs] = useState('');
  const [minProtein, setMinProtein] = useState('');
  const [maxProtein, setMaxProtein] = useState('');
  const [minFat, setMinFat] = useState('');
  const [maxFat, setMaxFat] = useState('');
  const [number, setNumber] = useState(12);
  const [offset, setOffset] = useState(0);

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

  // API Call to search for Products
  const queryParametersSearchProducts = new URLSearchParams({
    query,
    number,
    offset,
  });
  const urlSearchProducts = `https://api.spoonacular.com/food/products/search?${queryParametersSearchProducts}${minCalories}${maxCalories}${minCarbs}${maxCarbs}${minProtein}${maxProtein}${minFat}${maxFat}`;
  const {
    data: dataSearchProducts,
    success: successSearchProducts,
    loading: loadingSearchProducts,
  } = useFetch(
    urlSearchProducts,
    optionsStrJSON,
  );

  // Function to update search query
  const updateSearchQuery = (event) => {
    const min = 0;
    const max = 99999;
    event.preventDefault();
    setQuery(event.target[0].value);
    if (event.target[2].value) {
      setMinCalories(`&minCalories=${Math.max(min, Math.min(max, Number(event.target[2].value)))}`);
    } else {
      setMinCalories('');
    }
    if (event.target[3].value) {
      setMaxCalories(`&maxCalories=${Math.max(min, Math.min(max, Number(event.target[3].value)))}`);
    } else {
      setMaxCalories('');
    }
    if (event.target[4].value) {
      setMinCarbs(`&minCarbs=${Math.max(min, Math.min(max, Number(event.target[4].value)))}`);
    } else {
      setMinCarbs('');
    }
    if (event.target[5].value) {
      setMaxCarbs(`&maxCarbs=${Math.max(min, Math.min(max, Number(event.target[5].value)))}`);
    } else {
      setMaxCarbs('');
    }
    if (event.target[6].value) {
      setMinProtein(`&minProtein=${Math.max(min, Math.min(max, Number(event.target[6].value)))}`);
    } else {
      setMinProtein('');
    }
    if (event.target[7].value) {
      setMaxProtein(`&maxProtein=${Math.max(min, Math.min(max, Number(event.target[7].value)))}`);
    } else {
      setMaxProtein('');
    }
    if (event.target[8].value) {
      setMinFat(`&minFat=${Math.max(min, Math.min(max, Number(event.target[8].value)))}`);
    } else {
      setMinFat('');
    }
    if (event.target[9].value) {
      setMaxFat(`&maxFat=${Math.max(min, Math.min(max, Number(event.target[9].value)))}`);
    } else {
      setMaxFat('');
    }
    setOffset(0);
  };

  // Dropdown function to update the filter the number of search
  // results on each page
  const updateResultsNumber = (newNumber) => {
    setNumber(newNumber);
    setOffset(0);
  };

  // Dropdown function to update the page number by using offset
  const updatePageNumber = (newPageNumber) => {
    setOffset(newPageNumber);
  };

  if (loadingSearchProducts) {
    return (
      <Loading />
    );
  } if (!(successSearchProducts)) {
    console.log('The following errors were encountered:');
    if (dataSearchProducts.error) {
      console.log(`URL -> ${urlSearchProducts}`);
      console.log(`Error -> ${dataSearchProducts.error}\n`);
    }
    return (
      <PageError errorMessage={dataSearchProducts.error} />
    );
  }
  return (
    <Container>
      <Col className="align-items-center">
        <Row style={{ paddingTop: '10px' }}>
          <h1 className="header1-design">Product Search</h1>
        </Row>
        <Row style={{ paddingTop: '20px' }}>
          <Form onSubmit={updateSearchQuery}>
            <Container className="flex">
              <InputGroup className="mb-3">
                <Form.Control
                  type="search"
                  placeholder="Search Products"
                  aria-label="Search"
                  defaultValue={(query === '') ? null : query}
                />
                <Button className="button" type="submit"><BsSearch /></Button>
              </InputGroup>
            </Container>
            <NutrientForm
              data={`${minCalories}${maxCalories}${minCarbs}${maxCarbs}${minProtein}${maxProtein}${minFat}${maxFat}`.slice(1)}
            />
          </Form>
        </Row>
        <Row style={{ paddingTop: '10px' }}>
          <h3 className="header3-design">Search Results</h3>
        </Row>
        <Row style={{ paddingTop: '20px', paddingBottom: '20px' }}>
          <CardList data={dataSearchProducts.products} type="product" />
        </Row>
        <Row className="d-flex flex-row-reverse">
          <Col>
            <CustomPagination
              data={JSON.stringify({
                number: dataSearchProducts.number,
                offset: dataSearchProducts.offset,
                totalResults: dataSearchProducts.totalProducts,
              })}
              updatePageNumber={updatePageNumber}
            />
          </Col>
          <Col className="col-auto">
            <Row className="col-auto">
              <Col className="col-auto">
                <p style={{ color: 'white' }}>Results per Page: </p>
              </Col>
              <Col className="col-auto">
                <Dropdown onSelect={updateResultsNumber}>
                  <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                    {number}
                  </Dropdown.Toggle>
                  <DropdownMenuMaker data={[12, 20, 60, 100]} val={`${number}`} defaultName="noLabel" />
                </Dropdown>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Container>
  );
}

Products.propTypes = {
  apiKey: PropTypes.string.isRequired,
};
