/* run : npm test */

const login_js = require('../../webapp/Settings/settings');
const expect = require('chai').expect;

describe('#Settings', function() {

  describe('#changeDisplayName()', function() {

    context('Empty Inputs', function() {

      it('Empty changedisplayname', function() {
        expect(changeDisplayName("", "repeatdisplayname")).to.equal(0)
      })

      it('Empty repeatdisplayname', function() {
        expect(changeDisplayName("changedisplayname", "")).to.equal(0)
      }) 
    })

    context('Invalid Inputs', function() {

      it('Invalid changedisplayname', function() {
        expect(changeDisplayName("d", "repeatdisplayname")).to.equal(0)
      })

      it('Invalid repeatdisplayname', function() {
        expect(changeDisplayName("username", "d")).to.equal(0)
      }) 
    })

    context('Proper Inputs', function() {

      it('Proper changedisplayname and repeatdisplayname', function() {
        expect(changePassword("displayname", "displayname")).to.equal(1)
      })
    })

   //  context('Display name change failed', function() {
      
   //   it('backend error', function() {
   //    expect(0).to.equal(0)
   //  })

   // })

  })

  describe('#changePassword()', function() {

    context('Empty Inputs', function() {

      it('Empty changepassword', function() {
        expect(changePassword("", "repeatpassword")).to.equal(0)
      })

      it('Empty repeatpassword', function() {
        expect(changePassword("changepassword", "")).to.equal(0)
      }) 
    })
    context('Invalid Inputs', function() {

      it('Invalid changepassword', function() {
        expect(changePassword("d", "repeatpassword")).to.equal(0)
      })

      it('Invalid repeatpassword', function() {
        expect(changePassword("changepassword", "d")).to.equal(0)
      }) 
    })

    context('Proper Inputs', function() {

      it('Proper changepassword and repeatpassword', function() {
        expect(changePassword("password", "password")).to.equal(1)
      })
    })

   //  context('Password change failed', function() {

   //   it('Backend error', function() {
   //    expect(0).to.equal(0)
   //  })
   // })

  })

})
