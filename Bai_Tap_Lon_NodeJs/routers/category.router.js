const db = require('../connect');

module.exports = function(server){
    // server.get('/get-data', function (req, res) {
    //     console.log(req.query.full_name);
    // })
    server.get('/category', function (req, res) {
        db.query('SELECT * FROM category', function (err,data){
            // console.log({err},{data});
            res.render('category',{
                cast: data
            })
        })
    })
    server.get('/delete-category:id', function (req, res) {
        let id = req.params.id;
        let Sql = "Delete from category where id = ?" ;
        db.query(Sql,[id], function (err,data) {
            res.redirect('/category');
        })
    })
    server.get('/create-category', function (req, res) {
        res.render('create-category')
    })
    server.post('/create-category', function (req, res) {
        let fromData = req.body;
        let Sql = "INSERT INTO category set ?";
        db.query(Sql,[fromData], function (err,data){
            res.redirect('/category');
    
        })
    })
    server.get('/edit-category:id', function (req, res) {
        let id = req.params.id;
        let Sql = "Select * from category where id = ?";
        db.query(Sql,[id], function (err,data){
            // console.log(data);
            res.render('edit-category', {
                cat: data[0]
            })
        })
      
    })
    server.post('/edit-category:id', function (req, res) {
        let id = req.params.id;
        let fromData = req.body;
        let Sql = "Update category set ? where id = ?";
        db.query(Sql,[fromData, id], function (err,data){
            res.redirect('/category');
        })
    })
}