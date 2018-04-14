import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';


class CreativeJumbo extends Component {
  constructor(props) {
    super(props);
    this.state = { index: 0, duration: 2000, transition: true };
  }

  componentDidMount() {
    this.setState({ transition: true })
  }

  prevSlide = () => {
    if (this.state.waiting) {
      return;
    }
    let index = this.state.index - 1
    if (index < 0) {
      index = this.props.content.length - 1;
    }
    this.setState({ waiting: true })
    this.setState({ queue: index })
    this.setState({ transition: !this.state.transition });
  }

  nextSlide = () => {
    if (this.state.waiting) {
      return;
    }
    let index = this.state.index + 1;
    if (index === this.props.content.length) {
      index = 0
    }
    this.setState({ waiting: true })
    this.setState({ queue: index })
    this.setState({ transition: !this.state.transition });
  }

  toggleTransition = () => {
    this.setState({ index: this.state.queue })
    this.setState({ transition: !this.state.transition })
  }

  clearWait = () => {
    this.setState({ waiting: undefined })
  }

  render() {
    const c = this.props.content[this.state.index]
    const count = this.state.index + 1;
    const totalCount = this.props.content.length;
    return (
      <CSSTransition in={this.state.transition} onEntered={this.clearWait} onExited={this.toggleTransition} mountOnEnter={true} classNames="c-jumbotron_creative" timeout={this.state.duration}>
        <div className={`c-jumbotron_creative`}>
          <div className="c-jumbotron_creative_side">
            <div className="c-jumbotron_creative_side_wrapper">
              <div>
                <p className="u-font-lato3">{this.state.index < 9 ? `0${count}` : count }.{totalCount < 9 ? `0${totalCount}` : totalCount }</p>
              </div>
              <p className="u-font-lato3 c-jumbotron_creative_heading">{c.subheading}</p>
            </div>
          </div>
          <div className="c-jumbotron_creative_background">
            <img src={c.background.src} alt={c.background.alt}/>
          </div>
          <div className="c-jumbotron_creative_wrapper u-font-dosis">
            <div>
              <h3 className="c-jumbotron_creative_heading">{c.heading}</h3>
              <h1 className="c-jumbotron_creative_title">{c.title}</h1>
            </div>
            <div className="secondary">
              <p className="c-jumbotron_creative_summary">{c.summary}</p>
              <div className="c-jumbotron_creative_button">
                <Link to={c.link.href} >{c.link.text}</Link>
              </div>
            </div>
          </div>
          <div className="c-jumbotron_creative_controls">
            <button className="c-jumbotron_creative_controls_prev" onClick={this.prevSlide}>
              <span className="li-down-open-big"/>
            </button>
            <button className="c-jumbotron_creative_controls_next u-flip-v" onClick={this.nextSlide}>
              <span className="li-down-open-big"/>
            </button>
          </div>
        </div>
      </CSSTransition>
    );
  }
}

CreativeJumbo.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CreativeJumbo;