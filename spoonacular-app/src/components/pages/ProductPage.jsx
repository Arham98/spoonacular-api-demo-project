/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import { useParams } from 'react-router-dom';
import Loading from '../utilities/Loading';
import PageError from './PageError';
import TagMaker from '../layouts/TagMaker';
import useFetch from '../../hooks/useFetch';
import imgPlaceholder from '../../images/imgPlaceholder.png';
import htmlParser from '../../utils/htmlParser';

export default function ProductPage({ apiKey }) {
  const params = useParams();

  // These are Spoonacular and external scripts needed for full
  // functionality of the Spoonacular widgets
  const preScripts = {
    'Nutrition Widget': [
      '<script src="https://code.jquery.com/jquery-1.9.1.min.js" type="text/javascript"></script>',
      '<script src="https://spoonacular.com/application/frontend/js/jquery.canvasjs.min" type="text/javascript"></script>',
    ],
    'Nutrition Label': [],
  };
  const postScripts = {
    'Nutrition Widget': [
      '<script src="https://spoonacular.com/application/frontend/js/nutritionWidget.min.js?c=1" type="text/javascript"></script>',
    ],
    'Nutrition Label': [],
  };

  // Setting initial loading states as true
  const placeholderImage = imgPlaceholder;
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

  // API Call setup for Product's information
  const urlProductInfo = `https://api.spoonacular.com/food/products/${params.productId}`;
  const {
    data: dataProductInfo,
    success: successProductInfo,
    loading: loadingProductInfo,
  } = useFetch(
    urlProductInfo,
    optionsStrJSON,
  );

  // API Call setup for Product's widget
  const queryParametersProductWidget = new URLSearchParams({
    defaultCss: true,
  });
  const [urlProductWidget, setUrlProductWidget] = useState(`https://api.spoonacular.com/food/products/${params.productId}/nutritionWidget?${queryParametersProductWidget}`);
  const {
    data: dataProductWidget,
    success: successProductWidget,
    loading: loadingProductWidget,
  } = useFetch(
    urlProductWidget,
    optionsStrWidget,
  );

  // Dropdown Function to update widget
  const dropdownWidgetUpdate = (selectedWidget) => {
    setWidgetName(selectedWidget);
    let widgetPath = selectedWidget.replaceAll(' ', '');
    const firstLetter = widgetPath.substr(0, 1).toLowerCase();
    widgetPath = firstLetter + widgetPath.substr(1, widgetPath.length - 1);
    const newWidgetPath = `https://api.spoonacular.com/food/products/${params.productId}/${widgetPath}?${queryParametersProductWidget}`;
    setUrlProductWidget(newWidgetPath);
  };

  if (loadingProductInfo || loadingProductWidget) {
    return (
      <Loading />
    );
  } if (!(successProductInfo && successProductWidget)) {
    console.log('The following errors were encountered:');
    if (dataProductInfo.error) {
      console.log(`URL -> ${urlProductInfo}`);
      console.log(`Error -> ${dataProductInfo.error}\n`);
    }
    if (dataProductWidget.error) {
      console.log(`URL -> ${urlProductWidget}`);
      console.log(`Error -> ${dataProductWidget.error}\n`);
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
              <h2 className="header1-design">{dataProductInfo.title}</h2>
              <div style={{ color: 'white' }}>
                {parse(htmlParser(dataProductInfo.description))}
              </div>
              <p />
              <p style={{ color: 'white' }}>
                <b>Brand:</b>
                {
                ` ${dataProductInfo.brand}`
                }
              </p>
            </Row>
          </Col>
          <Col className="col-auto">
            <Image
              className="img-fluid"
              src={(dataProductInfo.image) ? dataProductInfo.image : placeholderImage}
              alt=""
              style={{ borderRadius: '0.5em' }}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = imgPlaceholder;
              }}
            />
          </Col>
        </Row>
        <Row>
          <h3 className="header3-design">Product Details</h3>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col className="d-flex justify-content-center">
            <Card style={{ width: '1250px' }}>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item className="list-group-item-card">
                    <Row>
                      <Col style={{ textAlign: 'center', color: '#01B636' }}>
                        <b>Price</b>
                      </Col>
                      <Col style={{ textAlign: 'center' }}>
                        {`$${dataProductInfo.price}`}
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col style={{ textAlign: 'center', color: '#01B636' }}>
                        <b>UPC</b>
                      </Col>
                      <Col style={{ textAlign: 'center' }}>
                        {(dataProductInfo.upc) ? (dataProductInfo.upc) : '–'}
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col style={{ textAlign: 'center', color: '#01B636' }}>
                        <b>Servings</b>
                      </Col>
                      <Col style={{ textAlign: 'center' }}>
                        {`${dataProductInfo.servings.number} ${(dataProductInfo.servings.unit) ? (dataProductInfo.servings.unit) : ''}`}
                      </Col>
                    </Row>
                    <hr />
                    <Row className="justify-content-center">
                      <Col className="col-6" style={{ textAlign: 'center', color: '#01B636' }}>
                        <b>Badges</b>
                      </Col>
                      <Col className="col-6" style={{ textAlign: 'center' }}>
                        <TagMaker data={dataProductInfo.badges} />
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col style={{ textAlign: 'center', color: '#01B636' }}>
                        <b>Type</b>
                      </Col>
                      <Col style={{ textAlign: 'center' }}>
                        <TagMaker data={dataProductInfo.breadcrumbs} />
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col style={{ textAlign: 'center', color: '#01B636' }}>
                        <b>Comments</b>
                      </Col>
                      <Col style={{ textAlign: 'center' }}>
                        {(dataProductInfo.generatedText) ? (parse(dataProductInfo.generatedText)) : '–'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <h3 className="header3-design">Product Attributes</h3>
          <Dropdown onSelect={dropdownWidgetUpdate} focusFirstItemOnShow="true">
            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
              {widgetName}
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              <Dropdown.Item eventKey="Nutrition Widget">Nutrition Widget</Dropdown.Item>
              <Dropdown.Item eventKey="Nutrition Label">Nutrition Label</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div style={{ paddingBottom: '30px' }} />
        </Row>
        <Row>
          <Col style={{ textAlign: 'center' }}>
            <iframe
              title="widget-frame"
              src={`${urlProductWidget}&apiKey=${apiKey}`}
              srcDoc={`${
                preScripts[widgetName].join('')
              }<div style="padding-top: 100px;">${
                dataProductWidget.replaceAll('hidden', 'visible').replace('width:100%', 'width:30%')}${
                postScripts[widgetName].join('')
              }<div style="padding-top: 200px;">`}
              style={{
                background: 'white', borderRadius: '0.5em', width: '1250px', height: '560px',
              }}
            />
          </Col>
        </Row>
      </Col>
    </Container>
  );
}

ProductPage.propTypes = {
  apiKey: PropTypes.string.isRequired,
};
