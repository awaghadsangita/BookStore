const nodemailer = require('nodemailer');

class Email {
    nodemailer(data) {
        console.log("emailDATA", data);
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 456,
            auth: {
                user: 'surajpj78522@gmail.com',
                pass: 'sxzndkzywipzirlw'
            }
        });

        let mailoption = {
            from: 'surajpj7852@gmail.com',
            to: data.Email,
            subject: 'mail from suraj for order confirmation',
            text: `Your Order has been Confirmed\nYour Order id is\n#${data._id}\nThank you for shopping\nHAVE A GOOD DAY`
        };
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailoption, (err, data)=>
            {
                if (err) {
                    reject(500);
                } else {
                    resolve(data);
                }
            })
        })
    }
}
module.exports = new Email();