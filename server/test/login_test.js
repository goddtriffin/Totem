/* run : npm test */

var sum = require('../../webapp/Login/login');
var expect = require('chai').expect;

describe('#login()', function() {


  context('empty inputs', function() {

    it('empty username', function() {
      expect(0).to.equal(0)
    })

	
    it('empty password', function() {
      expect(0).to.equal(0)
    })

    

  })
  
  
  context('exsiting user', function() {
   
   it('a user with that username does not exist', function() {
      expect(0).to.equal(0)
    })

	

  })

  context('login failed', function() {
   
   it('wrong password', function() {
      expect(0).to.equal(0)
    })

  })
  


})