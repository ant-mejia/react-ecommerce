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
      <header ref="header" className='c-header u-fixed'>
        <div className="c-header-menu">
          <div ref="headerMenuButton" onClick={this.props.toggleHeader} className="c-header-menu_button">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png"/>
          </div>
        </div>
        <div className="c-header-container">
          <div className="page-stack"></div>
        </div>
      </header>
    );
  }

}

export default Header;
