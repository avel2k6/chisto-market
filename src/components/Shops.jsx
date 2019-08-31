import _ from 'lodash';
import React from 'react';
import {
  Button, Col, ButtonGroup,
} from 'react-bootstrap';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import connect from '../connect';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { shops, compareShopsPrices, compareShops } = state;
  const today = new Date().toISOString().slice(0, 10).replace('T', ' ');
  return {
    shops,
    compareShops,
    compareShopsPrices,
    initialValues: {
      date: today,
    },
  };
};

@connect(mapStateToProps)
@reduxForm({ form: 'allShops', enableReinitialize: true })
class Shops extends React.Component {
  handleUpdate = (values) => {
    const { getAllPrices, getCompareShops } = this.props;
    const { shops, date } = values;
    const checkboxes = Object.keys(shops)
      .filter(key => shops[key]);
    getAllPrices({ date, checkboxes });
    getCompareShops({ checkboxes });
  };

  componentDidMount() {
    const { getAllShops } = this.props;
    const currentTime = new Date().toISOString().slice(0, 10).replace('T', ' ');
    getAllShops(currentTime);
  }

  render() {
    const {
      shops, handleSubmit, compareShopsPrices, compareShops,
    } = this.props;
    console.log(compareShopsPrices);
    return (
      <div className="w-100 row">
        <div className="col-md-3 d-none d-md-block bg-light sidebar h-100">
          <div className="border-right p-3 sidebar-sticky">
            <form onSubmit={handleSubmit(this.handleUpdate)}>
              <button type="submit" className="btn btn-warning rounded-0 w-100">Отправить</button>
              <Field className="form-control w-100 input-sm rounded-0" name="date" component="input" type="date" />
              <div className="p-1">
                {shops.map(
                  (shop) => {
                    const checkboxName = 'shops';
                    const checkboxValue = shop;
                    return (
                      <p key={_.uniqueId(shop)}>
                        <Field name={`${checkboxName}['${checkboxValue}']`} component="input" type="checkbox" className="mr-1" />
                        {shop.substr(0, 12)}
                      </p>
                    );
                  },
                )}
              </div>
              <button type="submit" className="btn btn-warning rounded-0 w-100">Отправить</button>
            </form>
          </div>
        </div>
        <div role="main" className="col-md-7 ml-sm-auto col-lg-9 px-4">
          <table className="table">
            <thead>
              <tr>
                <th key={_.uniqueId('td')} scope="col">Артикул</th>
                <th key={_.uniqueId('td')} scope="col">Название</th>
                {compareShops
                  .map(
                    name => <th scope="col" key={_.uniqueId('th')}>{name.substr(0, 20)}</th>,
                  )
              }
              </tr>
            </thead>
            <tbody>
              {
            compareShopsPrices
              .map(
                (item) => {
                  const { code, name, prices } = item;
                  const shopPrices = _.keyBy(prices, ({ model_shopName }) => model_shopName);
                  const prisesTds = compareShops
                    .map(
                      name => (
                        <td key={_.uniqueId('td')}>
                          {
                        shopPrices[name]
                          ? shopPrices[name].model_price
                          : 0}
                        </td>
                      ),
                    );

                  if (prices === false) {
                    return null;
                  }
                  if (prices.reduce((acc, shop) => shop.model_price * 1 + acc, 0) === 0) {
                    return null;
                  }
                  return (
                    <tr key={_.uniqueId('tr')}>
                      <th key={_.uniqueId('th')}>{code}</th>
                      <td key={_.uniqueId('td')}>{name}</td>
                      {prisesTds}
                    </tr>
                  );
                },
              )
          }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Shops;
