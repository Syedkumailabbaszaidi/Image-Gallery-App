export const userCreatedTemplate = (data) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Account Created</title>
    </head>
    <body>
      <h2>Account Created</h2>
      <p>You have successfully created account in Restaurants reviewing app. Enjoy reviewing!</p><br />
      <p>Details are:</p>
      <p><strong>Email: </strong> ${data.email}</p>
      <p><strong>Password: </strong> ${data.password}</p>
    </body>
  </html>
  `;

export default userCreatedTemplate;
