import { NextResponse } from 'next/server';
import { auth } from '../../../auth';
import { supabaseAdmin } from '../../../lib/supabase';
import { Resend } from 'resend';
import { bookingCancellationEmail } from '../../../lib/emails/booking-cancellation';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { bookingId } = await request.json();

    // Get booking details before cancelling
    const { data: booking } = await supabaseAdmin
      .from('bookings')
      .select(
        `
        *,
        client:client_id (
          name,
          email
        ),
        staff:staff_id (
          users:user_id (
            name
          )
        ),
        service:service_id (
          name
        )
      `
      )
      .eq('id', bookingId)
      .single();

    // Check authorization
    const isAdmin = session.user.role === 'admin';
    const isOwner = booking.client_id === session.user.id;

    if (!isAdmin && !isOwner) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Update booking status
    const { error } = await supabaseAdmin
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', bookingId);

    if (error) throw error;

    // Send cancellation email
    try {
      const startTime = new Date(booking.start_time);

      const emailContent = bookingCancellationEmail({
        customerName: booking.client.name,
        staffName: booking.staff.users.name,
        serviceName: booking.service.name,
        date: startTime.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        time: startTime.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
      });

      await resend.emails.send({
        from: 'LockIn <onboarding@resend.dev>',
        to: booking.client.email,
        subject: emailContent.subject,
        html: emailContent.html,
      });

      console.log('✅ Cancellation email sent to:', booking.client.email);
    } catch (emailError) {
      console.error('❌ Error sending cancellation email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/*import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request) {
  try {
    const session = await auth();

    console.log('Cancel request - Session:', session?.user);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const { bookingId } = await request.json();
    console.log('Attempting to cancel booking:', bookingId);

    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID required' },
        { status: 400 }
      );
    }

    // Update booking status
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .select(
        `
        *,
        client:client_id (
          name,
          email
        ),
        staff:staff_id (
          users:user_id (
            name
          )
        ),
        service:service_id (
          name
        )
      `
      )
      .eq('id', bookingId)
      .single();
    // .update({ status: 'cancelled' });

    console.log('Update result:', { data, error });

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    // TODO: Send cancellation email to client

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json(
      { error: error.message || 'Uknown error', details: error },
      { status: 500 }
    );
  }
}
*/
