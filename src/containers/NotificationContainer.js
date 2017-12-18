import React, { Component } from 'react';
import Notification from '../components/Notification';

class NotificationContainer extends Component {

  componentDidUpdate(prevProps, prevState) {
    console.log('oo');
  }

  handleClick = () => {
    console.log('bbo');
  }

  render() {
    return (
      <div>
        {
          this.props.notifications.map((item) => {
            return <Notification key={this.props.notifications.indexOf(item)} message={"Notification message"} handleClick={this.handleClick}/>
          })
        }
      </div>
    );
  }

}

export default NotificationContainer;