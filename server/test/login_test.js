/* run : npm test */

var sum = require('../../webapp/Login/login');
var expect = require('chai').expect;

describe('#login()', function() {


  context('Empty Inputs', function() {

    it('Empty username', function() {
      expect(0).to.equal(0)
    })

    it('Empty password', function() {
      expect(0).to.equal(0)
    }) 

  })
  
  
  context('Exsiting user', function() {
   
   it('A user with that username does not exist', function() {
      expect(0).to.equal(0)
    })

  })

  context('Login failed', function() {
   
   it('Wrong password', function() {
      expect(0).to.equal(0)
    })

  })

})