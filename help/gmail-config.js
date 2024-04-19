const nodemailer = require('nodemailer');
const user_name = "team.yummy.india@gmail.com";
const user_password = "oiyvdevgkejdhqmc"; //oiyv devg kejd hqmc
const {get_HTML} = require('./mail-style');






const send_Mail=(to_Mail,txt)=>{

let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: user_name,
    pass: user_password
  }
});

let mailDetails = {
  from: user_name,
  to: to_Mail,
  subject:"YUMMY VERIFICATION",
  html: get_HTML(txt)
};

mailTransporter.sendMail(mailDetails, (err, data) =>{
  if(err) {
    console.log('Error Occurs in Mail sending');
  } else {
    console.log('Email sent successfully');
  }
});

  
}
module.exports={send_Mail}