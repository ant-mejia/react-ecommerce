import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
class Index extends Component {

  render() {
    const { className, ...props } = this.props;
    return (
      <div>
        <div className="c-page_jumbotron">
          <PageHeader/>
          <h2>Jumbotron with Image</h2>
          <img src="http://s3.amazonaws.com/contemporaryartgroup/wp-content/uploads/2012/06/02-Minimal-Myth-foto_photo-Lotte-Stekelenburg.jpg"/>
        </div>
        <div className="c-page">
          <h1>Welcome to React!! This is the index page!</h1>
          <div>
            <p>Phasellus feugiat dui velit. Integer interdum quis ligula at ultrices. Etiam ac odio a arcu elementum cursus ac id odio. Duis tempus lacus vel suscipit pellentesque. Integer eu metus nec sapien fringilla iaculis non non massa. Mauris mollis risus in felis congue, non ullamcorper lacus posuere. Morbi blandit rutrum ante nec accumsan. Curabitur mollis sit amet odio eget posuere. Duis id turpis vel lectus rutrum blandit. Nam efficitur, erat vitae hendrerit commodo, felis ante blandit turpis, a commodo lacus ipsum ac eros. Nunc ac erat et magna aliquet molestie. Vivamus ut lectus at orci tempor suscipit. Donec efficitur mi sed velit congue luctus. Praesent eu tempus sem, non vehicula libero. Pellentesque nulla massa, consequat eu tortor vitae, consequat egestas nibh.
            </p>
            <p>Phasellus feugiat dui velit. Integer interdum quis ligula at ultrices. Etiam ac odio a arcu elementum cursus ac id odio. Duis tempus lacus vel suscipit pellentesque. Integer eu metus nec sapien fringilla iaculis non non massa. Mauris mollis risus in felis congue, non ullamcorper lacus posuere. Morbi blandit rutrum ante nec accumsan. Curabitur mollis sit amet odio eget posuere. Duis id turpis vel lectus rutrum blandit. Nam efficitur, erat vitae hendrerit commodo, felis ante blandit turpis, a commodo lacus ipsum ac eros. Nunc ac erat et magna aliquet molestie. Vivamus ut lectus at orci tempor suscipit. Donec efficitur mi sed velit congue luctus. Praesent eu tempus sem, non vehicula libero. Pellentesque nulla massa, consequat eu tortor vitae, consequat egestas nibh.
            </p>
            <p>Phasellus feugiat dui velit. Integer interdum quis ligula at ultrices. Etiam ac odio a arcu elementum cursus ac id odio. Duis tempus lacus vel suscipit pellentesque. Integer eu metus nec sapien fringilla iaculis non non massa. Mauris mollis risus in felis congue, non ullamcorper lacus posuere. Morbi blandit rutrum ante nec accumsan. Curabitur mollis sit amet odio eget posuere. Duis id turpis vel lectus rutrum blandit. Nam efficitur, erat vitae hendrerit commodo, felis ante blandit turpis, a commodo lacus ipsum ac eros. Nunc ac erat et magna aliquet molestie. Vivamus ut lectus at orci tempor suscipit. Donec efficitur mi sed velit congue luctus. Praesent eu tempus sem, non vehicula libero. Pellentesque nulla massa, consequat eu tortor vitae, consequat egestas nibh.
            </p>
            <p>Phasellus feugiat dui velit. Integer interdum quis ligula at ultrices. Etiam ac odio a arcu elementum cursus ac id odio. Duis tempus lacus vel suscipit pellentesque. Integer eu metus nec sapien fringilla iaculis non non massa. Mauris mollis risus in felis congue, non ullamcorper lacus posuere. Morbi blandit rutrum ante nec accumsan. Curabitur mollis sit amet odio eget posuere. Duis id turpis vel lectus rutrum blandit. Nam efficitur, erat vitae hendrerit commodo, felis ante blandit turpis, a commodo lacus ipsum ac eros. Nunc ac erat et magna aliquet molestie. Vivamus ut lectus at orci tempor suscipit. Donec efficitur mi sed velit congue luctus. Praesent eu tempus sem, non vehicula libero. Pellentesque nulla massa, consequat eu tortor vitae, consequat egestas nibh.
            </p>
            <p>Phasellus feugiat dui velit. Integer interdum quis ligula at ultrices. Etiam ac odio a arcu elementum cursus ac id odio. Duis tempus lacus vel suscipit pellentesque. Integer eu metus nec sapien fringilla iaculis non non massa. Mauris mollis risus in felis congue, non ullamcorper lacus posuere. Morbi blandit rutrum ante nec accumsan. Curabitur mollis sit amet odio eget posuere. Duis id turpis vel lectus rutrum blandit. Nam efficitur, erat vitae hendrerit commodo, felis ante blandit turpis, a commodo lacus ipsum ac eros. Nunc ac erat et magna aliquet molestie. Vivamus ut lectus at orci tempor suscipit. Donec efficitur mi sed velit congue luctus. Praesent eu tempus sem, non vehicula libero. Pellentesque nulla massa, consequat eu tortor vitae, consequat egestas nibh.
            </p>
            <p>Phasellus feugiat dui velit. Integer interdum quis ligula at ultrices. Etiam ac odio a arcu elementum cursus ac id odio. Duis tempus lacus vel suscipit pellentesque. Integer eu metus nec sapien fringilla iaculis non non massa. Mauris mollis risus in felis congue, non ullamcorper lacus posuere. Morbi blandit rutrum ante nec accumsan. Curabitur mollis sit amet odio eget posuere. Duis id turpis vel lectus rutrum blandit. Nam efficitur, erat vitae hendrerit commodo, felis ante blandit turpis, a commodo lacus ipsum ac eros. Nunc ac erat et magna aliquet molestie. Vivamus ut lectus at orci tempor suscipit. Donec efficitur mi sed velit congue luctus. Praesent eu tempus sem, non vehicula libero. Pellentesque nulla massa, consequat eu tortor vitae, consequat egestas nibh.
            </p>
            <p>Phasellus feugiat dui velit. Integer interdum quis ligula at ultrices. Etiam ac odio a arcu elementum cursus ac id odio. Duis tempus lacus vel suscipit pellentesque. Integer eu metus nec sapien fringilla iaculis non non massa. Mauris mollis risus in felis congue, non ullamcorper lacus posuere. Morbi blandit rutrum ante nec accumsan. Curabitur mollis sit amet odio eget posuere. Duis id turpis vel lectus rutrum blandit. Nam efficitur, erat vitae hendrerit commodo, felis ante blandit turpis, a commodo lacus ipsum ac eros. Nunc ac erat et magna aliquet molestie. Vivamus ut lectus at orci tempor suscipit. Donec efficitur mi sed velit congue luctus. Praesent eu tempus sem, non vehicula libero. Pellentesque nulla massa, consequat eu tortor vitae, consequat egestas nibh.
            </p>
            <p>Phasellus feugiat dui velit. Integer interdum quis ligula at ultrices. Etiam ac odio a arcu elementum cursus ac id odio. Duis tempus lacus vel suscipit pellentesque. Integer eu metus nec sapien fringilla iaculis non non massa. Mauris mollis risus in felis congue, non ullamcorper lacus posuere. Morbi blandit rutrum ante nec accumsan. Curabitur mollis sit amet odio eget posuere. Duis id turpis vel lectus rutrum blandit. Nam efficitur, erat vitae hendrerit commodo, felis ante blandit turpis, a commodo lacus ipsum ac eros. Nunc ac erat et magna aliquet molestie. Vivamus ut lectus at orci tempor suscipit. Donec efficitur mi sed velit congue luctus. Praesent eu tempus sem, non vehicula libero. Pellentesque nulla massa, consequat eu tortor vitae, consequat egestas nibh.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
