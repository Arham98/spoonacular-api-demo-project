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
import PageError from './PageError';
import Loading from '../utilities/Loading';
import CustomPagination from '../utilities/CustomPagination';
import useFetch from '../../hooks/useFetch';
import CardList from '../layouts/CardList';
import NutrientForm from '../layouts/NutrientForm';
import DropdownMenuMaker from '../layouts/DropdownMenuMaker';

export default function Recipes({ apiKey }) {
  const cuisines = ['African', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese'];
  const diets = ['Omnivore', 'Mediterranean Diet', 'Clean Eating', 'Weight Watchers', 'Fruitarian', 'Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Low FODMAP', 'Whole30'];
  const intolerances = ['Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat'];
  const types = ['main course', 'side dish', 'dessert', 'appetizer', 'salad', 'bread', 'breakfast', 'soup', 'beverage', 'sauce', 'marinade', 'fingerfood', 'snack', 'drink'];
  const sortingOptions = ['default', 'meta-score', 'popularity', 'healthiness', 'price', 'time', 'random', 'max-used-ingredients', 'min-missing-ingredients', 'alcohol', 'caffeine', 'copper', 'energy', 'calories', 'calcium', 'carbohydrates', 'carbs', 'choline', 'cholesterol', 'total-fat', 'fluoride', 'trans-fat', 'saturated-fat', 'mono-unsaturated-fat', 'poly-unsaturated-fat', 'fiber', 'folate', 'folic-acid', 'iodine', 'iron', 'magnesium', 'manganese', 'vitamin-b3', 'niacin', 'vitamin-b5', 'pantothenic-acid', 'phosphorus', 'potassium', 'protein', 'vitamin-b2', 'riboflavin', 'selenium', 'sodium', 'vitamin-b1', 'thiamin', 'vitamin-a', 'vitamin-b6', 'vitamin-b12', 'vitamin-c', 'vitamin-d', 'vitamin-e', 'vitamin-k', 'sugar', 'zinc'];
  const sortingDirections = ['asc', 'desc'];

  // Initializing initial states of all search parameters
  const [query, setQuery] = useState('');
  const [minCalories, setMinCalories] = useState('');
  const [maxCalories, setMaxCalories] = useState('');
  const [minCarbs, setMinCarbs] = useState('');
  const [maxCarbs, setMaxCarbs] = useState('');
  const [minProtein, setMinProtein] = useState('');
  const [maxProtein, setMaxProtein] = useState('');
  const [minFat, setMinFat] = useState('');
  const [maxFat, setMaxFat] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [diet, setDiet] = useState('');
  const [intolerance, setIntolerance] = useState('');
  const [type, setType] = useState('');
  const [sort, setSortingOption] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
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
  const urlSearchRecipes = `https://api.spoonacular.com/recipes/complexSearch?${queryParametersSearchRecipes}${minCalories}${maxCalories}${minCarbs}${maxCarbs}${minProtein}${maxProtein}${minFat}${maxFat}`;
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

  // Dropdown function to update the cuisine filter
  const updateCuisine = (cuisineName) => {
    setCuisine(cuisineName);
    setOffset(0);
  };

  // Dropdown function to update the diet filter
  const updateDiet = (dietName) => {
    setDiet(dietName);
    setOffset(0);
  };

  // Dropdown function to update the intolerance filter
  const updateIntolerance = (intoleranceName) => {
    setIntolerance(intoleranceName);
    setOffset(0);
  };

  // Dropdown function to update the meal type filter
  const updateType = (typeName) => {
    setType(typeName);
    setOffset(0);
  };

  // Dropdown function to update the sorting option filter
  const updateSortingOption = (sortName) => {
    setSortingOption(sortName);
    setOffset(0);
  };

  // Dropdown function to update the sorting option filter
  const updateSortDirection = (sortDir) => {
    setSortDirection(sortDir);
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
      <PageError errorMessage="Oops! Something went wrong" />
    );
  }
  return (
    <Container>
      <Col className="align-items-center">
        <Row style={{ paddingTop: '10px' }}>
          <h1 className="header1-design">Recipe Search</h1>
        </Row>
        <Row style={{ paddingTop: '20px' }}>
          <Form onSubmit={updateSearchQuery}>
            <Container className="flex">
              <InputGroup className="mb-3">
                <Form.Control
                  type="search"
                  placeholder="Search Recipes"
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
          <Form>
            <Container style={{ paddingTop: '20px' }}>
              <Row>
                <Col className="col-auto">
                  <Dropdown onSelect={updateCuisine}>
                    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                      {(cuisine !== '') ? cuisine : 'Select Cuisine'}
                    </Dropdown.Toggle>
                    <DropdownMenuMaker data={cuisines} val={cuisine} defaultName="Select Cuisine" />
                  </Dropdown>
                </Col>
                <Col className="col-auto">
                  <Dropdown onSelect={updateDiet}>
                    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                      {(diet !== '') ? diet : 'Select Diet Plan'}
                    </Dropdown.Toggle>
                    <DropdownMenuMaker data={diets} val={diet} defaultName="Select Diet Plan" />
                  </Dropdown>
                </Col>
                <Col className="col-auto">
                  <Dropdown onSelect={updateIntolerance}>
                    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                      {(intolerance !== '') ? intolerance : 'Select Intolerance to Avoid'}
                    </Dropdown.Toggle>
                    <DropdownMenuMaker data={intolerances} val={intolerance} defaultName="Select Intolerance to Avoid" />
                  </Dropdown>
                </Col>
                <Col className="col-auto">
                  <Dropdown onSelect={updateType}>
                    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                      {(type !== '') ? type : 'Select Meal Type'}
                    </Dropdown.Toggle>
                    <DropdownMenuMaker data={types} val={type} defaultName="Select Meal Type" />
                  </Dropdown>
                </Col>
                <Col className="col-auto">
                  <Dropdown onSelect={updateSortingOption}>
                    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                      {(sort !== '') ? sort : 'Select Sorting Option'}
                    </Dropdown.Toggle>
                    <DropdownMenuMaker data={sortingOptions} val={sort} defaultName="Select Sorting Option" />
                  </Dropdown>
                </Col>
                <Col className="col-auto">
                  <Dropdown onSelect={updateSortDirection}>
                    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                      {sortDirection}
                    </Dropdown.Toggle>
                    <DropdownMenuMaker data={sortingDirections} val={sortDirection} defaultName="noLabel" />
                  </Dropdown>
                </Col>
              </Row>
            </Container>
          </Form>
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

Recipes.propTypes = {
  apiKey: PropTypes.string.isRequired,
};
