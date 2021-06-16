const authMiddleware=require('../middleware/is-auth')
const expect=require('chai').expect

it('should throw an error if no authorization heade is present',function(){
    const req={
        get:function(headername){
          return null
        }
    }
    expect(authMiddleware.bind(this,req,{},()=>{})).to.throw('Not authenticated.');//we are not calling it by ourself instead we are passing the function reference
//i want to let the testing frameworks to calll this function for me so that they can hendle the thrown error
})