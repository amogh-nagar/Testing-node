const feedController=require('../controllers/feed')
const expect=require('chai').expect
const sinon=require('sinon')
const mongoose=require('mongoose')
const User=require('../models/user')
const Post=require('../models/post')


describe('FEED CONTROLLER ',function(){

//will run before all code
    before(function(done){
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
            done()
        })
    })

    
    
    it('should add a created post to the posts array of the creator',function(done){
        
        const req={
            body:{
                title:"text",
                content:"A textpoist"
            },
            userid:"5c0f66b979af55031b34728a",
            file:{
                path:"abc"
            }
        }
        const res={
            status:function(){
             return this;
            },
            json:function(){

            }
        }
        feedController.createPost(req,res,()=>{}).then((saveduser)=>{
        expect(saveduser).to.have.property('posts')
        expect(saveduser.posts).to.have.length(1)
        done()
        })
    })
 

    //will run after all code
  after(function(done){
      User.deleteMany({}).then(()=>{
          return mongoose.disconnect()
      })
      .then(()=>{
          done()
      })
  })
})