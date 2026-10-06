import nodemailer from 'nodemailer';
import { config } from '../config/env.js';

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  if (config.smtp.service && config.smtp.user) {
    transporter = nodemailer.createTransport({
      service: config.smtp.service,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
    });
  } else if (config.smtp.host && config.smtp.user) {
    transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.port === 465,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
    });
  } else {
    // Development fallback logger
    transporter = {
      sendMail: async (mailOptions) => {
        if (!config.isTest) {
          console.log('[EmailService Mock] Outgoing email:');
          console.log(`  To: ${mailOptions.to}`);
          console.log(`  Subject: ${mailOptions.subject}`);
        }
        return { messageId: 'mock-mail-id-' + Date.now() };
      },
    };
  }

  return transporter;
}

/**
 * Send admin notification email for a new general enquiry.
 * 
 * @param {Object} enquiry
 */
export async function sendEnquiryAdminEmail(enquiry) {
  const mailer = getTransporter();
  const subject = `[New Enquiry] from ${enquiry.fullName} - Mi Udyojak Honarach`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #EAEAEA; border-radius: 8px;">
      <h2 style="color: #E27500; border-bottom: 2px solid #E27500; padding-bottom: 10px;">New Website Enquiry Received</h2>
      <p><strong>Name:</strong> ${enquiry.fullName}</p>
      <p><strong>Email:</strong> ${enquiry.email}</p>
      <p><strong>Mobile:</strong> ${enquiry.phone}</p>
      <p><strong>City / District:</strong> ${enquiry.city}</p>
      <p><strong>Stage:</strong> ${enquiry.stage || 'N/A'}</p>
      <p><strong>Area of Interest:</strong> ${enquiry.interest || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <div style="background: #F9F9FB; padding: 12px; border-radius: 4px; border-left: 4px solid #E27500;">
        ${enquiry.message || 'No additional message provided.'}
      </div>
      <p style="color: #666; font-size: 12px; margin-top: 20px;">Received at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
    </div>
  `;

  return mailer.sendMail({
    from: config.emailFrom,
    to: config.adminEmail,
    subject,
    html,
  });
}

/**
 * Send acknowledgement email to the user for general enquiry.
 * 
 * @param {Object} enquiry
 */
export async function sendEnquiryUserEmail(enquiry) {
  const mailer = getTransporter();
  const subject = `Thank you for reaching out to Mi Udyojak Honarach, ${enquiry.fullName}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #EAEAEA; border-radius: 8px;">
      <h2 style="color: #E27500;">नमस्कार ${enquiry.fullName},</h2>
      <p>Thank you for expressing your interest in the <strong>Mi Udyojak Honarach</strong> (मी उद्योजक होणारच) initiative.</p>
      <p>We have successfully received your inquiry regarding <em>"${enquiry.interest || 'Entrepreneurship & Mentorship'}"</em>.</p>
      <p>Our team and mentors will review your details and connect with you shortly via phone or email.</p>
      <hr style="border: none; border-top: 1px solid #EAEAEA; margin: 20px 0;" />
      <p style="font-size: 13px; color: #555;">
        <strong>Movement Convener:</strong> Nilesh More<br />
        <strong>Website:</strong> ${config.frontendUrl}
      </p>
    </div>
  `;

  return mailer.sendMail({
    from: config.emailFrom,
    to: enquiry.email,
    subject,
    html,
  });
}

/**
 * Send admin notification email for a new event registration.
 * 
 * @param {Object} registration
 */
export async function sendEventAdminEmail(registration) {
  const mailer = getTransporter();
  const subject = `[Event Registration] ${registration.fullName} for ${registration.eventTitle}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #EAEAEA; border-radius: 8px;">
      <h2 style="color: #E27500; border-bottom: 2px solid #E27500; padding-bottom: 10px;">New Event Registration</h2>
      <p><strong>Event:</strong> ${registration.eventTitle} (${registration.eventId})</p>
      <p><strong>Participant Name:</strong> ${registration.fullName}</p>
      <p><strong>Email:</strong> ${registration.email}</p>
      <p><strong>Mobile:</strong> ${registration.phone}</p>
      <p><strong>Business / Venture:</strong> ${registration.businessName || 'Not specified'}</p>
      <p><strong>City / District:</strong> ${registration.cityDistrict}</p>
      <p><strong>Notes / Goals:</strong></p>
      <div style="background: #F9F9FB; padding: 12px; border-radius: 4px; border-left: 4px solid #E27500;">
        ${registration.message || 'No additional note provided.'}
      </div>
      <p style="color: #666; font-size: 12px; margin-top: 20px;">Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
    </div>
  `;

  return mailer.sendMail({
    from: config.emailFrom,
    to: config.adminEmail,
    subject,
    html,
  });
}

/**
 * Send participant confirmation email for event registration.
 * 
 * @param {Object} registration
 */
export async function sendEventUserEmail(registration) {
  const mailer = getTransporter();
  const subject = `Registration Received: ${registration.eventTitle}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #EAEAEA; border-radius: 8px;">
      <h2 style="color: #E27500;">Registration Confirmed</h2>
      <p>Dear ${registration.fullName},</p>
      <p>We are delighted to confirm your seat/interest application for:</p>
      <div style="background: #FFF7ED; padding: 15px; border-radius: 6px; border: 1px solid #FFEDD5; margin: 15px 0;">
        <h3 style="margin: 0; color: #9A3412;">${registration.eventTitle}</h3>
        <p style="margin: 5px 0 0; color: #7C2D12; font-size: 13px;">Location: ${registration.cityDistrict}</p>
      </div>
      <p>Our event organizing committee will send venue schedule and entry passes prior to the event date.</p>
      <p>If you have any questions, reply directly to this email.</p>
      <hr style="border: none; border-top: 1px solid #EAEAEA; margin: 20px 0;" />
      <p style="font-size: 13px; color: #555;">
        <strong>Mi Udyojak Honarach</strong><br />
        Website: ${config.frontendUrl}
      </p>
    </div>
  `;

  return mailer.sendMail({
    from: config.emailFrom,
    to: registration.email,
    subject,
    html,
  });
}

export default {
  sendEnquiryAdminEmail,
  sendEnquiryUserEmail,
  sendEventAdminEmail,
  sendEventUserEmail,
};
