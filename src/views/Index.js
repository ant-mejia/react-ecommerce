import React, { Component } from 'react';
import View from '../containers/View'
import { Link } from 'react-router-dom';
import Jumbotron from '../components/Jumbotron/Jumbotron';

class Index extends Component {

  content = [{
    background: { src: 'https://www.screenaustralia.gov.au/sacms/media/samedialibrary/screenguide/titles/tid33797-mountain/tid33797-web/tid33797-mountain-001-hero.jpg', alt: 'Blah Blah Blah' },
    subheading: 'Tiny ass heading',
    heading: 'Alan Watts',
    title: 'I owe my solitude to other people.',
    summary: 'Some believe all that parents, tutors, and kindred believe. They take their principles by inheritance, and defend them as they would their estates, because they are born heirs to them.',
    link: { text: 'Shop Product', href: '/products/test-product' }
  }, {
    background: { src: 'https://revolutioncdn-themepunchgbr.netdna-ssl.com/wp-content/uploads/revslider/overexposure/exp_bg2.jpg', alt: 'Blah Blah Blah' },
    subheading: 'Tiny ass heading',
    heading: 'Anthony Mejia',
    title: 'I owe my solitude to my Past.',
    summary: 'Some believe all that parents, tutors, and kindred believe. They take their principles by inheritance, and defend them as they would their estates, because they are born heirs to them.',
    link: { text: 'Shop Beta', href: '/products/test-product' }
  }, {
    background: { src: 'https://revolutioncdn-themepunchgbr.netdna-ssl.com/wp-content/uploads/revslider/overexposure/exp_bg5.jpg', alt: 'Blah Blah Blah' },
    subheading: 'Tiny ass heading',
    heading: 'Alan Miller',
    title: 'I owe my solitude to other people.',
    summary: 'Some believe all that parents, tutors, and kindred believe. They take their principles by inheritance, and defend them as they would their estates, because they are born heirs to them.',
    link: { text: 'Shop Product', href: '/products/test-product' }
  }, {
    background: { src: 'https://revolutioncdn-themepunchgbr.netdna-ssl.com/wp-content/uploads/revslider/overexposure/exp_bg5.jpg', alt: 'Blah Blah Blah' },
    subheading: 'Tiny ass heading',
    heading: 'Miller Mejia',
    title: 'I owe my solitude to my future.',
    summary: 'Some believe all that parents, tutors, and kindred believe. They take their principles by inheritance, and defend them as they would their estates, because they are born heirs to them.',
    link: { text: 'Shop Beta', href: '/products/test-product' }
  }]

  render() {
    return (
      <div>
        {/* <PageHeader/> */}
        <div className="c-page_jumbotron">
          <Jumbotron type="creative" content={this.content}/>
        </div>
        <View>
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
        </View>
      </div>
    );
  }
}

export default Index;