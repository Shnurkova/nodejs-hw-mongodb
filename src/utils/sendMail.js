import nodemailer from 'nodemailer';

import { SMTP } from '../constants/index.js';

const transport = nodemailer.createTransport({
  host: SMTP.SMTP_HOST,
  port: SMTP.SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP.SMTP_USER,
    pass: SMTP.SMTP_PASSWORD,
  },
});

export function sendMail(option) {
  return transport.sendMail(option);
}
