const sgMail = require('@sendgrid/mail');
require('dotenv').config()

const apikey = process.env.API_KEY_SENDGRID;

sgMail.setApiKey(apikey)

const sendMail = async (mailDestination, subject, contents) => {
    const msg = {
        to: mailDestination,
        from: process.env.MAIL_DESTINATION,
        subject,
        text: contents
    }
    try {
        await sgMail.send(msg);
        return 'Correo enviado correctamente';
    } catch (error) {
        console.log(error);
        if (error.response) {
            throw new Error(error.response.body)
        }
    }
}

sendMail('lunasteobaldo@gmail.com', 'prueba','correo de prueba')

module.exports = {sendMail}