import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount, render } from 'enzyme';
import App from '../app';
import $ from 'jquery';
let app;
beforeEach(() => {
  app = new App();
});

describe('Rendering', () => {
  it('App renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
});
describe('Methods', () => {
  it('Provides access to methods via actions()', () => {
    let methods = app.actions();
    expect(methods).toBeDefined();
  });
});

describe('Local Storage', () => {
  it('Stores in localstorage', () => {
    function randomNumber(nm = 100) {
      return Math.floor(Math.random() * nm)
    }
    let key = `Test: ${randomNumber()}`
    let value = `Random Key: ${randomNumber()}`
    app.setStorage(key, value);
  });
  it('Retrieves data from localstorage', () => {
    function randomNumber(nm = 100) {
      return Math.floor(Math.random() * nm)
    }
    let key = `Test: ${randomNumber()}`
    let value = `Random Key: ${randomNumber()}`
    app.setStorage(key, value);
    let storage = app.getStorage(key);
    expect(storage).toBe(value);
  });
});

describe('accessibility', () => {

});