import _ from 'lodash';
import React from 'react';
import connect from '../connect';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { items, vievedItemId } = state;
  return {
    items,
    vievedItemId,
  };
};

@connect(mapStateToProps)
class Home extends React.Component {
  handleChangeViiewedPage = tagName  => () => {
    const { changeViewedPage } = this.props;
    changeViewedPage(tagName);
  };

  render() {
    const {
    //  items: { byId, allIds }, vievedItemId
    } = this.props;

    return (
      <div className="container">
        <div className="jumbotron">
        <h1 className="display-4">Система анализа цен на Я.Маркете</h1>
        <p className="lead">Добро пожаловать в систему анализа цен товаров бренда "Керхер" на Яндекс.маркете</p>
        <hr className="my-4" />
        <p>Чтобы продолжить, выберите интересующий вас товар</p>
        <button onClick={this.handleChangeViiewedPage('items')} className="btn btn-warning input-lg w-100" >Начать</button>
        </div>
      </div>
    );
  }
}

export default Home;
