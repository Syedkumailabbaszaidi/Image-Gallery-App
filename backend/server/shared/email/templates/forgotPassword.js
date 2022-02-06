const forgotPasswordTemplate = (data) => {
  const template = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Forgot Password</title>
    </head>
    <body><a href="${data.url}">Please click this link to reset your password</a></body>
  </html>
  `;
  return template;
};

export default forgotPasswordTemplate;
