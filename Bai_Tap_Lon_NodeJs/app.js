const express = require('express');
const server = express();
const ejs = require('ejs');
server.set('view engine', 'ejs');
const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(express.static('public'));
server.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}
server.use(cors(corsOptions));

require('./routers/home.router')(server);
require('./routers/Dang_ky')(server);
// api router
// server.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });
require('./routers/api.category')(server);
require('./routers/api.product')(server);
require('./routers/api.account')(server);
require('./routers/api.favourite')(server);
// moddlewere
server.use(require('./middlwere/auth'));

require('./routers/category.router')(server);
require('./routers/product.router')(server);


server.listen(3002, function () {
    console.log('Máy chủ chạy tại: http://localhost:3002')
});
