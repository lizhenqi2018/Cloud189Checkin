'use strict';
require('dotenv').config();
const nodemailer = require('nodemailer');
const log4js = require('log4js');
log4js.configure({
    appenders: {
        vcr: {
            type: 'recording',
        },
        out: {
        type: 'console',
        },
    },
    categories: { default: { appenders: ['vcr', 'out'], level: 'info' } },
});

const logger = log4js.getLogger();

let mailConf = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,                  // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
    secureConnection: false,
    tls: {
        rejectUnAuthorized: true
    }
}
// 创建一个可重用的邮件传输器
let transporter = nodemailer.createTransport(mailConf);

// 发送邮件
function sendEmail(title, desp) {
    // 邮件配置
    let mailOptions = {
        from: `天翼云盘<${process.env.EMAIL_USERNAME}>`,
        to: `<${process.env.EMAIL_USERNAME}>`,
        subject: title,
        text: desp
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            logger.log('Error occurred:', error.message);
        }
        else {
            logger.error('Email sent:', info.response);
        }
    });
}

module.exports=sendEmail

