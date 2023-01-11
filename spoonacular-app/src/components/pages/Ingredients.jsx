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

export default function Ingredients({ apiKey }) {
  const intolerances = ['Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat'];
  const sortingOptions = ['', 'alcohol', 'caffeine', 'copper', 'energy', 'calories', 'calcium', 'carbohydrates', 'carbs', 'choline', 'cholesterol', 'total-fat', 'fluoride', 'trans-fat', 'saturated-fat', 'mono-unsaturated-fat', 'poly-unsaturated-fat', 'fiber', 'folate', 'folic-acid', 'iodine', 'iron', 'magnesium', 'manganese', 'vitamin-b3', 'niacin', 'vitamin-b5', 'pantothenic-acid', 'phosphorus', 'potassium', 'protein', 'vitamin-b2', 'riboflavin', 'selenium', 'sodium', 'vitamin-b1', 'thiamin', 'vitamin-a', 'vitamin-b6', 'vitamin-b12', 'vitamin-c', 'vitamin-d', 'vitamin-e', 'vitamin-k', 'sugar', 'zinc'];
  const sortingDirections = ['asc', 'desc'];

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
  const [intolerance, setIntolerance] = useState('');
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

  // API Call to search for Ingredients
  const queryParametersSearchIngredients = new URLSearchParams({
    query,
    intolerance,
    sort,
    sortDirection,
    number,
    offset,
  });
  const urlSearchIngredients = `https://api.spoonacular.com/food/ingredients/search?${queryParametersSearchIngredients}${minCalories}${maxCalories}${minCarbs}${maxCarbs}${minProtein}${maxProtein}${minFat}${maxFat}`;
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
    const min = 0;
    const max = 100;
    event.preventDefault();
    setQuery(event.target[0].value);
    if (event.target[2].value) {
      setMinCalories(`&minCaloriesPercent=${Math.max(min, Math.min(max, Number(event.target[2].value)))}`);
    } else {
      setMinCalories('');
    }
    if (event.target[3].value) {
      setMaxCalories(`&maxCaloriesPercent=${Math.max(min, Math.min(max, Number(event.target[3].value)))}`);
    } else {
      setMaxCalories('');
    }
    if (event.target[4].value) {
      setMinCarbs(`&minCarbsPercent=${Math.max(min, Math.min(max, Number(event.target[4].value)))}`);
    } else {
      setMinCarbs('');
    }
    if (event.target[5].value) {
      setMaxCarbs(`&maxCarbsPercent=${Math.max(min, Math.min(max, Number(event.target[5].value)))}`);
    } else {
      setMaxCarbs('');
    }
    if (event.target[6].value) {
      setMinProtein(`&minProteinPercent=${Math.max(min, Math.min(max, Number(event.target[6].value)))}`);
    } else {
      setMinProtein('');
    }
    if (event.target[7].value) {
      setMaxProtein(`&maxProteinPercent=${Math.max(min, Math.min(max, Number(event.target[7].value)))}`);
    } else {
      setMaxProtein('');
    }
    if (event.target[8].value) {
      setMinFat(`&minFatPercent=${Math.max(min, Math.min(max, Number(event.target[8].value)))}`);
    } else {
      setMinFat('');
    }
    if (event.target[9].value) {
      setMaxFat(`&maxFatPercent=${Math.max(min, Math.min(max, Number(event.target[9].value)))}`);
    } else {
      setMaxFat('');
    }
    setOffset(0);
  };

  // Dropdown function to update the intolerance filter
  const updateIntolerance = (intoleranceName) => {
    setIntolerance(intoleranceName);
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
      <PageError errorMessage="Oops! Something went wrong" />
    );
  }
  return (
    <Container>
      <Col className="align-items-center">
        <Row style={{ paddingTop: '10px' }}>
          <h1 className="header1-design">Ingredient Search</h1>
        </Row>
        <Row style={{ paddingTop: '20px' }}>
          <Form onSubmit={updateSearchQuery}>
            <Container className="flex">
              <InputGroup className="mb-3">
                <Form.Control
                  type="search"
                  placeholder="Search Ingredients"
                  aria-label="Search"
                  defaultValue={(query === '') ? null : query}
                />
                <Button className="button" type="submit"><BsSearch /></Button>
              </InputGroup>
            </Container>
            <NutrientForm
              data={`${minCalories}${maxCalories}${minCarbs}${maxCarbs}${minProtein}${maxProtein}${minFat}${maxFat}`.replaceAll('Percent', '').slice(1)}
            />
          </Form>
        </Row>
        <Form>
          <Container>
            <Row style={{ paddingTop: '20px' }}>
              <Col className="col-auto">
                <Dropdown onSelect={updateIntolerance}>
                  <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                    {(intolerance !== '') ? intolerance : 'Select Intolerance to Avoid'}
                  </Dropdown.Toggle>
                  <DropdownMenuMaker data={intolerances} val={intolerance} defaultName="Select Intolerance to Avoid" />
                </Dropdown>
              </Col>
              <Col className="col-auto">
                <Dropdown onSelect={updateSortingOption}>
                  <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                    {(sort !== '') ? sort : 'Default Sorting Option'}
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

Ingredients.propTypes = {
  apiKey: PropTypes.string.isRequired,
};
