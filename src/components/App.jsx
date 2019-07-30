import React from 'react';
import {
  Row, Col,
} from 'react-bootstrap';
import Items from './Items';
import ItemInfo from './ItemInfo';


const App = () => (
  <Row>
    <Items />
    <ItemInfo />
  </Row>
);

export default App;
