/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { BsSearch } from 'react-icons/bs';
import Loading from '../utilities/Loading';
import CustomPagination from '../utilities/CustomPagination';
import PageError from './PageError';
import CardList from '../layouts/CardList';
import DropdownMenuMaker from '../layouts/DropdownMenuMaker';
import useFetch from '../../hooks/useFetch';

export default function Ingredients({ apiKey }) {
  const intolerances = ['Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat'];
  const sortingOptions = ['', 'alcohol', 'caffeine', 'copper', 'energy', 'calories', 'calcium', 'carbohydrates', 'carbs', 'choline', 'cholesterol', 'total-fat', 'fluoride', 'trans-fat', 'saturated-fat', 'mono-unsaturated-fat', 'poly-unsaturated-fat', 'fiber', 'folate', 'folic-acid', 'iodine', 'iron', 'magnesium', 'manganese', 'vitamin-b3', 'niacin', 'vitamin-b5', 'pantothenic-acid', 'phosphorus', 'potassium', 'protein', 'vitamin-b2', 'riboflavin', 'selenium', 'sodium', 'vitamin-b1', 'thiamin', 'vitamin-a', 'vitamin-b6', 'vitamin-b12', 'vitamin-c', 'vitamin-d', 'vitamin-e', 'vitamin-k', 'sugar', 'zinc'];
  const sortingDirections = ['asc', 'desc'];

  // Initializing initial states of all search parameters
  const [query, setQuery] = useState('Oil');
  const [intolerance, setIntolerance] = useState('');
  const [sort, setSortingOption] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [number, setNumber] = useState(10);
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

  // API Call to search for Ingredients
  const queryParametersSearchIngredients = new URLSearchParams({
    query,
    intolerance,
    sort,
    sortDirection,
    number,
    offset,
  });
  const urlSearchIngredients = `https://api.spoonacular.com/food/ingredients/search?${queryParametersSearchIngredients}`;
  const {
    data: dataSearchIngredients,
    success: successSearchIngredients,
    loading: loadingSearchIngredients,
  } = useFetch(
    urlSearchIngredients,
    optionsStrJSON,
  );

  // Function to update search query
  const updateSearchQuery = (event) => {
    event.preventDefault();
    setQuery(event.target[0].value);
  };

  // Dropdown function to update the intolerance filter
  const updateIntolerance = (intoleranceName) => {
    setIntolerance(intoleranceName);
  };

  // Dropdown function to update the sorting option filter
  const updateSortingOption = (sortName) => {
    setSortingOption(sortName);
  };

  // Dropdown function to update the sorting option filter
  const updateSortDirection = (sortDir) => {
    setSortDirection(sortDir);
  };

  // Dropdown function to update the filter the number of search
  // results on each page
  const updateResultsNumber = (newNumber) => {
    setNumber(newNumber);
  };

  // Dropdown function to update the page number by using offset
  const updatePageNumber = (newPageNumber) => {
    setOffset(newPageNumber);
  };

  if (loadingSearchIngredients) {
    return (
      <Loading />
    );
  } if (!(successSearchIngredients)) {
    console.log('The following errors were encountered:');
    if (dataSearchIngredients.error) {
      console.log(`URL -> ${urlSearchIngredients}`);
      console.log(`Error -> ${dataSearchIngredients.error}\n`);
    }
    return (
      <PageError />
    );
  }
  return (
    <Container>
      <Col className="align-items-center">
        <Row style={{ paddingTop: '10px' }}>
          <h1 className="header1-design">Ingredient Search</h1>
        </Row>
        <Row style={{ paddingTop: '20px' }}>
          <Form className="d-flex" onSubmit={updateSearchQuery}>
            <Form.Control
              type="search"
              placeholder="Search Ingredients"
              className="me-2"
              aria-label="Search"
              defaultValue={(query === '') ? null : query}
            />
            <Button className="button" type="submit"><BsSearch /></Button>
          </Form>
        </Row>
        <Row>
          <h3 className="header3-design">Filters</h3>
        </Row>
        <Row style={{ paddingTop: '20px' }}>
          <Col className="col-auto">
            <Dropdown onSelect={updateIntolerance}>
              <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                {(intolerance !== '') ? intolerance : 'Select Intolerance to Avoid'}
              </Dropdown.Toggle>
              <DropdownMenuMaker data={intolerances} val={intolerance} />
            </Dropdown>
          </Col>
          <Col className="col-auto">
            <Dropdown onSelect={updateSortingOption}>
              <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                {(sort !== '') ? sort : 'Default Sorting Option'}
              </Dropdown.Toggle>
              <DropdownMenuMaker data={sortingOptions} val={sort} />
            </Dropdown>
          </Col>
          <Col className="col-auto">
            <Dropdown onSelect={updateSortDirection}>
              <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                {sortDirection}
              </Dropdown.Toggle>
              <DropdownMenuMaker data={sortingDirections} val={sortDirection} />
            </Dropdown>
          </Col>
        </Row>
        <Row style={{ paddingTop: '10px' }}>
          <h3 className="header3-design">Search Results</h3>
        </Row>
        <Row style={{ paddingTop: '20px', paddingBottom: '20px' }}>
          <CardList data={dataSearchIngredients.results} type="ingredient" />
        </Row>
        <Row className="d-flex flex-row-reverse">
          <Col>
            <CustomPagination
              data={JSON.stringify(dataSearchIngredients)}
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
                  <DropdownMenuMaker data={[10, 20, 50, 100]} val={`${number}`} />
                </Dropdown>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Container>
  );
}

Ingredients.propTypes = {
  apiKey: PropTypes.string.isRequired,
};
