import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';
import CardSlider from '../layouts/CardSlider';

export default function RecipeInstructionCard({ data, apiKey }) {
  let listCards = <div />;
  if (data && data.length !== 0) {
    listCards = data[0].steps.map((object) => (
      <Carousel.Item key={object.number}>
        <Container style={{ width: '80%' }}>
          <Card>
            <Card.Header className="header" style={{ fontSize: '20px' }}><b>{`Step ${object.number}`}</b></Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item className="list-group-item-card">{`${object.step}`}</ListGroup.Item>
                <ListGroup.Item className="list-group-item-card">
                  <b>Ingredeints involved:</b>
                  <CardSlider data={object.ingredients} type="ingredient-small" emptyMessage="–" apiKey={apiKey} />
                </ListGroup.Item>
                <ListGroup.Item className="list-group-item-card">
                  <b>Equipment to use:</b>
                  <CardSlider data={object.equipment} type="equipment-small" emptyMessage="–" apiKey={apiKey} />
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Container>
      </Carousel.Item>
    ));
  } else {
    return (
      <Container fluid>
        <h3 style={{ color: 'white' }}>Data Not Available</h3>
      </Container>
    );
  }
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
      {listCards}
    </Carousel>
  );
}

RecipeInstructionCard.propTypes = {
  apiKey: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
};
