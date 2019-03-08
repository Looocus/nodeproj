const path = require('path');
const express = require('express');
const app = express();
const indexRouter = require('./routes/index.js');
const userRouter = require('./routes/users.js');
const bodyParser = require('body-parser');
const urlencodeParser = bodyParser.urlencoded({extend: false});
const nodemail = require('./public/js/nodemail.js');
const sqlOpt = require('./models/sqlOpt.js');
const mysql = require('mysql');
//mysql设置
const config = {
  host     : 'localhost',
  user     : process.env.MySQL_u,
  password : process.env.MySQL_p,
  port: '3306',
  database: 'exercise'
};
const connection = mysql.createConnection(config);
connection.connect();
//


app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use('/', indexRouter);
app.use('/users', userRouter);

app.listen(3000);

app.post('/mailtest', urlencodeParser, function(req, res) {
  var timestamp = Date.now();
  if(req.url === '/mailtest' && req.method === 'POST') {
    var email = req.body.email;
    var randomCode = Math.ceil(Math.random()*10**6);
    var mailOptions = {
      from: '<510302764@qq.com>', // sender address
      to: email, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Your Code is ' + randomCode, // plain text body
    };
    nodemail(mailOptions);
    sqlOpt(timestamp, email, randomCode, 1, connection);
    res.send({text: "发送成功", code: randomCode});
  };
});

app.post('/mailtest/checkcode', urlencodeParser, function(req, res) {
  var timestampNow = req.body.timestamp;
  var emailNow = req.body.email;
  var codeNow = req.body.code;
  var queryRes = new sqlOpt(timestampNow, emailNow, codeNow, 3, connection);
  queryRes.queryResult(function (data) {
    var timeCheck = (data['timestampp'] - timestampNow)/60000 <= 10;
    var codeCheck = data['codee'] === codeNow;
    //console.log(timeCheck, codeCheck);
    if(timeCheck && codeCheck){
      res.send({text: "验证码正确"})
    }else{
      res.send({text: "验证码错误"})
    }
  });
});
//socket.io实例
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
// server.listen(3000);
// var list =[];
// io.on('connection', (socket)=> {
//   socket.on('hi', (data)=> {
//     list.push(data['data']);
//     console.log(list);
//     socket.emit('c_hi', {data: 'hello!'})
//   });
// });
