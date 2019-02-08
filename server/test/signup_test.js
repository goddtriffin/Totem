/* run : npm test */

var sum = require('../../webapp/Signup/signup');
var expect = require('chai').expect;

describe('#signup()', function() {


  context('empty inputs', function() {

    it('empty username', function() {
      expect(0).to.equal(0)
    })

	it('empty display name', function() {
      expect(0).to.equal(0)
    })

	it('empty email', function() {
      expect(0).to.equal(0)
    })

    it('empty password', function() {
      expect(0).to.equal(0)
    })

    it('empty password verification', function() {
      expect(0).to.equal(0)
    })

  })
  
context('improper format', function() {

    it('improper username', function() {
      expect(0).to.equal(0)
    })

	it('improper display name', function() {
      expect(0).to.equal(0)
    })

	it('improper email', function() {
      expect(0).to.equal(0)
    })
    it('improper password', function() {
      expect(0).to.equal(0)
    })
    it('improper password verification', function() {
      expect(0).to.equal(0)
    })

  })
  
  context('exsiting user', function() {
   
   it('a user with that email exists', function() {
      expect(0).to.equal(0)
    })

	it('a user with that email exists', function() {
      expect(0).to.equal(0)
    })

  })

  context('password verification', function() {
   
   it('password does not match password verification', function() {
      expect(0).to.equal(0)
    })

  })
  


})