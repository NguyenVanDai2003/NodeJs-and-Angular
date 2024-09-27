const db = require('../connect');

module.exports = function(server){

    server.get('/api/category', function (req, res) {
        db.query('SELECT * FROM category WHERE status =1 ', function (err,data){
            // console.log({err},{data});
            res.send({
                result: data
            })
        })
    })
    server.post('/api/category', function (req, res) {
        let fromData = req.body;
        let Sql = "INSERT INTO category set ?";
        db.query(Sql,[fromData], function (err,data){
           res.send({
                result: data
            })
    
        })
    })
    // lấy ra 1 sản phẩm
    server.get('/api/category:id', function (req, res) {
        let id = req.params.id;
        let Sql = "Select * from category where id = ?";
        db.query(Sql,[id], function (err,data){
            // console.log(data);
            res.send({
                result: data[0]
            })
        })
      
    })
    server.delete('/api/category:id', function (req, res) {
        let id = req.params.id;
        let Sql = "Delete from category where id = ?" ;
        db.query(Sql,[id], function (err,data) {
            res.send({
                result: data
            })
        })
    })

    server.put('/api/category:id', function (req, res) {
        let id = req.params.id;
        let fromData = req.body;
        let Sql = "Update category set ? where id = ?";
        db.query(Sql,[fromData, id], function (err,data){
           res.send({
                result: data
            })
        })
    })
    server.get('/api/product-by-category/:id', function (req, res){
        let id = req.params.id;
        let Sql = "Select * from product where category_id = ?";
        db.query(Sql,[id], function (err,data){
           res.send({
                result: data
            })
        })
    })
}