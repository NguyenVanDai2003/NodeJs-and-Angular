const db = require('../connect');
const session = require('node-sessionstorage');

module.exports = function(server){
    server.get('/', function(req, res){
        res.render('home');
    });

    server.get('/login', function(req, res){
        res.render('login', {
            message: null
        });
    });


    server.post('/login', function(req, res){
        let SQL = "SELECT * FROM account WHERE email = ? AND password = ?"
        let email = req.body.email;
        let password = req.body.password;
        db.query(SQL,[email, password], function(err,data){
            if(!err && data.length > 0){
                session.setItem('admin_login', data[0].name);
                res.redirect('/')
            }else{
                res.render('login', {
                    message: 'Tài khoản không tồn tại'
                })
            }
        })
    });
    
}