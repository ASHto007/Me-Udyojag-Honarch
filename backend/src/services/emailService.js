import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { config } from '../config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOCAL_LOGO_PATH = path.resolve(__dirname, '../assets/logo.png');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  // In automated test runs, always use an isolated mock transporter
  if (config.isTest) {
    transporter = {
      sendMail: async () => {
        return { messageId: 'test-mock-mail-id-' + Date.now() };
      },
    };
    return transporter;
  }

  if (config.smtp.service && config.smtp.user) {
    console.log(`[EmailService] Initialized with SMTP service: ${config.smtp.service} (${config.smtp.user})`);
    transporter = nodemailer.createTransport({
      service: config.smtp.service,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
    });
  } else if (config.smtp.host && config.smtp.user) {
    console.log(`[EmailService] Initialized with SMTP host: ${config.smtp.host}:${config.smtp.port} (User: ${config.smtp.user})`);
    transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.port === 465,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
    });
  } else {
    // Development fallback logger
    console.warn('[EmailService Warning] No SMTP credentials configured. Falling back to console logger.');
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
 * Helper to get logo configuration (inline CID attachment or URL fallback).
 */
function getLogoConfig() {
  try {
    if (fs.existsSync(LOCAL_LOGO_PATH)) {
      return {
        logoSrc: 'cid:brand-logo@miudyojakhonarach',
        attachments: [
          {
            filename: 'logo.png',
            path: LOCAL_LOGO_PATH,
            cid: 'brand-logo@miudyojakhonarach',
          },
        ],
      };
    }
  } catch (err) {
    console.warn('[EmailService] Logo file check failed:', err.message);
  }

  const frontendUrl = (config.frontendUrl || 'https://miudyojakhonarach.com').replace(/\/+$/, '');
  return {
    logoSrc: `${frontendUrl}/assets/logo.png`,
    attachments: [],
  };
}

/**
 * Helper to escape HTML characters and prevent layout breaks / injection.
 */
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Format timestamp in readable Indian Standard Time.
 */
function formatIST(date = new Date()) {
  try {
    return (
      new Date(date).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }) + ' IST'
    );
  } catch {
    return new Date().toISOString();
  }
}

/**
 * Reusable master responsive email wrapper with executive branding and logo.
 */
