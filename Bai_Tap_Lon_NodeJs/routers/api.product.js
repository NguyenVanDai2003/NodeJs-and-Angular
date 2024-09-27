const db = require('../connect');

module.exports = function(server){

    server.get('/api/product', function (req, res) {
        db.query('SELECT * FROM product WHERE status =1 ', function (err,data){
            // console.log({err},{data});
            res.send({
                result: data
            })
        })
    })
    server.post('/api/product', function (req, res) {
        let fromData = req.body;
        let Sql = "INSERT INTO product set ?";
        db.query(Sql,[fromData], function (err,data){
           res.send({
                result: data
            })
    
        })
    })
    // lấy ra 1 sản phẩm
    server.get('/api/product:id', function (req, res) {
        let id = req.params.id;
        let Sql = "Select * from product where id = ?";
        db.query(Sql,[id], function (err,data){
            // console.log(data);
            res.send({
                result: data[0]
            })
        })
      
    })
    server.delete('/api/product:id', function (req, res) {
        let id = req.params.id;
        let Sql = "Delete from product where id = ?" ;
        db.query(Sql,[id], function (err,data) {
            res.send({
                result: data
            })
        })
    })

    server.put('/api/product:id', function (req, res) {
        let id = req.params.id;
        let fromData = req.body;
        let Sql = "Update product set ? where id = ?";
        db.query(Sql,[fromData, id], function (err,data){
           res.send({
                result: data
            })
        })
    })
}