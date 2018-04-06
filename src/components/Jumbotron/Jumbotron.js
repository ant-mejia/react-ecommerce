import React, { Component } from 'react';
import CreativeJumbo from './CreativeJumbo';

class Jumbotron extends Component {

  render() {
    let Jumbo = <CreativeJumbo content={this.props.content}/>
    if (this.props.type === 'creative') {
      Jumbo = <CreativeJumbo content={this.props.content}/>
    }
    return (
      <div className="u-vh-1 c-jumbotron">
        {Jumbo}
      </div>
    );
  }
}

Jumbotron.defaultProps = {
  type: 'creative'
};
export default Jumbotron;