import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class About extends Component {

  render() {
    return (
      <div className="c-page">
        <div className="u-ml-large">
          <Link to="/"><p className="u-inline-block u-mr-small">Home</p></Link>
          <Link to="/about"><p className="u-inline-block u-mr-small">about</p></Link>
          <Link to="/asda"><p className="u-inline-block u-mr-small">asda</p></Link>
        </div>
        <h1>This is the about page!!</h1>
      </div>
    );
  }

}

export default About;
