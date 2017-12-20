import React, { Component } from 'react';
import Tappable from 'react-tappable/lib/Tappable';
import PropTypes from 'prop-types';

class Notification extends Component {

  closeNotification = () => {
    this.props.closeNotification(this.props.uid)
  }

  render() {
    return (
      <div className="uk-notification">
        <div className="uk-notification uk-notification-top-center">
          <div className="uk-notification-message uk-transition">
            <Tappable onTap={this.props.handleClick} onPress={this.props.handleClick}>
              {this.props.message}
            </Tappable>
            <span className="" onClick={this.closeNotification}>X</span>
          </div>
        </div>
      </div>
    );
  }
}

Notification.propTypes = {
  message: PropTypes.string.isRequired
};


export default Notification;