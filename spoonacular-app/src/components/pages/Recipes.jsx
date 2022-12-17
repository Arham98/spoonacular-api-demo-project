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

export default function Recipes({ apiKey }) {
  const cuisines = ['African', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese'];
  const diets = ['Omnivore', 'Mediterranean Diet', 'Clean Eating', 'Weight Watchers', 'Fruitarian', 'Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Low FODMAP', 'Whole30'];
  const intolerances = ['Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat'];
  const types = ['main course', 'side dish', 'dessert', 'appetizer', 'salad', 'bread', 'breakfast', 'soup', 'beverage', 'sauce', 'marinade', 'fingerfood', 'snack', 'drink'];
  const sortingOptions = ['default', 'meta-score', 'popularity', 'healthiness', 'price', 'time', 'random', 'max-used-ingredients', 'min-missing-ingredients', 'alcohol', 'caffeine', 'copper', 'energy', 'calories', 'calcium', 'carbohydrates', 'carbs', 'choline', 'cholesterol', 'total-fat', 'fluoride', 'trans-fat', 'saturated-fat', 'mono-unsaturated-fat', 'poly-unsaturated-fat', 'fiber', 'folate', 'folic-acid', 'iodine', 'iron', 'magnesium', 'manganese', 'vitamin-b3', 'niacin', 'vitamin-b5', 'pantothenic-acid', 'phosphorus', 'potassium', 'protein', 'vitamin-b2', 'riboflavin', 'selenium', 'sodium', 'vitamin-b1', 'thiamin', 'vitamin-a', 'vitamin-b6', 'vitamin-b12', 'vitamin-c', 'vitamin-d', 'vitamin-e', 'vitamin-k', 'sugar', 'zinc'];
  const sortingDirections = ['asc', 'desc'];

  // Initializing initial states of all search parameters
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [diet, setDiet] = useState('');
  const [intolerance, setIntolerance] = useState('');
  const [type, setType] = useState('');
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

  // API Call to search for Recipes
  const queryParametersSearchRecipes = new URLSearchParams({
    query,
    cuisine,
    diet,
    intolerance,
    type,
    sort,
    sortDirection,
    number,
    offset,
  });
  const urlSearchRecipes = `https://api.spoonacular.com/recipes/complexSearch?${queryParametersSearchRecipes}`;
  const {
    data: dataSearchRecipes,
    success: successSearchRecipes,
    loading: loadingSearchRecipes,
  } = useFetch(
    urlSearchRecipes,
    optionsStrJSON,
  );

  // Function to update search query
  const updateSearchQuery = (event) => {
    event.preventDefault();
    setQuery(event.target[0].value);
  };

  // Dropdown function to update the cuisine filter
  const updateCuisine = (cuisineName) => {
    setCuisine(cuisineName);
  };

  // Dropdown function to update the diet filter
  const updateDiet = (dietName) => {
    setDiet(dietName);
  };

  // Dropdown function to update the intolerance filter
  const updateIntolerance = (intoleranceName) => {
    setIntolerance(intoleranceName);
  };

  // Dropdown function to update the meal type filter
  const updateType = (typeName) => {
    setType(typeName);
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

  if (loadingSearchRecipes) {
    return (
      <Loading />
    );
  } if (!(successSearchRecipes)) {
    console.log('The following errors were encountered:');
    if (dataSearchRecipes.error) {
      console.log(`URL -> ${urlSearchRecipes}`);
      console.log(`Error -> ${dataSearchRecipes.error}\n`);
    }
    return (
      <PageError />
    );
  }
  return (
    <Container>
      <Col className="align-items-center">
        <Row style={{ paddingTop: '10px' }}>
          <h1 className="header1-design">Recipe Search</h1>
        </Row>
        <Row style={{ paddingTop: '20px' }}>
          <Form className="d-flex" onSubmit={updateSearchQuery}>
            <Form.Control
              type="search"
              placeholder="Search Recipes"
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
            <Dropdown onSelect={updateCuisine}>
              <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                {(cuisine !== '') ? cuisine : 'Select Cuisine'}
              </Dropdown.Toggle>
              <DropdownMenuMaker data={cuisines} val={cuisine} />
            </Dropdown>
          </Col>
          <Col className="col-auto">
            <Dropdown onSelect={updateDiet}>
              <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                {(diet !== '') ? diet : 'Select Diet Plan'}
              </Dropdown.Toggle>
              <DropdownMenuMaker data={diets} val={diet} />
            </Dropdown>
          </Col>
          <Col className="col-auto">
            <Dropdown onSelect={updateIntolerance}>
              <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                {(intolerance !== '') ? intolerance : 'Select Intolerance to Avoid'}
              </Dropdown.Toggle>
              <DropdownMenuMaker data={intolerances} val={intolerance} />
            </Dropdown>
          </Col>
          <Col className="col-auto">
            <Dropdown onSelect={updateType}>
              <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                {(type !== '') ? type : 'Select Meal Type'}
              </Dropdown.Toggle>
              <DropdownMenuMaker data={types} val={type} />
            </Dropdown>
          </Col>
          <Col className="col-auto">
            <Dropdown onSelect={updateSortingOption}>
              <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                {(sort !== '') ? sort : 'Select Sorting Option'}
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
          <CardList data={dataSearchRecipes.results} type="recipe" />
        </Row>
        <Row className="d-flex flex-row-reverse">
          <Col>
            <CustomPagination
              data={JSON.stringify(dataSearchRecipes)}
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
                  <DropdownMenuMaker data={[10, 20, 50, 100]} val={number} />
                </Dropdown>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Container>
  );
}

Recipes.propTypes = {
  apiKey: PropTypes.string.isRequired,
};
