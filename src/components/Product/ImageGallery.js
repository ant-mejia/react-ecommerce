import React, { Component } from 'react';

class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.defaultIndex || 0
    };
  }

  handleSlideClick = (a) => {
    if (this.props.children.indexOf(a) !== this.state.index) {
      this.setState({ index: this.props.children.indexOf(a) });
    }
  }

  render() {
    return (
      <div className={`c-image-gallery u-flex ${this.props.className}`}>
        <div className="c-image-gallery_main-image">
          <div className="">
            <span className="icon li-focus"></span>
          </div>
          {this.props.children[this.state.index]}
        </div>
        <div className="c-image-gallery_slideshow u-bgcolor-offwhite">
          {this.props.children.map((item) => {
            let active = this.props.children.indexOf(item) === this.state.index
            return (
              <div key={item.props.imgkey} className={active ? "c-image-gallery_slideshow-slide-active" : "c-image-gallery_slideshow-slide"} onClick={() =>this.handleSlideClick(item)}>
                {item}
              </div>
            )
          })}
        </div>
      </div>
    );
  }

}

export default ImageGallery;