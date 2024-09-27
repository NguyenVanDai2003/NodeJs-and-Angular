const db = require('../connect');

module.exports = function(server){
    // server.get('/get-data', function (req, res) {
    //     console.log(req.query.full_name);
    // })
    server.get('/account', function (req, res) {
        db.query('SELECT * FROM account', function (err,data){
            // console.log({err},{data});
            res.render('account',{
                cast: data
            })
        })
    })
    server.get('/delete-account:id', function (req, res) {
        let id = req.params.id;
        let Sql = "Delete from account where id = ?" ;
        db.query(Sql,[id], function (err,data) {
            res.redirect('/account');
        })
    })
    server.get('/create-account', function (req, res) {
        res.render('create-account')
    })
    server.post('/create-account', function (req, res) {
        let fromData = req.body;
        let Sql = "INSERT INTO account set ?";
        db.query(Sql,[fromData], function (err,data){
            res.redirect('/account');
    
        })
    })
    server.get('/edit-account:id', function (req, res) {
        let id = req.params.id;
        let Sql = "Select * from account where id = ?";
        db.query(Sql,[id], function (err,data){
            // console.log(data);
            res.render('edit-account', {
                cat: data[0]
            })
        })
      
    })
    server.post('/edit-account:id', function (req, res) {
        let id = req.params.id;
        let fromData = req.body;
        let Sql = "Update account set ? where id = ?";
        db.query(Sql,[fromData, id], function (err,data){
            res.redirect('/account');
    
        })
    })
}