function renderEmailShell({ logoSrc, badgeText, badgeColor = '#E27500', badgeBg = '#FFF7ED', headline, contentHtml }) {
  const frontendUrl = (config.frontendUrl || 'https://miudyojakhonarach.com').replace(/\/+$/, '');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Mi Udyojak Honarach</title>
  <style>
    body, table, td, p, a, li, blockquote {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }
    @media only screen and (max-width: 620px) {
      .email-container {
        width: 100% !important;
        margin: 0 auto !important;
      }
      .email-content {
        padding: 20px 16px !important;
      }
      .stack-column {
        display: block !important;
        width: 100% !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F1F5F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E293B; line-height: 1.6;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F1F5F9; padding: 24px 8px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="email-container" style="max-width: 600px; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);">
          
          <!-- Top Accent Stripe -->
          <tr>
            <td style="height: 5px; background: linear-gradient(90deg, #E27500 0%, #F59E0B 50%, #E27500 100%);"></td>
          </tr>

          <!-- Brand Header with Logo -->
          <tr>
            <td style="background-color: #0F172A; padding: 28px 24px 24px 24px; text-align: center;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    
                    <!-- Circular Brand Logo Badge -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto 14px auto;">
                      <tr>
                        <td align="center" style="background-color: #FFFFFF; width: 68px; height: 68px; border-radius: 50%; border: 2px solid #F59E0B; padding: 3px; box-shadow: 0 4px 12px rgba(0,0,0,0.35);">
                          <img 
                            src="${logoSrc}" 
                            alt="Mi Udyojak Honarach Logo" 
                            width="64" 
                            height="64" 
                            style="display: block; width: 64px; height: 64px; border-radius: 50%; object-fit: contain; margin: 0 auto;" 
                          />
                        </td>
                      </tr>
                    </table>

                    <div style="font-size: 22px; font-weight: 800; color: #FFFFFF; letter-spacing: 0.5px; line-height: 1.3;">
                      मी उद्योजक होणारच
                    </div>
                    <div style="font-size: 13px; font-weight: 600; color: #F59E0B; letter-spacing: 1.5px; text-transform: uppercase; margin-top: 4px;">
                      Mi Udyojak Honarach
                    </div>
                    <div style="font-size: 12px; color: #94A3B8; margin-top: 6px;">
                      Empowering Maharashtra's Grassroots Entrepreneurs
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Context Pill & Headline -->
          <tr>
            <td style="padding: 24px 28px 0 28px;">
              <div style="display: inline-block; background-color: ${badgeBg}; color: ${badgeColor}; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 5px 12px; border-radius: 20px; border: 1px solid ${badgeColor}33;">
                ${badgeText}
              </div>
              <h1 style="margin: 14px 0 0 0; font-size: 20px; font-weight: 700; color: #0F172A; line-height: 1.35;">
                ${headline}
              </h1>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td class="email-content" style="padding: 16px 28px 28px 28px; font-size: 14px; color: #334155;">
              ${contentHtml}

              <!-- Sign-off Block -->
              <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #E2E8F0;">
                <p style="margin: 0; font-size: 13px; color: #64748B;">Warm regards,</p>
                <p style="margin: 4px 0 0 0; font-size: 15px; font-weight: 700; color: #0F172A;">Team Mi Udyojak Honarach</p>
                
              </div>
            </td>
          </tr>

          <!-- Corporate Footer -->
          <tr>
            <td style="background-color: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 22px 28px; text-align: center;">
              <p style="margin: 0; font-size: 13px; color: #475569;">
                <a href="${frontendUrl}" style="color: #E27500; text-decoration: none; font-weight: 600;" target="_blank">
                  Visit Official Portal
                </a>
                &nbsp;&bull;&nbsp;
                <span style="color: #64748B;">Maharashtra, India</span>
              </p>
              <p style="margin: 10px 0 0 0; font-size: 11px; color: #94A3B8; line-height: 1.5;">
                This is an automated communication generated by the Mi Udyojak Honarach portal.<br />
                Please do not reply with confidential credentials or payment tokens.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Send admin notification email for a new general enquiry.
 * 
 * @param {Object} enquiry
 */
export async function sendEnquiryAdminEmail(enquiry) {
  const mailer = getTransporter();
  const { logoSrc, attachments } = getLogoConfig();

  const fullName = escapeHtml(enquiry.fullName);
  const email = escapeHtml(enquiry.email);
  const phone = escapeHtml(enquiry.phone);
  const city = escapeHtml(enquiry.city);
  const stage = escapeHtml(enquiry.stage || 'Not specified');
  const interest = escapeHtml(enquiry.interest || 'General Mentorship');
  const message = escapeHtml(enquiry.message || 'No additional message provided.');
  const submittedAt = formatIST(enquiry.createdAt);

  const subject = `[New Website Inquiry] ${enquiry.fullName} - ${enquiry.interest || 'General'}`;

  const contentHtml = `
    <p style="margin: 0 0 16px 0; font-size: 14px; color: #334155;">
      A new user inquiry has been submitted through the <strong>Mi Udyojak Honarach</strong> website form. Below are the submission details:
    </p>

    <!-- Key-Value Data Table -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; margin: 16px 0; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
      <tr style="background-color: #F8FAFC; border-bottom: 1px solid #E2E8F0;">
        <td style="padding: 10px 14px; width: 34%; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #64748B;">Applicant Name</td>
        <td style="padding: 10px 14px; font-size: 14px; font-weight: 600; color: #0F172A;">${fullName}</td>
      </tr>
      <tr style="border-bottom: 1px solid #E2E8F0;">
        <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #64748B;">Email Address</td>
        <td style="padding: 10px 14px; font-size: 14px; color: #0F172A;">
          <a href="mailto:${email}" style="color: #E27500; text-decoration: none;">${email}</a>
        </td>
      </tr>
      <tr style="background-color: #F8FAFC; border-bottom: 1px solid #E2E8F0;">
        <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #64748B;">Phone / Mobile</td>
        <td style="padding: 10px 14px; font-size: 14px; color: #0F172A;">
          <a href="tel:${phone}" style="color: #0F172A; text-decoration: none; font-weight: 600;">${phone}</a>
        </td>
      </tr>
      <tr style="border-bottom: 1px solid #E2E8F0;">
        <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #64748B;">City / District</td>
        <td style="padding: 10px 14px; font-size: 14px; color: #0F172A;">${city}</td>
      </tr>
      <tr style="background-color: #F8FAFC; border-bottom: 1px solid #E2E8F0;">
        <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #64748B;">Business Stage</td>
        <td style="padding: 10px 14px; font-size: 14px; color: #0F172A;">${stage}</td>
      </tr>
      <tr style="border-bottom: 1px solid #E2E8F0;">
        <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #64748B;">Area of Interest</td>
        <td style="padding: 10px 14px; font-size: 14px; color: #0F172A;">${interest}</td>
      </tr>
      <tr>
        <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #64748B;">Submitted At</td>
        <td style="padding: 10px 14px; font-size: 13px; color: #64748B;">${submittedAt}</td>
      </tr>
    </table>

    <!-- Message Callout -->
    <div style="margin: 20px 0 16px 0;">
      <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #475569; margin-bottom: 6px;">
        User Message / Details:
      </div>
      <div style="background-color: #F8FAFC; border-left: 4px solid #E27500; border-radius: 0 6px 6px 0; padding: 14px 16px; font-size: 13.5px; color: #334155; line-height: 1.6;">
        ${message}
      </div>
    </div>

    <!-- Quick Action Bar -->
    <div style="margin: 24px 0 10px 0; text-align: left;">
      <a href="mailto:${email}?subject=Regarding%20your%20inquiry%20-%20Mi%20Udyojak%20Honarach" style="display: inline-block; background-color: #E27500; color: #FFFFFF; text-decoration: none; font-size: 13px; font-weight: 600; padding: 10px 20px; border-radius: 6px; margin-right: 10px; margin-bottom: 8px;">
        Reply to Inquirer &rarr;
      </a>
      <a href="tel:${phone}" style="display: inline-block; background-color: #0F172A; color: #FFFFFF; text-decoration: none; font-size: 13px; font-weight: 600; padding: 10px 18px; border-radius: 6px; margin-bottom: 8px;">
        Call ${phone}
      </a>
    </div>
  `;

  const html = renderEmailShell({
    logoSrc,
    badgeText: 'New Website Inquiry',
    badgeColor: '#D97706',
    badgeBg: '#FEF3C7',
    headline: 'New Inquiry Notification',
    contentHtml,
  });

  return mailer.sendMail({
    from: config.emailFrom,
    to: config.adminEmail,
    subject,
    html,
    attachments,
  });
}

/**
 * Send acknowledgement email to the user for general enquiry.
 * 
 * @param {Object} enquiry
 */
export async function sendEnquiryUserEmail(enquiry) {
  const mailer = getTransporter();
  const { logoSrc, attachments } = getLogoConfig();

  const fullName = escapeHtml(enquiry.fullName);
  const interest = escapeHtml(enquiry.interest || 'Entrepreneurship & Mentorship');
  const city = escapeHtml(enquiry.city);
  const frontendUrl = (config.frontendUrl || 'https://miudyojakhonarach.com').replace(/\/+$/, '');

  const subject = `Inquiry Received: Thank you for connecting with Mi Udyojak Honarach`;

  const contentHtml = `
    <p style="margin: 0 0 14px 0; font-size: 16px; font-weight: 600; color: #0F172A;">
      नमस्कार ${fullName},
    </p>
    <p style="margin: 0 0 16px 0; font-size: 14px; color: #334155; line-height: 1.6;">
      Thank you for your interest in the <strong>Mi Udyojak Honarach (मी उद्योजक होणारच)</strong> movement. We have successfully logged your inquiry and our leadership team is reviewing your profile.
    </p>

    <!-- Highlight Box -->
    <div style="background-color: #FFF7ED; border: 1px solid #FED7AA; border-radius: 8px; padding: 16px; margin: 18px 0;">
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #9A3412;">
        Your Inquiry Focus
      </div>
      <div style="font-size: 15px; font-weight: 700; color: #7C2D12; margin-top: 4px;">
        ${interest}
      </div>
      <div style="font-size: 13px; color: #9A3412; margin-top: 4px;">
        Region: <strong>${city}</strong>
      </div>
    </div>

    <!-- What to Expect / Process Steps -->
    <div style="margin: 22px 0 16px 0;">
      <div style="font-size: 13px; font-weight: 700; color: #0F172A; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">
        What Happens Next?
      </div>

      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="width: 28px; vertical-align: top; padding-bottom: 12px;">
            <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #E27500; color: #FFFFFF; font-size: 12px; font-weight: 700; text-align: center; line-height: 22px;">1</div>
          </td>
          <td style="padding-left: 10px; vertical-align: top; padding-bottom: 12px;">
            <div style="font-size: 13.5px; font-weight: 600; color: #0F172A;">Review & Assessment</div>
            <div style="font-size: 12.5px; color: #64748B;">Our mentorship team will assess your business stage and requirements.</div>
          </td>
        </tr>
        <tr>
          <td style="width: 28px; vertical-align: top; padding-bottom: 12px;">
            <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #E27500; color: #FFFFFF; font-size: 12px; font-weight: 700; text-align: center; line-height: 22px;">2</div>
          </td>
          <td style="padding-left: 10px; vertical-align: top; padding-bottom: 12px;">
            <div style="font-size: 13.5px; font-weight: 600; color: #0F172A;">Personal Outreach</div>
            <div style="font-size: 12.5px; color: #64748B;">A district mentor or coordinator will reach out to you via phone or WhatsApp.</div>
          </td>
        </tr>
        <tr>
          <td style="width: 28px; vertical-align: top;">
            <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #E27500; color: #FFFFFF; font-size: 12px; font-weight: 700; text-align: center; line-height: 22px;">3</div>
          </td>
          <td style="padding-left: 10px; vertical-align: top;">
            <div style="font-size: 13.5px; font-weight: 600; color: #0F172A;">Action & Community Access</div>
            <div style="font-size: 12.5px; color: #64748B;">You will be guided towards programs, masterclasses, and local networking forums.</div>
          </td>
        </tr>
      </table>
    </div>

    <!-- CTA Button -->
    <div style="margin: 24px 0 8px 0; text-align: center;">
      <a href="${frontendUrl}" style="display: inline-block; background-color: #E27500; color: #FFFFFF; text-decoration: none; font-size: 14px; font-weight: 600; padding: 12px 28px; border-radius: 6px;" target="_blank">
        Explore Our Initiatives &rarr;
      </a>
    </div>
  `;

  const html = renderEmailShell({
    logoSrc,
    badgeText: 'Acknowledgment',
    badgeColor: '#059669',
    badgeBg: '#ECFDF5',
    headline: 'Thank You for Reaching Out',
    contentHtml,
  });

  return mailer.sendMail({
    from: config.emailFrom,
    to: enquiry.email,
    subject,
    html,
    attachments,
  });
}

/**
 * Send admin notification email for a new event registration request.
 * 
 * @param {Object} registration
 */
export async function sendEventAdminEmail(registration) {
  const mailer = getTransporter();
  const { logoSrc, attachments } = getLogoConfig();

  const fullName = escapeHtml(registration.fullName);
  const email = escapeHtml(registration.email);
  const phone = escapeHtml(registration.phone);
  const businessName = escapeHtml(registration.businessName || 'Not specified');
  const netWorth = escapeHtml(registration.netWorth || 'Not specified');
  const cityDistrict = escapeHtml(registration.cityDistrict);
  const eventTitle = escapeHtml(registration.eventTitle);
  const eventId = escapeHtml(registration.eventId);
  const message = escapeHtml(registration.message || 'No additional note provided.');
  const registeredAt = formatIST(registration.createdAt);

  const subject = `[Registration Request - Pending Review] ${registration.fullName} for ${registration.eventTitle}`;

  const contentHtml = `
    <p style="margin: 0 0 16px 0; font-size: 14px; color: #334155;">
      A participant has submitted a <strong>registration request</strong> for an upcoming event. This application is currently <strong>awaiting admin approval</strong>:
    </p>

    <!-- Event Banner Box -->
    <div style="background-color: #0F172A; border-radius: 8px; padding: 16px; margin: 0 0 18px 0; color: #FFFFFF;">
      <div style="font-size: 11px; font-weight: 700; color: #F59E0B; text-transform: uppercase; letter-spacing: 1px;">
        Requested Event (Awaiting Decision)
      </div>
      <div style="font-size: 16px; font-weight: 700; color: #FFFFFF; margin-top: 4px;">
        ${eventTitle}
      </div>
      <div style="font-size: 12px; color: #94A3B8; margin-top: 4px;">
        Event ID: <span style="color: #CBD5E1; font-family: monospace;">${eventId}</span>
      </div>
    </div>

    <!-- Attendee Data Table -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; margin: 16px 0; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
      <tr style="background-color: #F8FAFC; border-bottom: 1px solid #E2E8F0;">
        <td style="padding: 10px 14px; width: 34%; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #64748B;">Applicant Name</td>
        <td style="padding: 10px 14px; font-size: 14px; font-weight: 600; color: #0F172A;">${fullName}</td>
      </tr>
      <tr style="border-bottom: 1px solid #E2E8F0;">
        <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #64748B;">Email Address</td>
        <td style="padding: 10px 14px; font-size: 14px; color: #0F172A;">
          <a href="mailto:${email}" style="color: #E27500; text-decoration: none;">${email}</a>
        </td>
      </tr>
      <tr style="background-color: #F8FAFC; border-bottom: 1px solid #E2E8F0;">
        <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #64748B;">Mobile Number</td>
        <td style="padding: 10px 14px; font-size: 14px; color: #0F172A;">
          <a href="tel:${phone}" style="color: #0F172A; text-decoration: none; font-weight: 600;">${phone}</a>
        </td>
      </tr>
      <tr style="border-bottom: 1px solid #E2E8F0;">
        <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #64748B;">Business / Venture</td>
        <td style="padding: 10px 14px; font-size: 14px; color: #0F172A;">${businessName}</td>
      </tr>
      <tr style="background-color: #F8FAFC; border-bottom: 1px solid #E2E8F0;">
        <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #64748B;">Turnover / Net Worth</td>
        <td style="padding: 10px 14px; font-size: 14px; font-weight: 700; color: #E27500;">${netWorth}</td>
      </tr>
      <tr style="border-bottom: 1px solid #E2E8F0;">
        <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #64748B;">City / District</td>
        <td style="padding: 10px 14px; font-size: 14px; color: #0F172A;">${cityDistrict}</td>
      </tr>
      <tr style="background-color: #F8FAFC; border-bottom: 1px solid #E2E8F0;">
        <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #64748B;">Application Status</td>
        <td style="padding: 10px 14px; font-size: 13px; font-weight: 700; color: #D97706;">Pending Review / Approval</td>
      </tr>
      <tr>
        <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #64748B;">Submitted At</td>
        <td style="padding: 10px 14px; font-size: 13px; color: #64748B;">${registeredAt}</td>
      </tr>
    </table>

    <!-- Participant Notes -->
    <div style="margin: 20px 0 16px 0;">
      <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #475569; margin-bottom: 6px;">
        Business Profile & Reason for Joining (Screening Criteria):
      </div>
      <div style="background-color: #F8FAFC; border-left: 4px solid #E27500; border-radius: 0 6px 6px 0; padding: 14px 16px; font-size: 13.5px; color: #334155; line-height: 1.6;">
        ${message}
      </div>
    </div>

    <!-- Quick Action Bar -->
    <div style="margin: 24px 0 10px 0; text-align: left;">
      <a href="mailto:${email}?subject=Regarding%20your%20registration%20request%20-%20${encodeURIComponent(registration.eventTitle)}" style="display: inline-block; background-color: #E27500; color: #FFFFFF; text-decoration: none; font-size: 13px; font-weight: 600; padding: 10px 20px; border-radius: 6px; margin-right: 10px; margin-bottom: 8px;">
        Review & Reply via Email &rarr;
      </a>
      <a href="tel:${phone}" style="display: inline-block; background-color: #0F172A; color: #FFFFFF; text-decoration: none; font-size: 13px; font-weight: 600; padding: 10px 18px; border-radius: 6px; margin-bottom: 8px;">
        Call ${phone}
      </a>
    </div>
  `;

  const html = renderEmailShell({
    logoSrc,
    badgeText: 'Pending Approval',
    badgeColor: '#D97706',
    badgeBg: '#FEF3C7',
    headline: 'New Event Registration Request',
    contentHtml,
  });

  return mailer.sendMail({
    from: config.emailFrom,
    to: config.adminEmail,
    subject,
    html,
    attachments,
  });
}

/**
 * Send participant notification email acknowledging event registration request.
 * 
 * @param {Object} registration
 */
export async function sendEventUserEmail(registration) {
  const mailer = getTransporter();
  const { logoSrc, attachments } = getLogoConfig();

  const fullName = escapeHtml(registration.fullName);
  const eventTitle = escapeHtml(registration.eventTitle);
  const cityDistrict = escapeHtml(registration.cityDistrict);
  const frontendUrl = (config.frontendUrl || 'https://miudyojakhonarach.com').replace(/\/+$/, '');

  const subject = `Registration Request Received: ${registration.eventTitle} | Mi Udyojak Honarach`;

  const contentHtml = `
    <p style="margin: 0 0 14px 0; font-size: 16px; font-weight: 600; color: #0F172A;">
      Dear ${fullName},
    </p>
    <p style="margin: 0 0 16px 0; font-size: 14px; color: #334155; line-height: 1.6;">
      Thank you for expressing your interest and submitting a registration request for <strong>${eventTitle}</strong>.
    </p>

    <!-- Event Request Card -->
    <div style="background-color: #FFF7ED; border: 1px solid #FFEDD5; border-radius: 8px; padding: 18px; margin: 18px 0;">
      <div style="display: inline-block; background-color: #D97706; color: #FFFFFF; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; padding: 3px 10px; border-radius: 12px; margin-bottom: 8px;">
        Application Under Review
      </div>
      <h3 style="margin: 0; color: #9A3412; font-size: 17px; font-weight: 700; line-height: 1.35;">
        ${eventTitle}
      </h3>
      <p style="margin: 8px 0 0 0; color: #7C2D12; font-size: 13.5px;">
        📍 <strong>Region / Location:</strong> ${cityDistrict}
      </p>
    </div>

    <!-- Review & Approval Notice Box -->
    <div style="background-color: #EFF6FF; border-left: 4px solid #2563EB; border-radius: 0 8px 8px 0; padding: 14px 18px; margin: 20px 0; font-size: 13.5px; color: #1E40AF; line-height: 1.6;">
      <strong>Please Note:</strong> Your registration request has been forwarded to the organizing committee. 
      Because seats are curated and limited, applications are reviewed individually. 
      <br /><br />
      <strong>If approved, you will receive an official approval confirmation email containing your entry pass, venue schedule, and reporting details.</strong>
    </div>

    <!-- Next Steps Checklist -->
    <div style="margin: 22px 0 16px 0;">
      <div style="font-size: 13px; font-weight: 700; color: #0F172A; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">
        What to Expect
      </div>

      <ul style="margin: 0; padding-left: 20px; font-size: 13.5px; color: #475569; line-height: 1.7;">
        <li><strong>Admin Review:</strong> The committee reviews applicant profiles for sectoral representation.</li>
        <li><strong>Decision Email:</strong> If approved, your entry confirmation will be sent directly to this email address.</li>
        <li><strong>Schedule & Access:</strong> The complete agenda and keynote timeline will be enclosed with your pass.</li>
      </ul>
    </div>

    <p style="margin: 18px 0 0 0; font-size: 13.5px; color: #64748B;">
      If you have questions regarding your application, simply reply directly to this email.
    </p>

    <!-- CTA Button -->
    <div style="margin: 26px 0 8px 0; text-align: center;">
      <a href="${frontendUrl}" style="display: inline-block; background-color: #E27500; color: #FFFFFF; text-decoration: none; font-size: 14px; font-weight: 600; padding: 12px 28px; border-radius: 6px;" target="_blank">
        Visit Official Website &rarr;
      </a>
    </div>
  `;

  const html = renderEmailShell({
    logoSrc,
    badgeText: 'Application Under Review',
    badgeColor: '#D97706',
    badgeBg: '#FEF3C7',
    headline: 'Registration Request Received',
    contentHtml,
  });

  return mailer.sendMail({
    from: config.emailFrom,
    to: registration.email,
    subject,
    html,
    attachments,
  });
}

export default {
  sendEnquiryAdminEmail,
  sendEnquiryUserEmail,
  sendEventAdminEmail,
  sendEventUserEmail,
};

