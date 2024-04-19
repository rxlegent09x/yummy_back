const { Server } = require("socket.io");
const {send_Mail} = require("./gmail-config");
const {encryption,decryption} = require("./utility");
const { Users } = require("./db-config");
const socketon=(server)=>{
const io = new Server(server);
let User_Count=0;
const USERS_OBJ = {};
io.on('connection', (socket) => {
  const id = socket.id;

  console.log('A user connected: '+id);
  USERS_OBJ[id]=null;
   User_Count++;
  io.emit("yes_join",User_Count);
  console.log(User_Count);

  socket.on('disconnect', () => {
    console.log('A user disconnected'+id);
     User_Count--;
    io.emit("yes_join",User_Count);
   
    console.log(User_Count);
    if(USERS_OBJ[id]){
console.log("A YummY User disconnected : "+USERS_OBJ[id]);
    }
    delete USERS_OBJ[id];
    });

  socket.on("send_otp",(mail)=>{
    const otp = (Math.floor(1000 + Math.random() * 9000))+"";
    send_Mail(mail,`OTP : ${otp}`);
    const enc_otp = encryption(otp);
    socket.emit("otp_sent",enc_otp);
  });



  socket.on("send_my_pass",mail=>{

Users.findOne({gmail:mail}).then(data=>{
  send_Mail(mail,`Your Password : ${data.pass}`);
}).catch(err=>{
  console.log(err);
});


  });

socket.on("reset_pass",({mailf,passf})=>{
  const dec_pass = decryption(passf);
  const mail = decryption(mailf);

  Users.updateOne({gmail:mail},{pass:dec_pass}).then(data=>{
send_Mail(mail,`You Succesfully Reset Password In YummY , Now You Can Login In Your Account Using Gmail : ${mail} & Password : ${dec_pass} !`);
    
  }).catch(err=>{
    console.log(err);
  });
  
});


socket.on("early_check",i_d=>{
  
  const dec_id = decryption(i_d);

  Users.findOne({gmail:dec_id}).then(data=>{
    if(data==null){
      USERS_OBJ[id]=null;
      socket.emit("yes_check",encryption(JSON.stringify({})));
      return;
    }
    const enc_data = encryption(JSON.stringify(data));
    socket.emit("yes_check",enc_data);
  console.log("A YummY User Joined : "+dec_id);
    USERS_OBJ[id]=dec_id;
    
    
  }).catch(err=>{
    console.log(err);
  })
})

socket.on("update_req",(enc_dt)=>{
const dec_dt= JSON.parse(decryption(enc_dt));

Users.updateOne({gmail:dec_dt.gmail},{...dec_dt}).then(dt=>{
socket.emit("update_res",enc_dt);
}).catch(err=>{
  console.log(err);
})
});

  

  

//socket end...
  });
}





module.exports={socketon};
