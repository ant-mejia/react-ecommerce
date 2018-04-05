import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = { items: ['hello', 'world', 'click', 'me'] };
  }

  render() {
    const items = this.state.items.map((item, i) => (
      <div key={item}>
        {item}
      </div>
    ));
    return (
      <div className="u-fixed">
        {this.props.text}
      </div>
    );
  }
}

export default SideNav;