const { Users } = require("./db-config");
const { decryption, encryption } = require("./utility.js");
const {send_Mail} = require("./gmail-config");


const apion = (app) => {
  app.post("/sign_up", (req, res) => {
    const data = req.body.enc_dbt;
    const decryptData = JSON.parse(decryption(data));

    //filtering data

    const u = new Users(decryptData);
    u.save()
      .then((re) => {
        delete re.pass;
        const enc = encryption(JSON.stringify(re));
        const sms = `
   You Succesfully Registered In YummY , Now You Can Login In Your Account Using Gmail : ${decryptData.gmail} & Password : ${decryptData.pass} !`;
        send_Mail(decryptData.gmail, sms);
        res.send({
          "snd_data": enc,
        });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  });

  app.post("/is_ExistUserData", (req, res) => {
    const data = decryption(req.body.bd_data);
    const dx = JSON.parse(data);
    Users.findOne({ $or: dx })
      .then((trex) => {
        if (trex!=null) {
          res.send({
            is_Exist: true,
          });
          return;
        }
        res.send({
          is_Exist: false,
        });
        return;
      })
      .catch((err) => {
        res.send({
          is_Exist: false,
        });
        console.log(err);
        return;
      });
  });

  app.post("/log_in", (req, res) => {
    const data = req.body.enc_dt;
    const decryptData = JSON.parse(decryption(data));
    delete decryptData.ans;

    Users.findOne(decryptData)
      .then((trex) => {
        if (trex!=null) {
          delete trex.pass;
          res.send({
            txt: true,
            dtx: encryption(JSON.stringify(trex)),
          });
          return;
        } else {
          res.send({ sts: false });
          return;
        }
      })
      .catch((err) => {
        res.send({ txt: err });
        return;
      });
  });
};
module.exports = { apion };
