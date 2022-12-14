import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { useParams } from 'react-router-dom';
import Loading from '../utilities/Loading';
import PageError from './PageError';
import CardSlider from '../layouts/CardSlider';
import TagMaker from '../layouts/TagMaker';
import RecipeInstructionCard from '../cards/RecipeInstructionCard';
import useFetch from '../../hooks/useFetch';
import imgPlaceholder from '../../images/imgPlaceholder.png';
import { BsFillCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";


export default function RecipePage({ apiKey }) {
  const params = useParams();
  const trueIcon = (<BsFillCheckCircleFill style={{color: 'green'}}/>);
  const falseIcon = (<BsFillXCircleFill style={{color: 'red'}}/>);

  // These are Spoonacular and external scripts needed for full functionality of the Spoonacular widgets
  const preScripts = {
    "Nutrition Widget":   [
      '<script src="https://code.jquery.com/jquery-1.9.1.min.js" type="text/javascript"></script>',
      '<script src="https://spoonacular.com/application/frontend/js/jquery.canvasjs.min" type="text/javascript"></script>',
    ],
    "Nutrition Label":   [],
    "Taste Widget":   [
      '<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js" type="text/javascript"></script>',
    ],
    "Equipment Widget":   [
      '<script src="https://code.jquery.com/jquery-1.9.1.min.js" type="text/javascript"></script>',
      '<script src="https://spoonacular.com/application/frontend/js/jquery.canvasjs.min" type="text/javascript"></script>',
    ],
    "Ingredient Widget":   [
      '<script src="https://code.jquery.com/jquery-1.9.1.min.js" type="text/javascript"></script>',
      '<script src="https://spoonacular.com/application/frontend/js/jquery.canvasjs.min" type="text/javascript"></script>',
    ],
    "Price Breakdown Widget":   [
      '<script src="https://code.jquery.com/jquery-1.9.1.min.js" type="text/javascript"></script>',
      '<script src="https://spoonacular.com/application/frontend/js/jquery.canvasjs.min" type="text/javascript"></script>',
      '<script src="https://spoonacular.com/application/frontend/js/ingredientWidget.min.js?c=1" type="text/javascript"></script>',
    ],
  };
  const postScripts = {
    "Nutrition Widget":   [
      '<script src="https://spoonacular.com/application/frontend/js/nutritionWidget.min.js?c=1" type="text/javascript"></script>',
    ],
    "Nutrition Label":   [],
    "Taste Widget":   [],
    "Equipment Widget":   [
      '<script src="https://spoonacular.com/application/frontend/js/equipmentWidget.min.js?c=1" type="text/javascript"></script>',
    ],
    "Ingredient Widget":   [
      '<script src="https://spoonacular.com/application/frontend/js/ingredientWidget.min.js?c=1" type="text/javascript"></script>',
    ],
    "Price Breakdown Widget":   [],
  };

  // Setting initial loading states as true
  const placeholderImage = imgPlaceholder;
  const [open, setOpen] = useState(false);
  const [widgetName, setWidgetName] = useState('Nutrition Widget');

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
  const headerParametersWidget = {
    'x-api-key': apiKey,
    'content-type': 'text/html',
  };
  const optionsWidget = {
    method: 'GET',
    headers: headerParametersWidget,
  };
  const optionsStrWidget = JSON.stringify(optionsWidget);

  // API Call setup for Recipe's information
  const queryParametersRecipeInfo = new URLSearchParams({
    includeNutrition: false,
  });
  const urlRecipeInfo = `https://api.spoonacular.com/recipes/${params.recipeId}/information?${queryParametersRecipeInfo}`;
  const { data: dataRecipeInfo, success: successRecipeInfo , loading: loadingRecipeInfo } = useFetch(
    urlRecipeInfo,
    optionsStrJSON,
  );

  // API Call setup for similar Recipes
  const queryParametersSimilarRecipes = new URLSearchParams({
    number: 3,
  });
  const urlSimilarRecipes = `https://api.spoonacular.com/recipes/${params.recipeId}/similar?${queryParametersSimilarRecipes}`;
  const { data: dataSimilarRecipes, success: successSimilarRecipes , loading: loadingSimilarRecipes } = useFetch(
    urlSimilarRecipes,
    optionsStrJSON,
  );
  
  // API Call setup for Recipe's widget
  const queryParametersRecipeWidget = new URLSearchParams({
    defaultCss: true,
  });
  const [urlRecipeWidget, setUrlRecipeWidget] = useState(`https://api.spoonacular.com/recipes/${params.recipeId}/nutritionWidget?${queryParametersRecipeWidget}`);
  const { data: dataRecipeWidget, success: successRecipeWidget , loading: loadingRecipeWidget } = useFetch(
    urlRecipeWidget,
    optionsStrWidget,
  );
  
  // Dropdown Function to update widget
  function dropdownWidgetUpdate(widgetName) {
    setWidgetName(widgetName);
    let widgetPath = widgetName.replaceAll(' ', '');
    widgetPath = widgetPath.substr(0, 1).toLowerCase() + widgetPath.substr(1, widgetPath.length-1);
    const newWidgetPath = `https://api.spoonacular.com/recipes/${params.recipeId}/${widgetPath}?${queryParametersRecipeWidget}`;
    setUrlRecipeWidget(newWidgetPath);
  }

  if (loadingRecipeInfo || loadingSimilarRecipes || loadingRecipeWidget) {
    return (
      <Loading />
    );
  } if (!(successRecipeInfo && successSimilarRecipes && successRecipeWidget)) {
    console.log('The following errors were encountered:');
    if (dataRecipeInfo.error) {
      console.log(`URL -> ${urlRecipeInfo}`);
      console.log(`Error -> ${dataRecipeInfo.error}\n`);
    }
    if (dataSimilarRecipes.error) {
      console.log(`URL -> ${urlSimilarRecipes}`);
      console.log(`Error -> ${dataSimilarRecipes.error}\n`);
    }
    if (dataRecipeWidget.error) {
      console.log(`URL -> ${urlRecipeWidget}`);
      console.log(`Error -> ${dataRecipeWidget.error}\n`);
    }
    return (
      <PageError />
    );
  }
  return (
    <React.Fragment>
      <Container>
        <Col className="align-items-center">
          <Row style={{paddingTop: '20px'}}>
            <Col>
              <Row>
                <h1 className="header1-design">{dataRecipeInfo.title}</h1>
                <TagMaker data={dataRecipeInfo.dishTypes}/>
                <div style={{color: 'white'}}>{parse(dataRecipeInfo.summary)}</div>
                <p/>
                <p style={{color: 'white'}}>– By <a href={dataRecipeInfo.sourceUrl}>{dataRecipeInfo.creditsText}</a></p>
              </Row>
            </Col>
            <Col className="col-auto">
              <Image className="img-fluid" src={(dataRecipeInfo.image) ? dataRecipeInfo.image : placeholderImage} alt="" style={{borderRadius: '0.5em' }}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src=imgPlaceholder;
                }}
              />
            </Col>
          </Row>
          <Row>
            <h3 className="header5-design">Instructions</h3>
          </Row>
          <Collapse in={open} style={{padding: '30px'}}>
          <Row id="collapse-instructions">
            <RecipeInstructionCard data={dataRecipeInfo.analyzedInstructions}/>
          </Row>
          </Collapse>
          <div className="text-center">
            <Button
              onClick={() => setOpen(!open)}
              aria-controls="collapse-instructions"
              aria-expanded={open}
              className="button"
            >
              <b>{(open) ? 'Collapse Instructions' : 'Expand Instructions'}</b>
            </Button>
            </div>
          <Row>
            <h3 className="header5-design">Diet Type</h3>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col className="d-flex justify-content-center">
              <Card style={{width: '1250px'}}>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="list-group-item-card">
                    <Row>
                      <Col style={{textAlign: 'center'}}>
                        <b>Vegetarian</b>
                      </Col>
                      <Col style={{textAlign: 'center'}}>
                        {(dataRecipeInfo.vegetarian)?trueIcon:falseIcon}
                      </Col>
                    </Row>  
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group-item-card">
                    <Row>
                      <Col style={{textAlign: 'center'}}>
                        <b>Vegan</b>
                      </Col>
                      <Col style={{textAlign: 'center'}}>
                        {(dataRecipeInfo.vegan)?trueIcon:falseIcon}
                      </Col>
                    </Row>  
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group-item-card">
                    <Row>
                      <Col style={{textAlign: 'center'}}>
                        <b>Gluten Free</b>
                      </Col>
                      <Col style={{textAlign: 'center'}}>
                        {(dataRecipeInfo.glutenFree)?trueIcon:falseIcon}
                      </Col>
                    </Row>  
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group-item-card">
                    <Row>
                      <Col style={{textAlign: 'center'}}>
                        <b>Dairy Free</b>
                      </Col>
                      <Col style={{textAlign: 'center'}}>
                        {(dataRecipeInfo.dairyFree)?trueIcon:falseIcon}
                      </Col>
                    </Row>  
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group-item-card">
                    <Row>
                      <Col style={{textAlign: 'center'}}>
                        <b>Healthy</b>
                      </Col>
                      <Col style={{textAlign: 'center'}}>
                        {(dataRecipeInfo.veryHealthy)?trueIcon:falseIcon}
                      </Col>
                    </Row>  
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
            </Card>
            </Col>
          </Row>
          <Row>
            <h3 className="header3-design">Recipe Attributes</h3>
            <Dropdown onSelect={dropdownWidgetUpdate} focusFirstItemOnShow="true">
              <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                {widgetName}
              </Dropdown.Toggle>
              <Dropdown.Menu variant="dark">
                <Dropdown.Item eventKey="Nutrition Widget">Nutrition Widget</Dropdown.Item>
                <Dropdown.Item eventKey="Nutrition Label">Nutrition Label</Dropdown.Item>
                <Dropdown.Item eventKey="Taste Widget">Taste Widget</Dropdown.Item>
                <Dropdown.Item eventKey="Equipment Widget">Equipment Widget</Dropdown.Item>
                <Dropdown.Item eventKey="Ingredient Widget">Ingredient Widget</Dropdown.Item>
                <Dropdown.Item eventKey="Price Breakdown Widget">Price Breakdown Widget</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div style={{paddingBottom: '30px'}}/>
          </Row>
          <Row>
            <Col style={{textAlign: 'center'}}>
              <iframe src={`${urlRecipeWidget}&apiKey=${apiKey}`} srcDoc={`${preScripts[widgetName].join('')}<div style="padding-top: 100px;">${dataRecipeWidget.replaceAll('hidden', 'visible').replace("width:100%", "width:30%")}${postScripts[widgetName].join('')}<div style="padding-top: 200px;">`} style={{background: 'white', borderRadius: '0.5em', width:"1250px", height:"560px"}}></iframe>
            </Col>
            
          </Row>
          <Row>
            <h3 className="header3-design">Similar Recipes</h3>
          </Row>
          <CardSlider data={dataSimilarRecipes} type="recipe" emptyMessage="Data Not Available" />
        </Col>
      </Container>
    </React.Fragment>
  );
}

RecipePage.propTypes = {
  apiKey: PropTypes.string.isRequired,
};