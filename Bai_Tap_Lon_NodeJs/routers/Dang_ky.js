const db = require('../connect');

module.exports = function(server){
    server.get('/Dang_ky', function(req, res){
        res.render('Dang_ky');
    });
    server.post('/Dang_ky', function (req, res) {
        let fromData = req.body;
        let Sql = "INSERT INTO account set ?";
        db.query(Sql,[fromData], function (err,data){
            res.redirect('/login');
            console.log(fromData);
        })
    })
}