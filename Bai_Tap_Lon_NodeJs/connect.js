
const mysql = require('mysql2');

const db = mysql.createConnection(
  'mysql://root:dai2003@@localhost:3306/BTL'
);

db.addListener('error', (err) => {
  console.log(err);
});
db.connect(function (err) {
    if (err) {
        console.log(err);
        throw new Error('Không thể kết nối CSDL', err);

    }
});

module.exports = db;