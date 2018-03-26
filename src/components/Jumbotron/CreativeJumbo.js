import React, { Component } from 'react';
import Flickity from 'react-flickity-component';

class CreativeJumbo extends Component {
  constructor(props) {
    super(props);
    this.state = { currentIndex: 0 };
  }
  myCustomNext = () => {
    // You can use Flickity API
    this.flkty.next()
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error, info);
  }

  // handleChange = (index) => this.setState({ currentIndex: index });

  render() {
    const flickityOptions = {
      wrapAround: true,
      draggable: true,
      pageDots: false,
      prevNextButtons: false,
      lazyLoad: true,
      reloadOnUpdate: true,
      // on: { settle: (a) => this.handleChange(a) }
    }
    return (
      <div>
        <Flickity flickityRef={c => this.flkty = c} className={'carousel'} elementType={'div'} options={flickityOptions} disableImagesLoaded={false}>
          <div className="carousel-cell">
          </div>
          <div className="carousel-cell">
          </div>
          <div className="carousel-cell">
          </div>
          <div className="carousel-cell">
          </div>
          <div className="carousel-cell">
          </div>
        </Flickity>
        <h3>{this.state.currentIndex + 1}</h3>
        <button onClick={this.myCustomNext}>My custom next button</button>
      </div>
    )
  };
}

export default CreativeJumbo;