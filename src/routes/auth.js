
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken, verifyToken } = require('../utils/tokenUtils');
const { sendVerificationEmail, sendVerificationSMS } = require('../utils/communicationUtils');

// Register new user - Step 1
router.post('/signup/initial', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { phone }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: existingUser.email === email 
          ? 'Email already registered' 
          : 'Phone number already registered' 
      });
    }
    
    // Create user but don't save yet
    const user = new User({
      name,
      email,
      phone,
      password,
      email_verified: false,
      phone_verified: false,
      terms_accepted: false
    });
    
    // Generate verification tokens
    const emailToken = generateToken();
    const phoneToken = generateToken(true); // numeric token for SMS
    
    user.verification_tokens = {
      email: {
        token: emailToken,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      },
      phone: {
        token: phoneToken,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      }
    };
    
    // Save user
    await user.save();
    
    res.status(201).json({
      success: true,
      message: 'Registration initiated successfully',
      userId: user._id
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration' 
    });
  }
});

// Send verification code - Step 2
router.post('/signup/send-verification', async (req, res) => {
  try {
    const { userId, method } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    if (method === 'email') {
      // Send email with verification code
      await sendVerificationEmail(
        user.email, 
        user.verification_tokens.email.token
      );
    } else if (method === 'phone') {
      // Send SMS with verification code
      await sendVerificationSMS(
        user.phone, 
        user.verification_tokens.phone.token
      );
    } else {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid verification method' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: `Verification code sent to your ${method}`
    });
  } catch (error) {
    console.error('Send verification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send verification code' 
    });
  }
});

// Verify code - Step 3
router.post('/signup/verify', async (req, res) => {
  try {
    const { userId, method, code } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    let isValid = false;
    let tokenExpired = false;
    
    if (method === 'email') {
      if (user.verification_tokens.email.expires < new Date()) {
        tokenExpired = true;
      } else if (user.verification_tokens.email.token === code) {
        user.email_verified = true;
        isValid = true;
      }
    } else if (method === 'phone') {
      if (user.verification_tokens.phone.expires < new Date()) {
        tokenExpired = true;
      } else if (user.verification_tokens.phone.token === code) {
        user.phone_verified = true;
        isValid = true;
      }
    } else {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid verification method' 
      });
    }
    
    if (tokenExpired) {
      return res.status(400).json({ 
        success: false, 
        message: 'Verification code expired' 
      });
    }
    
    if (!isValid) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid verification code' 
      });
    }
    
    await user.save();
    
    res.status(200).json({
      success: true,
      message: `${method === 'email' ? 'Email' : 'Phone'} verified successfully`
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Verification failed' 
    });
  }
});

// Verify captcha - Step 4
router.post('/signup/verify-captcha', async (req, res) => {
  try {
    const { userId, captchaToken } = req.body;
    
    // Verify captcha token with a service like reCAPTCHA
    const isCaptchaValid = await verifyCaptchaWithService(captchaToken);
    
    if (!isCaptchaValid) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid captcha' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Captcha verified successfully'
    });
  } catch (error) {
    console.error('Captcha verification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Captcha verification failed' 
    });
  }
});

// Complete signup - Step 5
router.post('/signup/complete', async (req, res) => {
  try {
    const { userId, acceptedTerms } = req.body;
    
    if (!acceptedTerms) {
      return res.status(400).json({ 
        success: false, 
        message: 'Terms and conditions must be accepted' 
      });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    // Check if either email or phone is verified
    if (!user.email_verified && !user.phone_verified) {
      return res.status(400).json({ 
        success: false, 
        message: 'Verification required before completing signup' 
      });
    }
    
    user.terms_accepted = true;
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Signup completed successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        email_verified: user.email_verified,
        phone_verified: user.phone_verified
      }
    });
  } catch (error) {
    console.error('Complete signup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to complete signup' 
    });
  }
});

module.exports = router;
