export function bookingCancellationEmail({
  customerName,
  staffName,
  serviceName,
  date,
  time,
}) {
  return {
    subject: `❌ Appointment Cancelled - ${serviceName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #f87171 0%, #dc2626 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Appointment Cancelled</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; margin-bottom: 20px;">Hi ${customerName},</p>
            
            <p style="font-size: 16px; margin-bottom: 30px;">
              Your appointment has been cancelled as requested.
            </p>
            
            <div style="background: white; border-left: 4px solid #ef4444; padding: 20px; margin-bottom: 30px; border-radius: 5px;">
              <h2 style="margin-top: 0; color: #ef4444; font-size: 20px;">Cancelled Appointment</h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #666;">Service:</td>
                  <td style="padding: 10px 0;">${serviceName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #666;">Hairdresser:</td>
                  <td style="padding: 10px 0;">${staffName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #666;">Date:</td>
                  <td style="padding: 10px 0;">${date}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #666;">Time:</td>
                  <td style="padding: 10px 0;">${time}</td>
                </tr>
              </table>
            </div>
            
            <div style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; margin-bottom: 30px; border-radius: 5px;">
              <p style="margin: 0; font-size: 14px; color: #1e40af;">
                <strong>💙 We hope to see you again soon!</strong> Feel free to book another appointment whenever you're ready.
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="${
                process.env.AUTH_URL
              }/booking" style="display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Book New Appointment
              </a>
            </div>
            
            <p style="font-size: 16px; color: #666; margin-top: 30px;">
              Best regards,<br>
              <strong style="color: #667eea;">LockIn Team</strong>
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
            <p>© ${new Date().getFullYear()} LockIn. All rights reserved.</p>
          </div>
        </body>
      </html>
    `,
  };
}
