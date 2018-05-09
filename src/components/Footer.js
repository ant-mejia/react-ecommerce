import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

class Footer extends PureComponent {

  render() {
    return (
      <div className="c-footer u-font-lato">
        <div className="c-footer_wrapper">
          <h3 className="c-footer_wrapper-title">React Ecommerce</h3>
          <p className="c-footer_wrapper-message">This is an elegant React App created by Anthony Mejia. This app uses React and React Router to dynamically render routes. Its backend is built on Node.js and Express.js which serves this build.</p>
          <p className="c-footer_wrapper-message">It also uses socket.io to manage a persistent connection to the server and allows for awesome real-time data being passed back and forth from server to client.</p>
        </div>
        <div className="c-footer_wrapper">
          <h3 className="c-footer_wrapper-title">Navigation Links</h3>
          <div className="c-footer_wrapper-list">
            <div className="c-footer_wrapper-list-item">
              <Link to="/"><p>Terms and Conditions</p></Link>
            </div>
            <div className="c-footer_wrapper-list-item">
              <Link to="/"><p>Privacy Policy</p></Link>
            </div>
            <div className="c-footer_wrapper-list-item">
              <Link to="/"><p>Contact Us</p></Link>
            </div>
            <div className="c-footer_wrapper-list-item">
              <Link to="/"><p>Our Blog</p></Link>
            </div>
          </div>
        </div>
        <div className="c-footer_container">
          <h4 className="c-footer_copy">2018 &copy; Recommerca - Anthony Mejia</h4>
        </div>
      </div>
    );
  }

}

export default Footer;