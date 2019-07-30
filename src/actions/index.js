import axios from 'axios';
import { retry } from '@lifeomic/attempt'; // https://github.com/lifeomic/attempt
import { createAction } from 'redux-actions';
import routes from '../routes';

export const getItemsRequest = createAction('GET_ITEMS_REQUEST');
export const getItemsSuccess = createAction('GET_ITEMS_SUCCESS');
export const getItemsFailure = createAction('GET_ITEMS_FAILURE');

export const changeViewedItem = createAction('CHANGE_VIEDED_ITEM');

export const getShopsRequest = createAction('GET_SHOPS_REQUEST');
export const getShopsSuccess = createAction('GET_SHOPS_SUCCESS');
export const getShopsFailure = createAction('GET_SHOPS_FAILURE');

export const getPricesRequest = createAction('GET_PRICES_REQUEST');
export const getPricesSuccess = createAction('GET_PRICES_SUCCESS');
export const getPricesFailure = createAction('GET_PRICES_FAILURE');

export const removePrices = createAction('REMOVE_PRICES');

const retryOptions = {
  delay: 300,
  maxAttempts: 3,
  initialDelay: 0,
  minDelay: 0,
  maxDelay: 0,
  factor: 0,
  timeout: 0,
  jitter: false,
  handleError: null,
  handleTimeout: null,
  beforeAttempt: null,
  calculateDelay: null,
};

// https://market.chisto.ru/api/items/
// https://market.chisto.ru/api/items/10776545/shops/
// https://market.chisto.ru/api/items/10776545/prices/

export const getItems = async (dispatch) => {
  const url = routes.itemsPath();
  dispatch(getItemsRequest());
  try {
    const shopName = ['КЛИНСТОР', 'KAUF'];
    const axiosOptions = {
      method: 'GET',
      params: { startTime: '2019-07-08', endTime: '2019-07-29', shopName },
      url,
    };
    const result = await retry(() => axios(axiosOptions), retryOptions);
    dispatch(getItemsSuccess(result.data));
  } catch (e) {
    dispatch(getItemsFailure());
    throw e;
  }
};

export const loadViewedItemData = ({ id }) => async (dispatch) => {
  const url = routes.shopsPath(id);
  dispatch(getShopsRequest());
  try {
    const axiosOptions = {
      method: 'GET',
      url,
    };
    const result = await retry(() => axios(axiosOptions), retryOptions);
    dispatch(getShopsSuccess(result.data));
  } catch (e) {
    dispatch(getShopsFailure());
    throw e;
  }
};

export const loadViewedItemPrices = ({ id, time, checkboxes }) => async (dispatch) => {
  const url = routes.pricesPath(id);
  dispatch(getPricesRequest());
  try {
    const axiosOptions = {
      method: 'GET',
      params: {
        startTime: time.startTime,
        endTime: time.endTime,
        shopName: checkboxes,
      },
      url,
    };
    const result = await retry(() => axios(axiosOptions), retryOptions);
    dispatch(removePrices());
    dispatch(getPricesSuccess(result.data));
  } catch (e) {
    dispatch(getPricesFailure());
    throw e;
  }
};
