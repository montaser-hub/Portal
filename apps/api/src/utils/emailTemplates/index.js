export const templates = {
  welcome: `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif;">
        <h2>Welcome, {{firstName}}!</h2>
        <p>We're excited to have you at <strong>Egy Tech</strong>.</p>
        <p>Click below to start exploring:</p>
        <a href="{{url}}" style="background:#007bff;color:#fff;padding:10px 15px;text-decoration:none;border-radius:5px;">Get Started</a>
      </body>
    </html>
  `,

  passwordReset: `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif;">
        <h3>Hello, {{firstName}}!</h3>
        <p>We received a request to reset your password.</p>
        <p>Click below to set a new password. This link is valid for 10 minutes:</p>
        <a href="{{url}}" style="background:#dc3545;color:#fff;padding:10px 15px;text-decoration:none;border-radius:5px;">Reset Password</a>
        <p>If you didn’t request this, just ignore this email.</p>
      </body>
    </html>
  `
};
