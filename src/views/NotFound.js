import React, { Component } from 'react';
import View from '../containers/View'
import { Link } from 'react-router-dom';
class NotFound extends Component {

  render() {
    return (
      <View classNames="p-notFound u-flex u-flex-col@sm">
        <div className="p-notFound_wrapper u-text-center@sm">
          <h1 className="p-notFound_title u-font-lato2">404</h1>
          <h3 className="p-notFound_summary">It seems like you've hit a dead end...</h3>
          <div>
            <Link to="/" className="p-notFound_button">
              Return Home
            </Link>
          </div>
        </div>
      </View>
    );
  }
}

export default NotFound;