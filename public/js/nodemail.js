const nodemailer = require('nodemailer');

const config = {
  host: 'smtp.qq.com',
  port: 465,
  auth: {
    user: '510302764@qq.com',
    pass: 'xttqjhceladqcagf'
  }
};

const transporter = nodemailer.createTransport(config);

module.exports = function (mail) {
  transporter.sendMail(mail, function(error, info) {
    if(error){
      return console.log(error);
    }
    console.log('mail sent:', info.response);
  });
};
