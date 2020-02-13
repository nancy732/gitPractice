var express = require("express")
var router = express.Router()
var signin = require('./mongooseFile')

var multer = require('multer')
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/profile')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});
var upload = multer({storage: storage});
console.log("we are on router.js")

  
router.get('/adduser', function (req, res) {
  res.sendFile('/home/com123/Desktop/node demo/public/signup.html')
})

router.post('/user',upload.single('avatar'),function(req,res,next){
  console.log("data",req.body)
  console.log("file",req.file)

    signin.findOne({email: req.body.email},function(err,result){
      if(err)
      {
        res.send(err)
      }
      if(result){
        res.send("email already exist")
      }
      else{
        if(req.body.psw == req.body.repeat)
          {
            let data = req.body
            data.fileName=req.file.originalname;

            signin.create(data,function(err,result){
              if(err){
                  res.send(err)
              }
            res.sendFile('/home/com123/Desktop/node demo/public/login.html')
            })
          }
          else{
            res.send("enter valid details")
          }
        
      }
    })
          
})

router.post('/users',function(req,res){
  console.log("data",req.body)
  signin.find({email: req.body.email,psw: req.body.psw},'email',function(err,result){

    if(err){
      res.send(err)
    }
    else if(result.length === 1){
      console.log("result",result)
      res.sendFile('/home/com123/Desktop/node demo/public/game2.html')
      }
      else{
        res.send("user do not exist")
      }
    
  })
})

router.post('/game',function(req,res)
{
  if(err)
  {
    res.send(err)
  }
})


 
  module.exports = router;