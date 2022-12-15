import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function CardList({ data, type }) {
  let listCards = <div />;
  if (data) {
    listCards = data.map((object) => {
      const dataObjStr = JSON.stringify(object);
      return (
        <React.Fragment key={object.id}>
          {
            // type === 'Events'
            //   ? <EventCard eventStr={dataObjStr} />
            //   : <PerformerCard performerStr={dataObjStr} />
          }
        </React.Fragment>
      );
    });
  } else {
    return (
      <Container fluid>
        <h3 className="header5-design">{`No ${type} Available`}</h3>
      </Container>
    );
  }
  if (data.length === 0) {
    return (
      <Container fluid>
        <h3 className="header5-design">{`No ${type} Available`}</h3>
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
