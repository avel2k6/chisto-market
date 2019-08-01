import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const items = handleActions({
  [actions.getItemsSuccess](state, { payload: { items: goods } }) {
    const newByid = goods.reduce(
      (acc, item) => {
        const { market_id: marketId } = item;
        return {
          ...acc,
          [marketId]: item,
        };
      },
      {},
    );
    const newAllIds = goods.map(({ market_id: marketId }) => marketId);
    return {
      byId: newByid,
      allIds: newAllIds,
    };
  },

},
{ byId: {}, allIds: [] });

const vievedItemId = handleActions(
  {
    [actions.changeViewedItem](state, { payload: { id } }) {
      return id;
    },
  },
  0,
);

const viededItemShops = handleActions(
  {
    [actions.getShopsSuccess](state, { payload: { shops } }) {
      const newByID = shops.reduce(
        (acc, shop) => {
          const { id } = shop;
          return { ...acc, [id]: shop };
        },
        {},
      );
      const newAllIds = shops.map(({ id }) => id);
      return {
        byId: newByID,
        allIds: newAllIds,
      };
    },
  },
  { byId: {}, allIds: [] },
);

const charts = handleActions(
  {
    [actions.changeViewedItem]() {
      return {};
    },
    [actions.removePrices]() {
      return {};
    },
    [actions.getPricesSuccess](state, { payload: { shopsByName } }) {
      return shopsByName;
    },
  },
  {},
);

const shops = handleActions(
  {
    [actions.getAllShopsSuccess](state, { payload: { shops: allShops } }) {
      return allShops;
    },
  },
  [],
);

const compareShopsPrices = handleActions(
  {
    [actions.getAllPricesSuccess](state, { payload: { prices } }) {
      return prices;
    },
  },
  [],
);

const compareShops = handleActions(
  {
    [actions.getCompareShops](state, { payload: { checkboxes } }) {
      return checkboxes;
    },
  },
  [],
);

const viewedPage = handleActions(
  {
    [actions.changeViewedPage](state, { payload: tagName }) {
      return tagName;
    },
  },
  'home',
);

export default combineReducers({
  items,
  vievedItemId,
  viededItemShops,
  charts,
  viewedPage,
  shops,
  compareShops,
  compareShopsPrices,
  form: formReducer,
});
