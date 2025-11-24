import { NextResponse } from 'next/server';
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
      .update({ status: 'cancelled' })
      .eq('id', bookingId)
      .select();

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
