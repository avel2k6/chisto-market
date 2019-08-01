import React from 'react';
import connect from '../connect';
import * as actions from '../actions';
import Navbar from './Navbar';
import Home from './Home';
import Items from './Items';
import ItemInfo from './ItemInfo';
import Shops from './Shops';

const mapStateToProps = (state) => {
  const { viewedPage } = state;
  return {
    viewedPage,
  };
};

const components = {
  home: Home,
  items: Items,
  itemInfo: ItemInfo,
  shops: Shops,
};

@connect(mapStateToProps)
class App extends React.Component {
  handleChangeViiewedPage = tagName  => () => {
    const { changeViewedPage } = this.props;
    changeViewedPage(tagName);
  };

  render() {
    const { viewedPage } = this.props;
    const TagName = components[viewedPage];
    return (
      <div>
        <Navbar />
        <div>
          <TagName/>
        </div>
      </div>
    );
  }
}

export default App;
