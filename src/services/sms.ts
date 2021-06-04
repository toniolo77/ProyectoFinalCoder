const acountId = process.env.ACCOUNTID;
const authToken = process.env.AUTHTOKEN;

const client = require("twilio")(acountId, authToken);

const sendSms = (nombre, mensaje) => {
  client.messages
    .create({
      body: `user:${nombre}, mensaje:${mensaje}`,
      from: "+16369238406",
      to: process.env.PHONE,
    })
    .then((message) => console.log("envio sms"))
    .catch((err) => console.log(err));
};

module.exports.sendSms = sendSms;
