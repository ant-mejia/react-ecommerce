import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let cartLength = this.props.store.cart ? this.props.store.cart.length : 0;
    return (
      <header ref="header" className='c-header'>
        <div className="c-header-menu u-fixed">
          <div ref="headerMenuButton" onClick={this.props.toggleHeader} className="c-header-menu_button">
            <span/>
          </div>
          {/* <div>
            <img src="https://cdn.dribbble.com/assets/logo-bw-0200c7483844c355752e89efaa4ba89b83c9c591d70254ba10f4b25d901359d0.gif"/>
          </div> */}
        </div>
        <div className="c-header-container">
          <div className="c-header-container_menu">
            <div className="c-header-container_menu-wrapper">
              <Link className="c-header-container_menu-item" to="/">Home</Link>
              <Link className="c-header-container_menu-item" to="/collections">Collections</Link>
              <Link className="c-header-container_menu-item" to="/search">Search</Link>
              <Link className="c-header-container_menu-item" to="/products">Products</Link>
              <Link className="c-header-container_menu-item" to="/products/test-product">Test Product</Link>
              <Link className="c-header-container_menu-item" to="/products/unavailable">Unavailable</Link>
              <div className="c-header-container_menu-item-alternate-wrapper">
                <div className="c-header-container_menu-item-alternate-item">
                  { this.props.isUserAuth() ? <Link to="/orders">
                    <p className="">Order History</p>
                  </Link> : <Link to="/register">
                    <p>Register</p>
                  </Link>
                  }
                </div>
                <div className="c-header-container_menu-item-alternate-item">
                  { this.props.isUserAuth() ? <Link to="/account">
                    <p>My Account</p>
                  </Link> : <Link to="/login">
                    <p>Sign In</p>
                  </Link>
                  }
                </div>
                <div className="c-header-container_menu-item-alternate-item">
                  <Link to="/cart"><p>Cart ({cartLength})</p></Link>
                </div>
              </div>
              <div className="c-header-container_menu-footer">
                This is a really, really, really, really, really, really, really, really, really, really, really, long sentence
              </div>
            </div>
          </div>
          <div className="c-header-container_page-stack"></div>
        </div>
      </header>
    );
  }

}

export default Header;