import React from 'react';
import ReactDOM from 'react-dom';
import App from '../app';
import $ from 'jquery';
let app;
beforeEach(() => {
  app = new App();
});

describe('Rendering', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
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
    let storage = app.getStorage(key);
    expect(storage).toBe(value);
  });
});

describe('accessibility', () => {
  it('All images have an alt tag', () => {
    let images = document.querySelectorAll('img');
  });
});