'use server';

import { supabaseAdmin } from '../lib/supabase';
import { revalidatePath } from 'next/cache';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function rescheduleBooking(
  bookingId,
  newDate,
  newTime,
  serviceDuration
) {
  try {
    // Calculate new start and end times
    const startTime = new Date(`${newDate}T${newTime}:00`);
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + parseInt(serviceDuration));

    // Get booking details for email
    const { data: booking } = await supabaseAdmin
      .from('bookings')
      .select(
        `
        *,
        client:client_id (name, email),
        staff:staff_id (users:user_id (name)),
        service:service_id (name)
      `
      )
      .eq('id', bookingId)
      .single();

    // Update booking
    const { error } = await supabaseAdmin
      .from('bookings')
      .update({
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
      })
      .eq('id', bookingId);

    if (error) throw error;

    // Send reschedule email
    try {
      await resend.emails.send({
        from: 'LockIn <onboarding@resend.dev>',
        to: booking.client.email,
        subject: `📅 Appointment Rescheduled - ${booking.service.name}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0;">📅 Appointment Rescheduled</h1>
              </div>
              
              <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
                <p style="font-size: 18px;">Hi ${booking.client.name},</p>
                
                <p style="font-size: 16px;">Your appointment has been successfully rescheduled!</p>
                
                <div style="background: white; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 5px;">
                  <h2 style="margin-top: 0; color: #667eea;">New Appointment Details</h2>
                  <table style="width: 100%;">
                    <tr>
                      <td style="padding: 10px 0; font-weight: bold; color: #666;">Service:</td>
                      <td>${booking.service.name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0; font-weight: bold; color: #666;">Hairdresser:</td>
                      <td>${booking.staff.users.name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0; font-weight: bold; color: #666;">New Date:</td>
                      <td>${startTime.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0; font-weight: bold; color: #666;">New Time:</td>
                      <td>${startTime.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      })}</td>
                    </tr>
                  </table>
                </div>
                
                <p style="color: #666;">See you soon!</p>
                <p style="color: #666;"><strong style="color: #667eea;">LockIn Team</strong></p>
              </div>
            </body>
          </html>
        `,
      });
    } catch (emailError) {
      console.error('Error sending reschedule email:', emailError);
    }

    revalidatePath('/my-bookings');
    revalidatePath('/admin/bookings');
    return { success: true };
  } catch (error) {
    console.error('Error rescheduling booking:', error);
    return { success: false, error: error.message };
  }
}
