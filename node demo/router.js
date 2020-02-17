var express = require("express")
var router = express.Router()
const passport = require("passport")
var passportSetup = require('./config/passport-setup')

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
var userapi = require('./api');
  
router.get('/adduser', function (req, res) {
  res.sendFile('/home/com123/Desktop/node demo/public/signup.html')
})

router.post('/user',upload.single('avatar'),async function(req,res,next){
 data = req.body
  try
  {
    let resFromAPI = await userapi.user(data,req.file,res);

    res.sendFile('/home/com123/Desktop/node demo/public/login.html')          
  }
  catch(err)
  {
    res.send(err)
  }
          
})

router.post('/users', async function(req,res){
  console.log("data",req.body)
  try{
    let resultFromAPI = await userapi.users(req.body,res)
    res.sendFile(__dirname + '/public/game2.html')
  }
  catch(err){
    res.send(err)
  }
  
})

router.get('/google', passport.authenticate('google',{
  scope:['profile']
}));

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>
{
  //res.sendFile('/home/com123/Desktop/node demo/public/game2.html')
  //res.sendFile(__dirname + '/public/game2.html')
  res.redirect('/game?origin=${req.originalUrl}');
  
});


router.get('/game',function(req,res)
{
  res.sendFile('/home/com123/Desktop/node demo/public/game2.html')
}
)


 
  module.exports = router;