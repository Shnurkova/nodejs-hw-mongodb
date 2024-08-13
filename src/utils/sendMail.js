import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: '7a4fd0001@smtp-brevo.com',
    pass: '27z4bWwJ5CQTy0q1',
  },
});

export function sendMail(option) {
  return transport.sendMail(option);
}
