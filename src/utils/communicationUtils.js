
const nodemailer = require('nodemailer');

/**
 * Send verification email
 * @param {string} email - Recipient email
 * @param {string} token - Verification token
 * @returns {Promise} - Email sending result
 */
exports.sendVerificationEmail = async (email, token) => {
  // For production, configure real email service
  // This is a development example using Ethereal
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  
  const mailOptions = {
    from: `"Easy Win Learning Hub" <${process.env.EMAIL_FROM || 'noreply@easywin.com'}>`,
    to: email,
    subject: 'Verify your email address',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Verify your email address</h2>
        <p>Thank you for signing up with Easy Win Learning Hub. To complete your registration, please use the verification code below:</p>
        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
          ${token}
        </div>
        <p>This code will expire in 24 hours.</p>
        <p>If you did not request this verification, please ignore this email.</p>
      </div>
    `
  };
  
  return await transporter.sendMail(mailOptions);
};

/**
 * Send verification SMS
 * @param {string} phone - Recipient phone number
 * @param {string} token - Verification token
 * @returns {Promise} - SMS sending result
 */
exports.sendVerificationSMS = async (phone, token) => {
  // Placeholder for SMS service implementation
  // For production, use a service like Twilio
  console.log(`Sending SMS to ${phone} with code: ${token}`);
  
  // Simulating SMS sending for development
  return Promise.resolve({
    success: true,
    message: `SMS sent to ${phone}`
  });
};

/**
 * Verify captcha with external service
 * @param {string} token - Captcha token
 * @returns {Promise<boolean>} - Verification result
 */
exports.verifyCaptchaWithService = async (token) => {
  // For production, implement real captcha verification
  // Example with Google reCAPTCHA:
  /*
  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`, {
    method: 'POST'
  });
  
  const data = await response.json();
  return data.success;
  */
  
  // For development, always return true
  return Promise.resolve(true);
};
