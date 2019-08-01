import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import connect from '../connect';
import * as actions from '../actions';
import Chart from './Chart';

const mapStateToProps = (state) => {
  const { vievedItemId, viededItemShops, charts } = state;
  const now = new Date();
  const endTime = now.toISOString().slice(0, 10).replace('T', ' ');
  const startTime = new Date(now.setDate(now.getDate()- 14)).toISOString().slice(0, 10).replace('T', ' ');
  return {
    vievedItemId,
    viededItemShops,
    initialValues: {
      'startTime': startTime,
      'endTime': endTime,
    },
    charts,
  };
};


const prepareChartsData = (charts) => {
  const shopsNames = Object.keys(charts);
  if (shopsNames.length === 0) {
    return [];
  }
  const firstShop = shopsNames[0];
  const dates = charts[firstShop].map(({ model_date }) => model_date);
  const data = dates.reduce(
    (acc, date) => {

      const shopsNamesKeys = shopsNames.reduce(
        (acc, name) => {
          const price = charts[name]
            .find(({model_date}) => model_date === date)
            .model_price;
          return { ...acc, [name]: price };
        },
        {},
      );

      return [
        ...acc,
        {
        name: date,
        ...shopsNamesKeys,
        }
      ];
    },
    [],
  );
  return data;
};

@connect(mapStateToProps)
@reduxForm({ form: 'viededItemShops', enableReinitialize: true })
class ItemInfo extends React.Component {
  handleCloseViewedItem =  () => {
      const { changeViewedItem, reset } = this.props;
    changeViewedItem({ id: 0 });
    reset();
  };

  handleUpdate = (values) => {
    console.log(values);
    const { loadViewedItemPrices, vievedItemId } = this.props;

    const { startTime, endTime, shops } = values;
    console.log(shops);
    const checkboxes = Object.keys(shops)
      .filter(key => shops[key]);
    const time = {
      startTime,
      endTime,
    };
    loadViewedItemPrices({ id: vievedItemId, time, checkboxes });
  };

  render() {
     const {
       vievedItemId,
       viededItemShops,
       handleSubmit,
       submitting,
       pristine,
       charts,
     } = this.props;
    const show = vievedItemId ? true : false;
    if (!show) {
      return null;
    }
    const { byId, allIds } = viededItemShops;
    const  data = prepareChartsData(charts);
    return (
      <div className='w-100'>
        <button className="btn btn-dark float-right m-3" onClick={this.handleCloseViewedItem}>Назад</button>
        <h1><b>MARKET</b>.chisto | Цены</h1>
        <hr />
        <Chart data={data} shops={Object.keys(charts)}/>
        <form onSubmit={handleSubmit(this.handleUpdate)}>
          <div>
            <div className="form-group row input-group-sm">
              <div className="col-xs-4 p-2">
                Дата наблюдения с:
              </div>
              <div className="col-xs-2">
                <Field className="form-control w-100 input-sm" name="startTime" component="input" type="date" />
              </div>
              <div className="col-xs-4 p-2">
                по:
              </div>
              <div className="col-xs-2">
                 <Field className="form-control w-100 input-sm" name="endTime" component="input" type="date" />
              </div>
              <div className="col-xs-2 pl-2">
                <button className="btn btn-warning input-sm" disabled={pristine} type="submit">Проверить</button>
              </div>
            </div>
          <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Магазан</th>
              <th scope="col">Последняя цена</th>
            </tr>
          </thead>
            <tbody>
            { allIds.map(
              id => {
                const checkboxName = 'shops';
                const checkboxValue = byId[id].model_shopName;
                return(
                  <tr key={id}>
                    <td>
                      <Field name={`${checkboxName}['${checkboxValue}']`} component="input" type="checkbox" />
                    </td>
                    <td>
                      {byId[id].model_shopName}
                    </td>
                    <td>
                      {byId[id].model_price}
                    </td>
                  </tr>
                );
              }
            )}
            </tbody>
          </table>
          </div>
          <div>
            <button className="btn btn-secondary" onClick={this.handleCloseViewedItem}>Close</button>
            <button className="btn btn-warning" disabled={pristine} type="submit">Проверить</button>
          </div>
        </form>
      </div>
    );
  }
}

export default ItemInfo;
