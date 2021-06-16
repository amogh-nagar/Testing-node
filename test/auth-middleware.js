const authMiddleware=require('../middleware/is-auth')
const expect=require('chai').expect
const jwt=require('jsonwebtoken')
const sinon=require('sinon')

describe('Auth middleware',function(){

    it('should throw an error if no authorization heade is present',function(){
        const req={
            get:function(headername){
              return null
            }
        }
        expect(authMiddleware.bind(this,req,{},()=>{})).to.throw('Not authenticated.');//we are not calling it by ourself instead we are passing the function reference
    //i want to let the testing frameworks to calll this function for me so that they can hendle the thrown error
    })

    
it('should throw an error if the authorization header is only one string',function(){
    const req={
        get:function(headername){
          return 'xyz'
        }
    }
    expect(authMiddleware.bind(this,req,{},()=>{})).to.throw()
})


it('should yeild a userId after decoding the token',function(){
    const req={
        get:function(headername){
          return 'Bearer erirghsrtgkj'
        }
    }
   //Globally replaced
    // jwt.verify=function(){
    //     return {userId:'amogh'}
    // }

    sinon.stub(jwt,'verify');//created a copy of jwt.verify
    jwt.verify.returns({userId:'abc'})
    authMiddleware(req,{},()=>{})
    expect(req).to.have.property('userId')
    expect(req).to.have.property('userId','abc')

    jwt.verify.restore()//restored the original function
})


it('should throw an error if token cannot be verified',function(){
    const req={
        get:function(headername){
          return 'Bearer xyz'
        }
    }
    expect(authMiddleware.bind(this,req,{},()=>{})).to.throw()
})



})


