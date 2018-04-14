import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import View from '../containers/View';
class About extends Component {

  render() {
    return (
      <View classNames="p-about">
        <div className="p-about_heading-wrapper">
          <div className="u-text-center"><h1 className="p-about_heading text-gradient-marble-9">About Us</h1></div>
        </div>
        <div className="u-vh-1"></div>
      </View>
    );
  }

}

export default About;