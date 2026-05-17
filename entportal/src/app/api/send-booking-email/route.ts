import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = 'drkrishnakoirala@gmail.com';
const FROM_EMAIL = 'onboarding@resend.dev';
const CLINIC_NAME = 'Dr. Krishna Koirala ENT Care';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, phone, email, preferredDate, preferredTime, reason, message } = body;

    const formattedDate = preferredDate
      ? new Date(preferredDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      : preferredDate;

    // Patient confirmation email
    if (email) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `Appointment Request Confirmed – ${CLINIC_NAME}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
          <body style="margin:0;padding:0;background:#f4f7fb;font-family:'Segoe UI',Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:32px 0;">
              <tr><td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:600px;width:100%;">
                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#1a6b8a 0%,#0d4f6b 100%);padding:36px 40px;text-align:center;">
                      <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;letter-spacing:-0.5px;">Dr. Krishna Koirala</h1>
                      <p style="color:#a8d8ea;margin:6px 0 0;font-size:14px;">MBBS, MS (ENT-HNS) · ENT Specialist</p>
                    </td>
                  </tr>
                  <!-- Success Banner -->
                  <tr>
                    <td style="background:#e8f5e9;padding:20px 40px;text-align:center;border-bottom:1px solid #c8e6c9;">
                      <p style="margin:0;color:#2e7d32;font-size:16px;font-weight:600;">✅ Appointment Request Received!</p>
                    </td>
                  </tr>
                  <!-- Body -->
                  <tr>
                    <td style="padding:36px 40px;">
                      <p style="color:#374151;font-size:16px;margin:0 0 24px;">Dear <strong>${fullName}</strong>,</p>
                      <p style="color:#6b7280;font-size:15px;line-height:1.6;margin:0 0 28px;">
                        Thank you for requesting an appointment at our clinic. We have received your request and our team will confirm your appointment within <strong>2 hours</strong> via phone or email.
                      </p>
                      <!-- Appointment Details Card -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;margin-bottom:28px;">
                        <tr><td style="background:#1a6b8a;padding:14px 20px;">
                          <p style="margin:0;color:#ffffff;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Appointment Details</p>
                        </td></tr>
                        <tr><td style="padding:20px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">
                                <span style="color:#6b7280;font-size:13px;display:block;">Patient Name</span>
                                <span style="color:#111827;font-size:15px;font-weight:600;">${fullName}</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">
                                <span style="color:#6b7280;font-size:13px;display:block;">Phone</span>
                                <span style="color:#111827;font-size:15px;font-weight:600;">${phone}</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">
                                <span style="color:#6b7280;font-size:13px;display:block;">Preferred Date</span>
                                <span style="color:#111827;font-size:15px;font-weight:600;">${formattedDate}</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">
                                <span style="color:#6b7280;font-size:13px;display:block;">Preferred Time</span>
                                <span style="color:#111827;font-size:15px;font-weight:600;">${preferredTime}</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding:8px 0;">
                                <span style="color:#6b7280;font-size:13px;display:block;">Reason for Visit</span>
                                <span style="color:#111827;font-size:15px;font-weight:600;">${reason}</span>
                              </td>
                            </tr>
                            ${message ? `<tr><td style="padding:8px 0;border-top:1px solid #e2e8f0;"><span style="color:#6b7280;font-size:13px;display:block;">Additional Notes</span><span style="color:#111827;font-size:15px;">${message}</span></td></tr>` : ''}
                          </table>
                        </td></tr>
                      </table>
                      <!-- Next Steps -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;margin-bottom:28px;">
                        <tr><td style="padding:20px;">
                          <p style="margin:0 0 12px;color:#1e40af;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Next Steps</p>
                          <p style="margin:0 0 8px;color:#374151;font-size:14px;">📞 <strong>Await confirmation call</strong> — our team will call you within 2 hours to confirm the appointment.</p>
                          <p style="margin:0 0 8px;color:#374151;font-size:14px;">📋 <strong>Prepare your documents</strong> — bring any previous medical reports, prescriptions, or test results.</p>
                          <p style="margin:0;color:#374151;font-size:14px;">🏥 <strong>Arrive 10 minutes early</strong> — to complete registration at the clinic.</p>
                        </td></tr>
                      </table>
                      <!-- Clinic Info -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:12px;margin-bottom:28px;">
                        <tr><td style="padding:20px;">
                          <p style="margin:0 0 10px;color:#374151;font-size:14px;font-weight:600;">📍 Clinic Location</p>
                          <p style="margin:0 0 6px;color:#6b7280;font-size:14px;">Nayabazar ENT Care Center / Shree Krishna ENT Care</p>
                          <p style="margin:0 0 6px;color:#6b7280;font-size:14px;">Nayabazar, Pokhara, Nepal</p>
                          <p style="margin:0 0 6px;color:#6b7280;font-size:14px;">📞 061-553150 | 985-6034347 | 9846166733</p>
                          <p style="margin:0;color:#6b7280;font-size:14px;">🕐 Mon–Sat: 9:00 AM – 1:00 PM & 5:00 PM – 8:00 PM</p>
                        </td></tr>
                      </table>
                      <p style="color:#6b7280;font-size:13px;line-height:1.6;margin:0;">
                        If you need to reschedule or have any questions, please call us directly at <strong>061-553150</strong>.
                      </p>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
                      <p style="margin:0;color:#9ca3af;font-size:12px;">© 2024 Dr. Krishna Koirala ENT Care · Nayabazar, Pokhara, Nepal</p>
                      <p style="margin:4px 0 0;color:#9ca3af;font-size:11px;">This email was sent because you submitted an appointment request on our website.</p>
                    </td>
                  </tr>
                </table>
              </td></tr>
            </table>
          </body>
          </html>
        `,
      });
    }

    // Admin notification email
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `🔔 New Appointment Request – ${fullName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="margin:0;padding:0;background:#f4f7fb;font-family:'Segoe UI',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:32px 0;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:600px;width:100%;">
                <tr>
                  <td style="background:linear-gradient(135deg,#1a6b8a 0%,#0d4f6b 100%);padding:28px 40px;">
                    <h1 style="color:#ffffff;margin:0;font-size:20px;font-weight:700;">New Appointment Request</h1>
                    <p style="color:#a8d8ea;margin:4px 0 0;font-size:13px;">ENTPortal Admin Notification</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:32px 40px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
                      <tr><td style="background:#1a6b8a;padding:12px 20px;">
                        <p style="margin:0;color:#ffffff;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Patient Information</p>
                      </td></tr>
                      <tr><td style="padding:20px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr><td style="padding:7px 0;border-bottom:1px solid #e2e8f0;"><span style="color:#6b7280;font-size:13px;">Name: </span><strong style="color:#111827;font-size:14px;">${fullName}</strong></td></tr>
                          <tr><td style="padding:7px 0;border-bottom:1px solid #e2e8f0;"><span style="color:#6b7280;font-size:13px;">Phone: </span><strong style="color:#111827;font-size:14px;">${phone}</strong></td></tr>
                          <tr><td style="padding:7px 0;border-bottom:1px solid #e2e8f0;"><span style="color:#6b7280;font-size:13px;">Email: </span><strong style="color:#111827;font-size:14px;">${email || 'Not provided'}</strong></td></tr>
                          <tr><td style="padding:7px 0;border-bottom:1px solid #e2e8f0;"><span style="color:#6b7280;font-size:13px;">Preferred Date: </span><strong style="color:#111827;font-size:14px;">${formattedDate}</strong></td></tr>
                          <tr><td style="padding:7px 0;border-bottom:1px solid #e2e8f0;"><span style="color:#6b7280;font-size:13px;">Preferred Time: </span><strong style="color:#111827;font-size:14px;">${preferredTime}</strong></td></tr>
                          <tr><td style="padding:7px 0;border-bottom:1px solid #e2e8f0;"><span style="color:#6b7280;font-size:13px;">Reason: </span><strong style="color:#111827;font-size:14px;">${reason}</strong></td></tr>
                          ${message ? `<tr><td style="padding:7px 0;"><span style="color:#6b7280;font-size:13px;">Notes: </span><span style="color:#111827;font-size:14px;">${message}</span></td></tr>` : ''}
                        </table>
                      </td></tr>
                    </table>
                    <div style="margin-top:24px;padding:16px;background:#fef3c7;border:1px solid #fde68a;border-radius:10px;">
                      <p style="margin:0;color:#92400e;font-size:14px;">⚡ Please confirm this appointment within <strong>2 hours</strong> by calling the patient at <strong>${phone}</strong>.</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="background:#f8fafc;padding:16px 40px;text-align:center;border-top:1px solid #e2e8f0;">
                    <p style="margin:0;color:#9ca3af;font-size:12px;">ENTPortal Admin · Automated Notification</p>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
