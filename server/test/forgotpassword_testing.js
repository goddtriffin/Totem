/* run : npm test */

var sum = require('../../webapp/ForgotPassword/forgot_password');
var expect = require('chai').expect;

describe('#forgotpassword()', function() {


  context('Empty Inputs', function() {

    it('Empty username', function() {
      expect(0).to.equal(0)
    })

    it('Empty email', function() {
      expect(0).to.equal(0)
    }) 

  })
  
  
  context('Exsiting user', function() {
   
   it('A user with that username does not exist', function() {
      expect(0).to.equal(0)
    })

  })

  context('Submit failed', function() {
   
   it('Wrong', function() {
      expect(0).to.equal(0)
    })


  })

    context('Email/username verification', function() {
   
   it('Username and email are not associated', function() {
      expect(0).to.equal(0)
    })

  })
  

})