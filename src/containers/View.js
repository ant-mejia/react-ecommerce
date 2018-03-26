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
    return (
      <div className={this.props.mini ? 'c-page_min' : 'c-page'}>
        {title}
        {this.props.children}
      </div>
    );
  }

}

export default View;