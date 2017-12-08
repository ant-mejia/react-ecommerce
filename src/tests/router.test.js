import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import sinon from 'sinon';
import { Route } from 'react-router';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount, render } from 'enzyme';
import $ from 'jquery';
import App from '../app';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NotFound from '../views/NotFound';
import Header from '../components/Header';
import Index from '../views/Index';
import About from '../views/About';
import Login from '../views/auth/Login';
import Register from '../views/auth/Register';
import Account from '../views/auth/Account';
import Routes from '../routes';

configure({ adapter: new Adapter() });

let app;
beforeEach(() => {
  app = new App();
});

describe('Index Page', () => {
  it('Index Page renders when visiting root page', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/' ]}>
        <Routes actions={app.actions()} history={app.history}/>
      </MemoryRouter>
    );
    expect(wrapper.find(Index)).toHaveLength(1);
  });
});

describe('Routing', () => {
  app = new App();
  let wrapper = shallow(<Routes actions={app.actions()} history={app.history} />);
  const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
    const routeProps = route.props();
    pathMap[routeProps.path] = routeProps.component;
    return pathMap;
  }, {});
  describe('Renders routes correctly', () => {
    it('Renders Index page', () => {
      let targetPath = '/'
      let mountWrapper = mount(
        <MemoryRouter initialEntries={[ targetPath ]}>
          <Routes actions={app.actions()} history={app.history}/>
        </MemoryRouter>
      );
      expect(mountWrapper.find(Index)).toHaveLength(1);
    });
    it('Renders About page', () => {
      let targetPath = '/about'
      let mountWrapper = mount(
        <MemoryRouter initialEntries={[ targetPath ]}>
          <Routes actions={app.actions()} history={app.history}/>
        </MemoryRouter>
      );
      expect(mountWrapper.find(About)).toHaveLength(1);
    });
    it('Renders App page', () => {
      let targetPath = '/app'
      let mountWrapper = mount(
        <MemoryRouter initialEntries={[ targetPath ]}>
          <Routes actions={app.actions()} history={app.history}/>
        </MemoryRouter>
      );
      expect(mountWrapper.find(Index)).toHaveLength(1);
    });
    it('Renders Login page', () => {
      let targetPath = '/login';
      let mountWrapper = mount(
        <MemoryRouter initialEntries={[ targetPath ]}>
          <Routes actions={app.actions()} history={app.history}/>
        </MemoryRouter>
      );
      expect(mountWrapper.find(Login)).toHaveLength(1);
    });
    it('Renders Register page', () => {
      let targetPath = '/register';
      let mountWrapper = mount(
        <MemoryRouter initialEntries={[ targetPath ]}>
          <Routes actions={app.actions()} history={app.history}/>
        </MemoryRouter>
      );
      expect(mountWrapper.find(Register)).toHaveLength(1);
    });
    it('Redirects to 404 on invalid path', () => {
      let targetPath = '/testw019aasd';
      let mountWrapper = mount(
        <MemoryRouter initialEntries={[ targetPath ]}>
          <Routes actions={app.actions()} history={app.history}/>
        </MemoryRouter>
      );
      expect(mountWrapper.find(NotFound)).toHaveLength(1);
    });
  });
});


describe('Authentication', () => {

  it('Redirects to Login Page when trying to visit a protected route', () => {
    let protectedRoute = '/account';
    const wrapper = render(
      <MemoryRouter initialEntries={[ protectedRoute ]}>
        <Routes actions={app.actions()} store={app.store} history={app.history}/>
      </MemoryRouter>
    );
    expect(wrapper.find(Account)).toHaveLength(0);
    expect(wrapper.find(NotFound)).toHaveLength(0);
  });

  it('Allows access to protected route when authenticated', done => {
    let protectedRoute = '/account';
    let callback = (response) => {
      app.state.store = { user: response.data }
      expect(response.type).toEqual('success');
      const wrapper = mount(
        <MemoryRouter initialEntries={[ protectedRoute ]}>
          <Routes actions={app.actions()} store={app.store} history={app.history}/>
        </MemoryRouter>
      );
      expect(wrapper.find(Account)).toHaveLength(1);
      done();
    }
    app.loginUser('', '', callback)
    // expect(wrapper.find(Account)).toHaveLength(1);
  });
});