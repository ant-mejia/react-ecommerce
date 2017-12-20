import React, { Component } from 'react';
import Notification from '../components/Notification';

class NotificationContainer extends Component {

  componentDidUpdate(prevProps, prevState) {
    // console.log('oo');
  }

  handleClick = () => {
    console.log('bbo');
  }
  closeNotification = (uid) => {
    this.props.closeNotification(uid);
  }

  render() {
    return (
      <div className="c-notification_container">
        {
          this.props.notifications.map((item) => {
            return <Notification uid={item.uid} key={this.props.notifications.indexOf(item)} message={"Notification message"} closeNotification={this.closeNotification} handleClick={this.handleClick}/>
          })
        }
      </div>
    );
  }

}

export default NotificationContainer;