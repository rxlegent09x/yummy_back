const CryptoJS = require('crypto-js');

const encryption=(data)=>{
   const passphrase = 'xxxxxxxxxxxxxxxx';
   return CryptoJS.AES.encrypt(data, passphrase).toString();
}
const decryption=(data)=>{
   const passphrase = 'xxxxxxxxxxxxxxxx';
  const bytes = CryptoJS.AES.decrypt(data, passphrase);

  return bytes.toString(CryptoJS.enc.Utf8);
}












module.exports={encryption,decryption};
