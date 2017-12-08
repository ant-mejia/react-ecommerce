import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
              <Link className="c-header-container_menu-item" to="/index">Home</Link>
              <Link className="c-header-container_menu-item" to="/index">Home</Link>
              <Link className="c-header-container_menu-item" to="/index">Home</Link>
              <Link className="c-header-container_menu-item" to="/index">Home</Link>
              <Link className="c-header-container_menu-item" to="/index">Home</Link>
              <Link className="c-header-container_menu-item" to="/index">Home</Link>
              <div className="c-header-container_menu-item-alternate-wrapper">
                <Link to="/login"><p className="c-header-container_menu-item-alternate-item">Sign In</p></Link>
                <Link to="/register"><p className="c-header-container_menu-item-alternate-item">Register</p></Link>
                <p className="c-header-container_menu-item-alternate-item">Link</p>
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