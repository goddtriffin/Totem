/* run : npm test */

var sum = require('../../webapp/Signup/signup');
var expect = require('chai').expect;
/*
describe('#signup()', function() {

  context('Empty Inputs', function() {
    it('Empty username', function() {
      expect(signup("", "displayName", "email@email.com", "password", "password")).to.equal(0)
    })
    it('Empty display name', function() {
      expect(signup("username", "", "email@email.com", "password", "password")).to.equal(0)
    })
    it('Empty email', function() {
      expect(signup("username", "displayName", "", "password", "password")).to.equal(0)
    })
    it('Empty password', function() {
      expect(signup("username", "displayName", "email@email.com", "password", "")).to.equal(0)
    })
    it('Empty password verification', function() {
      expect(signup("username", "displayName", "email@email.com", "", "password")).to.equal(0)
    })
  })
  
  context('Improper Format', function() {
    it('Improper username', function() {
      expect(signup("u", "displayName", "email@email.com", "password", "password")).to.equal(0)
    })
    it('Improper display name', function() {
      expect(signup("username", "ss", "email@email.com", "password", "password")).to.equal(0)
    })
    it('Improper email', function() {
      expect(signup("username", "displayName", "email", "password", "password")).to.equal(0)
    })
    it('Improper password', function() {
      expect(signup("username", "displayName", "email@email.com", "password", "as")).to.equal(0)
    })
    it('Improper password verification', function() {
      expect(signup("username", "displayName", "email@email.com", "sd", "password")).to.equal(0)
    })
  })

  context('Password verification', function() {
   it('Password does not match password verification', function() {
    expect(signup("username", "displayName", "email@email.com", "passwordVerify", "password")).to.equal(0)
   })
   it('Password does match password verification', function() {
    expect(signup("username", "displayName", "email@email.com", "password", "password")).to.equal(1)
   })
  })

 //  context('Exsiting user', function() {

 //   it('A user with that email exists', function() {
 //      expect(0).to.equal(0)
 //    })

	// it('A user with that email exists', function() {
 //      expect(0).to.equal(0)
 //    })

 //  })

})
*/