const acountId = process.env.ACCOUNTID;
const authToken = process.env.AUTHTOKEN;

const client = require("twilio")(acountId, authToken);

export const sendSms = (toPhone, message) => {
  client.messages
    .create({
      body: message,
      from: "+16369238406",
      to: toPhone,
    })
    .then((message) => console.log("envio sms"))
    .catch((err) => console.log(err));
};

export const sendWhatsapp = (message) => {
  client.messages
    .create({
      body: message,
      from: `whatsapp:${process.env.WHATSAPP_PHONE_FROM}`,
      to: `whatsapp:${process.env.WHATSAPP_PHONE}`,
    })
    .then((message) => console.log("envio sms"))
    .catch((err) => console.log(err));
};
