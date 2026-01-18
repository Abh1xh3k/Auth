import config from '../config/config.js'
import nodemailer from 'nodemailer'

const transporter=nodemailer.createTransport({
    host:config.EMAIL_HOST,
    port:2525,
    auth:{
        user:config.EMAIL_USER,
        pass:config.EMAIL_PASS
    }
});

export const sendEmailVerification = async (email, token) => {
  const link = `${config.APP_BASE_URL}/api/auth/verify-email?token=${token}`;

  await transporter.sendMail({
    from: '"My App" <no-reply@myapp.com>',
    to: email,
    subject: "Verify your email",
    html:`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Email Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 40px 0;">
        
        <table width="600" cellpadding="0" cellspacing="0" 
          style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#1e293b; padding:20px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:24px;">
                Code-Collab
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#333333;">
              <h2 style="margin-top:0;">Verify your email</h2>

              <p style="font-size:15px; line-height:1.6;">
                Hi 👋,<br><br>
                Thanks for signing up on <strong>Code-Collab</strong>.
                Please confirm your email address by clicking the button below.
              </p>

              <div style="text-align:center; margin:30px 0;">
                <a href="${link}"
                  style="background:#2563eb; color:#ffffff; text-decoration:none;
                  padding:12px 24px; border-radius:6px; font-weight:bold; display:inline-block;">
                  Verify Email
                </a>
              </div>

              <p style="font-size:14px; color:#555555;">
                This link will expire in <strong>15 minutes</strong>.
                If you didn’t create an account, you can safely ignore this email.
              </p>

              <p style="font-size:14px; margin-top:30px;">
                Regards,<br>
                <strong> Team Code-Collab</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f1f5f9; padding:15px; text-align:center; font-size:12px; color:#64748b;">
              © ${new Date().getFullYear()} Code-Collab. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`
  });
};
export const sendPasswordReset = async (email, token) => {
  const link = `http://localhost:3000/api/auth/reset-password?token=${token}`;

  try{
      await transporter.sendMail({
        from: '"My App" <no-reply@myapp.com>',
        to: email,
        subject: "Reset your password",
        html:`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Password Reset</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 40px 0;">
        
        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff; border-radius:8px; overflow:hidden;
          box-shadow:0 2px 10px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#7c2d12; padding:20px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:24px;">
                Code-Collab
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#333333;">
              <h2 style="margin-top:0;">Reset your password</h2>

              <p style="font-size:15px; line-height:1.6;">
                Hi 👋,<br><br>
                We received a request to reset your password for
                <strong>Code-Collab</strong>.
                Click the button below to create a new password.
              </p>

              <div style="text-align:center; margin:30px 0;">
                <a href="${link}"
                  style="background:#dc2626; color:#ffffff; text-decoration:none;
                  padding:12px 24px; border-radius:6px; font-weight:bold;
                  display:inline-block;">
                  Reset Password
                </a>
              </div>

              <p style="font-size:14px; color:#555555;">
                This link will expire in <strong>15 minutes</strong>.
                If you did not request a password reset, please ignore this email.
              </p>

              <p style="font-size:14px; margin-top:30px;">
                Stay safe,<br>
                <strong>Code-Collab Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f1f5f9; padding:15px; text-align:center;
            font-size:12px; color:#64748b;">
              © ${new Date().getFullYear()} Code-Collab. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`
      });
  }
  catch(err){
      console.error('Email error:', err);
    throw err;
  }

};