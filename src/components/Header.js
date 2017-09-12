import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true
    };
  }

  render() {
    return (
      <header ref="header" className='c-header'>
        <div className="c-header-menu u-fixed">
          <div ref="headerMenuButton" onClick={this.props.toggleHeader} className="c-header-menu_button">
            <span/>
          </div>
        </div>
        <div className="c-header-container">
          <div className="c-header-container_menu">
            <div className="c-header-container_menu-wrapper">
              <h1 className="c-header-container_menu-item">Home</h1>
              <h1 className="c-header-container_menu-item">Home</h1>
              <h1 className="c-header-container_menu-item">Home</h1>
              <h1 className="c-header-container_menu-item">Home</h1>
              <h1 className="c-header-container_menu-item">Home</h1>
              <h1 className="c-header-container_menu-item">Home</h1>
              <p className="c-header-container_menu-item-alternate">Alternate Link</p>
              <div>
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
