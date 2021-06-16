const authController=require('../controllers/auth')
const expect=require('chai').expect
const sinon=require('sinon')

const User=require('../models/user')


describe('AUTH CONTROLLER -LOGIN',function(){

    it('should throw an errors if accessing the database fails',function(done){
        sinon.stub(User,'findOne')
        User.findOne.throws()
        const req={
            body:{
                email:"text@t.com",
                password:"123"
            }
        }
        authController.login(req,{},()=>{}).then(result=>{
            console.log(result)
            expect(result).to.be.an('error')
            expect(result).to.have.property('statusCode',200)
            done()
        })
        User.findOne.restore()
    })
 
})