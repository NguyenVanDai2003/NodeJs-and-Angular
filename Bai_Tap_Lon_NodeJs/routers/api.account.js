const db = require('../connect');

module.exports = function(server){

    server.post('/api/register', function (req, res) {
        let fromData = req.body;
        let Sql = "INSERT INTO account set ?";
        db.query(Sql,[fromData], function (err,data){
            if(err) {
                res.send({
                    result: err.sqlMessage,
                    status: false,
                })
            }else {
                res.send({
                    result: 'Đăng kí thành công',
                    status: true
                })
            }
        })
    })
    server.post('/api/login', function (req, res) {
        let Sql = "SELECT * FROM account WHERE email = ? AND password = ?";
        db.query(Sql,[req.body.email, req.body.password], function (err,data){
            res.send({
                 result: data.length ? data[0] : null
             })
         })
    })


    // server.post('/api/account', function (req, res) {
    //     let fromData = req.body;
    //     let Sql = "INSERT INTO account set ?";
    //     db.query(Sql,[fromData], function (err,data){
    //        res.send({
    //             result: data
    //         })
    
    //     })
    // })
    // lấy ra 1 sản phẩm
    // server.get('/api/account:id', function (req, res) {
    //     let id = req.params.id;
    //     let Sql = "Select * from account where id = ?";
    //     db.query(Sql,[id], function (err,data){
    //         // console.log(data);
    //         res.send({
    //             result: data[0]
    //         })
    //     })
      
    // })
    // server.delete('/api/account:id', function (req, res) {
    //     let id = req.params.id;
    //     let Sql = "Delete from account where id = ?" ;
    //     db.query(Sql,[id], function (err,data) {
    //         res.send({
    //             result: data
    //         })
    //     })
    // })

//     server.put('/api/account:id', function (req, res) {
//         let id = req.params.id;
//         let fromData = req.body;
//         let Sql = "Update account set ? where id = ?";
//         db.query(Sql,[fromData, id], function (err,data){
//            res.send({
//                 result: data
//             })
//         })
//     })
}