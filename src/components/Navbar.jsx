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
class Navbar extends React.Component {
  handleChangeViiewedPage = tagName  => () => {
    const { changeViewedPage } = this.props;
    changeViewedPage(tagName);
  };

  render() {
    const {
    //  items: { byId, allIds }, vievedItemId
    } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Меню</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active" onClick={this.handleChangeViiewedPage('home')}>
              <a className="nav-link" href="#">Главная <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item" onClick={this.handleChangeViiewedPage('items')}>
              <a className="nav-link" href="#">Товары</a>
            </li>
            <li className="nav-item" onClick={this.handleChangeViiewedPage('shops')}>
              <a className="nav-link" href="#">Компании</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
