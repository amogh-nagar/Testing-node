const authController=require('../controllers/auth')
const expect=require('chai').expect
const sinon=require('sinon')
const mongoose=require('mongoose')
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
            expect(result).to.have.property('statusCode',500)
            done()
        })
        User.findOne.restore()
    })
 

    it('should send a response with valid user status for an exisiting user',function(done){
        //want to connect to database
        mongoose
        .connect(
          'mongodb+srv://amogh:123amogh@cluster0.afnyt.mongodb.net/test-messages?retryWrites=true&w=majority'
        )
        .then(result => {
            const user=new User({
                email:"test@t.com",
                password:"tester",
                name:"Yest",
                posts:[],
                _id:"5c0f66b979af55031b34728a"
            })
          return  user.save()
        }).then(()=>{
            const req={
                userId:"5c0f66b979af55031b34728a"
            }
            const res={
                statusCode:500,
                userStatus:null,
                status:function(code){
                    this.statusCode=code;
                    return this;
                },
                json:function(data){
                    this.userStatus=data.status
                }
            }
        authController.getUserStatus(req,res,()=>{}).then(()=>{
            expect(res.statuCode).to.be.equal(200)
            expect(res.status).to.be.equal('I am new!')
            //Clean every document on the collection
            User.deleteMany({}).then(()=>{

                return mongoose.disconnect()
            }).then(()=>{
                done()
            })
        })    
        })
        .catch(err => console.log(err));
      
    })


})