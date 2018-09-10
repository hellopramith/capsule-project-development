const { createStore } = require('redux');
const CapsuleApp = require('.');
const should = require('chai').should();
 
describe('CapsuleApp unit testing', function() {
 
  it('should GET_USERNAME', function() {

    const currState = {
        username: ''
    };

    const store = createStore(CapsuleApp, currState);

    const action = {
      type: 'GET_USERNAME',
      username : 'pramith'
    };

    store.dispatch(action);
 
    store.getState().should.have.property('username');
    store.getState().should.have.property('username').and.equal('pramith');
  });

  it('should SET_USERNAME', function() {

    const currState = {
        username: ''
    };

    const store = createStore(CapsuleApp, currState);

    const action = {
      type: 'SET_USERNAME',
      username : 'pramith'
    };

    store.dispatch(action);

    store.getState().should.have.property('username');
    store.getState().should.have.property('username').and.equal('pramith');
  });
});
 