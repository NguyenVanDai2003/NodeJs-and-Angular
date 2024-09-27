const db = require('../connect');

module.exports = function(server){

    server.post('/api/favourite', function (req, res) {
        let formData = req.body;
        let Sql = "SELECT * FROM favourite WHERE account_id = ? AND product_id = ?";
        db.query(Sql, [formData.account_id, formData.product_id], function (err, data) {
            if (data.length > 0) {
                let Sql1 = "DELETE FROM favourite WHERE account_id = ? AND product_id = ?";
                db.query(Sql1, [formData.account_id, formData.product_id], function (err, data) {
                    res.send({
                        result: "Bỏ thích thành công",
                        status: true
                    })
                });
            } else {
                let Sql2 = "INSERT INTO favourite set ?";
                db.query(Sql2, [formData], function (err, data) {
                    if (err) {
                        res.send({
                            result: err.sqlMessage,
                            status: false
                        })
                    } else {
                        res.send({
                            result: "Yêu thích thành công",
                            status: true
                        })
                    }
                })
            }
        })

    });
    
    server.delete('/api/favorite/:acc_id/:pro_id', function (req, res) {
        let acc_id = req.params.acc_id;
        let pro_id = req.params.pro_id;
        let Sql = "DELETE FROM favorite WHERE account_id = ? AND product_id = ?";
        db.query(Sql, [acc_id, pro_id], function (err, data) {
            if (err) {
                res.send({
                    result: "Bỏ thích không thành công"
                })
            } else {
                res.send({
                    result: "Bỏ thích thành công"
                })
            }
            
        })
    });

    server.get('api/favourite/:acc_id/:pro_id', function (req, res) {
        let acc_id = req.params.acc_id;
        let pro_id = req.params.pro_id;
        let Sql = "Select * from favourite where account_id = ? AND product_id = ?";
        db.query(Sql, [acc_id, pro_id], function (err,data){
            console.log(err, data);
            res.send({
                result: data.length ? true : false
            })
        })
    });

    server.get('/api/favorite/:acc_id', function (req, res) {
        let acc_id = req.params.acc_id;
        let Sql = "SELECT p.* FROM favourite f JOIN product p ON f.product_id = p.id WHERE f.account_id = ?";
        db.query(Sql, [acc_id], function (err, data) {
            res.send({
                result: data
            })
        })
    });

    function checkIsFavourite(acc_id, pro_id){
        let Sql = "Select * FROM favourite where account_id = ? AND product_id = ?";
        return db.query(Sql, [acc_id, pro_id], function (err,data){
            return data.length  ? true : false
        })
    }

    
}