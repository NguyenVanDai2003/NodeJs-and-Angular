const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //files khi upload xong sẽ nằm trong thư mục "uploads"
        cb(null, './public/image/')
    },
    filename: function (req, file, cb) {
        // tạo tên file = thời gian hiện tại nối với số ngẫu nhiên => tên file chắc chắn không bị trùng
        const filename = Date.now() + '-' + file.fieldname;
        cb(null, filename + '-' + Date.now() + file.originalname.match(/\..*$/)[0])
    }
});
const upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, jpeg and .jpg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }
    },
}).single('image');

module.exports = upload;