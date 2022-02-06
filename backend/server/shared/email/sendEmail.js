import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

import notificationConfig from '../utils/notifications';

const { email } = notificationConfig;

if (!email || JSON.stringify(email) === '{}' || !email.smtp) {
  throw Error('No email config found. Please add email config in notifications.js');
}

const transporter = nodemailer.createTransport(smtpTransport(email.smtp));

const createEmailTrasporter = (mailOptions) => transporter.sendMail(mailOptions);

export default createEmailTrasporter;
