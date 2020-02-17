var signin = require('./mongooseFile');
module.exports = {
  user: function(data,file,res){
      console.log("entered userFind")
    return new Promise((resolve,reject)=>{

        signin.findOne({email: data.email},function(err,result){

            if(err)
            {
                console.log("error 1st")
              reject(err)
            }
            if(result){
                console.log("email exist")
              res.send("email already exist")
            }
            else{
               console.log("else part")
              if(data.psw == data.repeat)
                {
                    resolve(result)
                }
                else{
                    res.send("enter valid details")
                }
            }
    })
    }).then(function(){
        data.fileName=file.originalname;
        signin.create(data,function(err,result){
          if(err){
             return err
          }
          else{
             return result
          }
    })
    })
},


users: function(data,res) {
    return new Promise((resolve, reject) => 
{
    signin.find({email: data.email,psw: data.psw},'email',function(err,result){

        if(err){
          reject(err)
        }
        else if(result.length === 1)
        {
          resolve(result)          
        }
        else{
          res.send("user do not exist")
        }
      })
    })
}
};
