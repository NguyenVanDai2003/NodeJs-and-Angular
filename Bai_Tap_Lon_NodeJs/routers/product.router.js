const db = require('../connect');
const upload = require('../middlwere/upload.multer');
module.exports = function (server) {

    server.get('/product', function (req, res) {
        let key = req.query.key
        let Sql = "SELECT product.*, category.name as cat_name FROM product JOIN category ON category.id = product.category_id"
        if (key) {
            Sql += " WHERE product.name Like '%" + key + "%'";
        }
        console.log(Sql);
        db.query(Sql, function (err, data) {
            // console.log({err},{data});
            res.render('product', {
                pros: data
            })
        })
    })
   // Xử lý xóa sản phẩm
server.get('/delete-product:id', function (req, res) {
    let id = req.params.id;
    let sql = "DELETE FROM product WHERE id = ?";
    
    db.query(sql, [id], function (err, result) {
        if (err) {
            console.error("Lỗi khi xóa sản phẩm:", err);
            res.status(500).send("Có lỗi xảy ra khi xóa sản phẩm.");
            return;
        }
        res.redirect('/product');
    });
});

    server.get('/create-product', function (req, res) {
        db.query('SELECT * FROM category', function (err, data) {
            res.render('create-product', {
                cats: data
            })
        })
    });
    server.post('/create-product', upload, function (req, res) {
        let fromData = req.body;
        if (req.file) {
            fromData.image = req.file.filename;
        }
        let Sql = "INSERT INTO product set ?";
        db.query(Sql, [fromData], function (err, data) {
            console.log(err);
            res.redirect('/product');
        })
    });
    server.get('/edit-product:id', function (req, res) {
        let id = req.params.id;
        let Sql = "Select * from product where id = ?";
        db.query(Sql, [id], function (err, data) {
            // console.log(data);
            res.render('edit-product', {
                pros: data[0]
            })
        })
    })
    server.post('/edit-product:id', function (req, res) {
        let id = req.params.id;
        let fromData = req.body;
        let Sql = "Update product set ? where id = ?";
        db.query(Sql, [fromData, id], function (err, data) {
            res.redirect('/product');
        })
    })
}