import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class NotFound extends Component {

  render() {
    return (
      <div className="c-page">
        <div>
          <Link to="/"><p className="u-inline-block u-mr-small">Home</p></Link>
          <Link to="/about"><p className="u-inline-block u-mr-small">about</p></Link>
          <Link to="/asda"><p className="u-inline-block u-mr-small">asda</p></Link>
        </div>
        <h1>Not Found!!</h1>
      </div>
    );
  }

}

export default NotFound;
