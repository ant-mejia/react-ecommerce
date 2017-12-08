import React from 'react';
import { Link } from 'react-router-dom';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import Header from '../../components/Header';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../../app'
configure({ adapter: new Adapter() });


describe('Header Component - Lifecycle', () => {
  const renderedComponent = (props = {}) => shallow(<Header {...props} />);
  const app = new App();
  const props = {
    actions: app.actions()
  };
  it('Renders correctly without errors', () => {
    expect(toJson(renderedComponent(props))).toMatchSnapshot();
  });
});

describe('Header Component - Events', () => {
  const renderedComponent = (props = {}) => shallow(<Header {...props} />);
  const app = new App();
  const props = {
    actions: app.actions()
  };
  it('simulates click events', () => {
    const onButtonClick = jest.fn();
    const wrapper = shallow(<Header onClick={onButtonClick} />);
    wrapper.find('button').simulate('click');
    expect(onButtonClick.calledOnce).to.equal(true);
  });
});