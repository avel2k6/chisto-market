const host = 'https://market.chisto.ru';
const prefix = 'api';

// https://market.chisto.ru/api/items/
// https://market.chisto.ru/api/items/10776545/shops/
// https://market.chisto.ru/api/items/10776545/prices/

export default {
  itemsPath: () =>
  [host, prefix, 'items'].join('/'),
  shopsPath: id => [host, prefix, 'items', id, 'shops'].join('/'),
  pricesPath: id => [host, prefix, 'items', id, 'prices'].join('/'),
};
