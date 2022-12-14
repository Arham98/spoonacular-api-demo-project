import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import imgPlaceholder from '../../images/imgPlaceholder.png';
import titleCaseConverter from '../../utils/titleCaseConverter';

export default function EquipmentSmallCard({ equipmentStr }) {
  const equipmentData = JSON.parse(equipmentStr);
  const equipmentImg = `https://spoonacular.com/cdn/equipment_500x500/${equipmentData.image}`;

  return (
    <Col className="col-auto">
      <Card style={{width: '100px', height: 'auto'}}>
        <Card.Img variant="top" src={equipmentImg} alt="Image Not Found"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src=imgPlaceholder;
          }}
        />
        <Card.Header style={{borderRadius: '0em 0em 0.5em 0.5em'}}>{`${titleCaseConverter(equipmentData.name)}`}</Card.Header>
      </Card>
    </Col>
  );
}

EquipmentSmallCard.propTypes = {
  equipmentStr: PropTypes.string.isRequired,
};
