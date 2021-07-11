const fs=require('fs');
module.exports=(req,res,next)=>{
    fs.appendFileSync('usersLogs.txt',"Se ingreso en la pagina"+req.url);
    next()
}