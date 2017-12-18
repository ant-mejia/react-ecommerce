import React, { Component } from 'react';
import Tappable from 'react-tappable/lib/Tappable';
import PropTypes from 'prop-types';

class Notification extends Component {

  render() {
    return (
      <div className="uk-notification">
        <Tappable className="uk-notification uk-notification-top-center" onTap={this.props.handleClick} onPress={this.props.handleClick}>
          <div className="uk-notification-message uk-transition">
            <div>{this.props.message}</div>
          </div>
        </Tappable>
      </div>
    );
  }
}

Notification.propTypes = {
  message: PropTypes.string.isRequired
};


export default Notification;