import React, { Component } from 'react';
import { Helmet } from "react-helmet";

class View extends Component {

  render() {
    let title = null
    if (this.props.title) {
      title = (
        <Helmet>
          <title>{this.props.title}</title>
        </Helmet>
      )
    }
    let className = 'c-page';
    if (this.props.mini) {
      className = 'c-page_min'
    } else if (this.props.wrap) {
      className = 'c-page_wrap'
    }
    return (
      <div className={className}>
        {title}
        {this.props.children}
      </div>
    );
  }

}

export default View;