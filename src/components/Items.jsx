import _ from 'lodash';
import React from 'react';
import {
  Button, Col, ButtonGroup,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { items, vievedItemId } = state;
  return {
    items,
    vievedItemId,
  };
};

@connect(mapStateToProps)
class Items extends React.Component {
  handleChangeViewedItem = id => () => {
    const { changeViewedItem, loadViewedItemData } = this.props;
    changeViewedItem({ id });
    loadViewedItemData({ id });
  };

  render() {
    const { items: { byId, allIds }, vievedItemId} = this.props;
    if (vievedItemId > 0) {
      return null;
    }
    return (
      <div>
        <h1><b>MARKET</b>.chisto</h1>
        <hr />
        <div className="row p-1">
          {
            allIds.map(
              (id) => {
                const { image, name } = byId[id];
                const imgUrl = `https://img.chisto.ru/_src/img/tmb/${image}`;
                return (
                  <div key={_.uniqueId(id)} className="col col-sm-3 p-2">
                    <div className="card w-100">
                      <div className="card-header p-0 height-300 overflow-hidden bg-white">
                        <img src={imgUrl} className="w-100" alt={name} />
                      </div>
                      <div className="card-body height-200">
                        <button
                          className="btn btn-warning rounded-0 w-100"
                          onClick={this.handleChangeViewedItem(id)}
                        >
  Показать
                        </button>
                        <hr />
                        <b className="card-title">{name}</b>

                      </div>
                    </div>
                  </div>
                );
              },
            )
          }
        </div>
      </div>
    );
  }
}

export default Items;
