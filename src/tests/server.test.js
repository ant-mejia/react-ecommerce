import React from 'react';
import ReactDOM from 'react-dom';
import App from '../app';
import $ from 'jquery';

let app;

beforeEach(() => {
  app = new App();
});

describe('User Authentication', () => {
  it('User is not authenticated at startup', () => {
    expect(app.isUserAuth()).toBeFalsy();
  });
  it('User can log in', () => {
    app.loginUser();
  });
});

describe('accessibility', () => {
  it('All images have an alt tag', () => {
    let images = document.querySelectorAll('img');
  });
});