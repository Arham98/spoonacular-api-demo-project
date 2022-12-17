/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import imgPlaceholder from '../../images/imgPlaceholder.png';
import titleCaseConverter from '../../utils/titleCaseConverter';

export default function ProductCard({ objectStr }) {
  const productData = JSON.parse(objectStr);
  const imageType = (productData.imageType) ? productData.imageType : 'jpeg';
  const productImg = `https://spoonacular.com/productImages/${productData.id}-636x393.${imageType}`;
  return (
    <Col className="col-auto" style={{ paddingBottom: '24px' }}>
      <Card style={{ width: '300px', height: 'auto' }}>
        <a
          href={`/products/${productData.id}`}
          className="stretched-link"
          style={{
            color: 'white', fontSize: 14, textDecoration: 'none',
          }}
        >
          <Card.Img
            variant="top"
            src={productImg}
            alt="Image Not Found"
            style={{ maxHeight: '300px' }}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = imgPlaceholder;
            }}
          />
        </a>
        <Card.Header style={{ borderRadius: '0em 0em 0.5em 0.5em' }}>{`${titleCaseConverter(productData.title)}`}</Card.Header>
      </Card>
    </Col>
  );
}

ProductCard.propTypes = {
  objectStr: PropTypes.string.isRequired,
};
