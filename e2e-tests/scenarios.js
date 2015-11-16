'use strict';

describe('my app', function() {

  it('should automatically redirect to /users when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/users");
  });

  describe('users', function() {

    beforeEach(function() {
      browser.get('index.html#/users');
    });


    it('should render users when user navigates to /users', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/Users/);
    });

  });

  describe('questions', function() {

    beforeEach(function() {
      browser.get('index.html#/questions');
    });


    it('should render questions when user navigates to /questions', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/Questions/);
    });

  });
});
