const session = require('node-sessionstorage');
module.exports= function(req, res, next) {
    let check = session.getItem('admin_login');
    if(check){
        next();
    }else{
        res.redirect('/login');
    }
}