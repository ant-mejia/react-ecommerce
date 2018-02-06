import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PropTypes from 'prop-types';

class TabPane extends Component {

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

TabPane.propTypes = {
  title: PropTypes.string.isRequired
};



class TabContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: this.props.defaultIndex || 0
    };
  }

  handleTabClick = (index) => {
    console.log(index);
  }

  render() {
    return (
      <Tabs className={this.props.className}>
        <TabList>
          {
            this.props.children.map((child) => {
              if (child.type === TabPane && child.props.title.length > 0) {
                return (
                  <Tab>{child.props.title}</Tab>
                )
              }
            })
          }
        </TabList>
        {
          this.props.children.map((child) => {
            if (child.type === TabPane) {
              return (
                <TabPanel>{child}</TabPanel>
              )
            } else {
              return (
                <div>Oh noo!!</div>
              )
            }
          })
        }
      </Tabs>
    )
  }
}

export { TabPane, TabContainer };