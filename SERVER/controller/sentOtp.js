

import { hashPassword, comparePassword } from "../helpers/authHelper.js"
import jwt from 'jsonwebtoken'
import userModel from "../model/userModel.js"
import nodemailer from 'nodemailer'



// // const nodemailer = require('nodemailer');
// require("dotenv").config();
// const { emailExist } = require('../database/signin');
// const { response } = require('../app');



//send karne me smtp server



export function sendEmail({ recipient_email, OTP }) {
    return new Promise((resolve, reject) => {

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            tls: {
                rejectUnauthorized: false // Accept self-signed certificates
            },
            auth: {

                user: "amishra73185@gmail.com",
                pass: "zvptvfcguamrpuuv"

            },
        });



        //how mails looks after sendings mail 
        const mail_configs = {
            from: 'amishra73185@gmail.com',
            to: 'amishra73185@gmail.com',
            subject: " PASSWORD RECOVERY",
            html: `<!DOCTYPE html>
              <html lang="en" >
              <head>
                <meta charset="UTF-8">
                <title>Aman Dev - OTP Email Template</title>
                
              
              </head>
              <body>
              
              <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                  <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">AMAN DEV</a>
                  </div>
                  <p style="font-size:1.1em">Hi,</p>
                  <p>Thank you for choosing my websites. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
                  <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}
                  </h2>
                  <p style="font-size:0.9em;">Regards,<br />AMAN</p>
                  <hr style="border:none;border-top:1px solid #eee" />
                  <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                    <p>AMAN DEV</p>
                    <p>Lucknow</p>
                    <p>Uttar Pradesh</p>
                  </div>
                </div>
              </div>
              <!-- partial -->
                
              </body>
              </html>`,
        };


        //and now run


        //after sending maile what would be error
        // transporter.sendMail() =>  config and callback function leta hai

        //callback me parameter ==> erro, info
        transporter.sendMail(mail_configs, function (error, info) {

            //if error occured
            if (error) {
                console.log("error for mail sent", error);
                return reject({ message: `An error has occured` });


            }

            else {
                console.log("emeil has been sent", info.response)
            }

            // console.log("Message sent", info.messageId)

            return resolve({ message: "Email sent succesfuly" });


        }

        );


    });


}
export const sentOtp = async (req, res) => {
    const { recipient_email } = req.body;


    try {
        // Check if recipient_email exists in the request body
        if (!recipient_email) {
            return res.status(400).send({ message: "Recipient email is missing in the request body" });
        }

        const userEmail = await userModel.findOne({ email: recipient_email });


        if (userEmail) {
            // Send email with OTP
            await sendEmail(req.body);
            res.status(200).send({ message: "OTP sent successfully" });
        } else {
            res.status(404).send({ message: "Email does not exist" });
            console.log("Email does not exist in the database");
        }
    } catch (error) {
        console.error('Error in sending OTP:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
};
