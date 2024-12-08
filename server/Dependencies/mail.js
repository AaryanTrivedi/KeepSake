const mail = require('nodemailer');
const config = require('./config')

const transport = mail.createTransport({
    service: 'gmail',
    auth:{
        user: config.email,
        pass: config.password,
    },
})
async function sendEmail(sendEmail, subject, body, callback) {
    const result = await transport.sendMail({
      to: sendEmail,
      subject,
      html: body,
    })
    callback()
  }
  
  module.exports = sendEmail;