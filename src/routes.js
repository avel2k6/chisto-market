const host = 'https://market.chisto.ru';
const prefix = 'api';

// https://market.chisto.ru/api/items/
// https://market.chisto.ru/api/items/10776545/shops/
// https://market.chisto.ru/api/items/10776545/prices/
// https://market.chisto.ru/api/shops/?date=2019-06-01
// http://market.chisto.ru/api/shops/prices/?date=2019-08-01&shopNames%5B%5D=0%D0%94%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0.%D1%80%D1%83&shopName%5B%5D=123.ru&shopNames%5B%5D=Karcher.ru&shopNames%5B%5D=%D0%91%D0%95%D0%A0%D0%A3

export default {
  itemsPath: () => [host, prefix, 'items'].join('/'),
  shopsPath: id => [host, prefix, 'items', id, 'shops'].join('/'),
  pricesPath: id => [host, prefix, 'items', id, 'prices'].join('/'),
  allShopsPath: () => [host, prefix, 'shops'].join('/'),
  allShopsPrices: () => [host, prefix, 'shops', 'prices'].join('/'),
};
