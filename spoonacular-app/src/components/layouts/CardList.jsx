import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import RecipeSmallCard from '../cards/RecipeSmallCard';
import IngredientCard from '../cards/IngredientCard';
import titleCaseConverter from '../../utils/titleCaseConverter';

function CardList({ data, type }) {
  let listCards = <div />;
  if (data) {
    listCards = data.map((object) => {
      const dataObjStr = JSON.stringify(object);
      if (type === 'recipe') {
        return (
          <React.Fragment key={object.id}>
            <RecipeSmallCard objectStr={dataObjStr} />
          </React.Fragment>
        );
      } if (type === 'ingredient') {
        return (
          <React.Fragment key={`${object.id}-${object.name}`}>
            <IngredientCard objectStr={dataObjStr} />
          </React.Fragment>
        );
      } if (type === 'product') {
        return (
          <React.Fragment key={`${object.id}-${object.name}`}>
            <RecipeSmallCard objectStr={dataObjStr} />
          </React.Fragment>
        );
      }
      return (<div />);
    });
  } else {
    return (
      <Container fluid>
        <h3 className="header5-design">{`No ${titleCaseConverter(type)}s Found`}</h3>
      </Container>
    );
  }
  if (data.length === 0) {
    return (
      <Container fluid>
        <h3 className="header5-design">{`No ${titleCaseConverter(type)}s Found`}</h3>
      </Container>
    );
  }
  return (
    <Row className="flex-row">
      { listCards }
    </Row>
  );
}

CardList.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  type: PropTypes.string.isRequired,
};

export default CardList;
