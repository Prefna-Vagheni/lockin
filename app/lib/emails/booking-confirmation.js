export function bookingConfirmationEmail({
  customerName,
  staffName,
  serviceName,
  date,
  time,
  duration,
  price,
}) {
  return {
    subject: `✅ Booking Confirmed - ${serviceName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Booking Confirmed!</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; margin-bottom: 20px;">Hi ${customerName},</p>
            
            <p style="font-size: 16px; margin-bottom: 30px;">
              Great news! Your appointment has been confirmed. We can't wait to see you!
            </p>
            
            <div style="background: white; border-left: 4px solid #667eea; padding: 20px; margin-bottom: 30px; border-radius: 5px;">
              <h2 style="margin-top: 0; color: #667eea; font-size: 20px;">Appointment Details</h2>
              
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
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #666;">Duration:</td>
                  <td style="padding: 10px 0;">${duration} minutes</td>
                </tr>
                <tr style="border-top: 2px solid #e5e7eb;">
                  <td style="padding: 15px 0; font-weight: bold; color: #666;">Total Paid:</td>
                  <td style="padding: 15px 0; font-size: 24px; font-weight: bold; color: #10b981;">$${price}</td>
                </tr>
              </table>
            </div>
            
            <div style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; margin-bottom: 30px; border-radius: 5px;">
              <p style="margin: 0; font-size: 14px; color: #1e40af;">
                <strong>📍 Important:</strong> Please arrive 5 minutes early. If you need to cancel or reschedule, please do so at least 24 hours in advance.
              </p>
            </div>
            
            <p style="font-size: 16px; color: #666; margin-bottom: 10px;">
              Looking forward to seeing you!
            </p>
            
            <p style="font-size: 16px; color: #666; margin: 0;">
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
