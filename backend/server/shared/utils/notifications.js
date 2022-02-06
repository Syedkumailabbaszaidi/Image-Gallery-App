import ENV from '../../config/env';

const notificationConfig = {
  email: {
    smtp: {
      service: 'gmail',
      auth: {
        user: ENV.SMTP_USER,
        pass: ENV.SMTP_PASS,
      },
    },
  },
};
export default notificationConfig;
