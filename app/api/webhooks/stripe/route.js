import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '../../../lib/supabase';
import { Resend } from 'resend';
import { bookingConfirmationEmail } from '../../../lib/emails/booking-confirmation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    let event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      const {
        staffId,
        staffName,
        serviceId,
        serviceName,
        serviceDuration,
        date,
        time,
        userId,
      } = session.metadata;

      // Calculate start and end times
      const startTime = new Date(`${date}T${time}:00`);
      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + parseInt(serviceDuration));

      // Create booking in database
      const { data: booking, error: bookingError } = await supabaseAdmin
        .from('bookings')
        .insert({
          client_id: userId,
          staff_id: staffId,
          service_id: serviceId,
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString(),
          status: 'confirmed',
          total_price: session.amount_total / 100,
          payment_intent_id: session.payment_intent,
        })
        .select()
        .single();

      if (bookingError) {
        console.error('Error creating booking');
        return NextResponse.json(
          { error: 'Failed to create booking' },
          { status: 500 }
        );
      }

      console.log('✅ Booking created');

      // Get customer info
      const { data: customer } = await supabaseAdmin
        .from('users')
        .select('name, email')
        .eq('id', userId)
        .single();

      // Send confirmation email
      try {
        const emailContent = bookingConfirmationEmail({
          customerName: customer.name,
          staffName,
          serviceName,
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
          duration: serviceDuration,
          price: (session.amount_total / 100).toFixed(2),
        });

        await resend.emails.send({
          from: 'LockIn <onboarding@resend.dev>', // Here wecneed to use our  verified domain in production
          to: customer.email,
          subject: emailContent.subject,
          html: emailContent.html,
        });

        console.log(`✅ Confirmation email sent to: ${customer.email}`);
      } catch (emailError) {
        console.error('❌ Error sending email:');
        // Don't fail the webhook if email fails
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(`Webhook error: ${error}`);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/*import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      console.error('❌ No stripe-signature header found');
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    if (!webhookSecret) {
      console.error('❌ STRIPE_WEBHOOK_SECRET not set');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log('✅ Webhook signature verified:', event.type);
    } catch (err) {
      console.error('❌ Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      console.log('📦 Session metadata:', session.metadata);

      // Extract booking data from metadata
      const { staffId, serviceId, serviceDuration, date, time, userId } =
        session.metadata;

      // Validate required fields
      if (!staffId || !serviceId || !userId || !date || !time) {
        console.error('❌ Missing required metadata:', session.metadata);
        return NextResponse.json(
          { error: 'Missing required booking data' },
          { status: 400 }
        );
      }

      // Calculate start and end times
      const startDateTime = new Date(`${date}T${time}:00`);
      const endDateTime = new Date(startDateTime);
      endDateTime.setMinutes(
        endDateTime.getMinutes() + parseInt(serviceDuration)
      );

      console.log('📅 Booking times:', {
        start: startDateTime.toISOString(),
        end: endDateTime.toISOString(),
      });

      // Create booking in database
      const bookingData = {
        client_id: userId,
        staff_id: staffId,
        service_id: serviceId,
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString(),
        status: 'confirmed',
        total_price: session.amount_total / 100, // Convert from cents
        payment_intent_id: session.payment_intent,
      };

      console.log('💾 Inserting booking:', bookingData);

      const { data: booking, error: bookingError } = await supabaseAdmin
        .from('bookings')
        .insert(bookingData)
        .select()
        .single();

      if (bookingError) {
        console.error('❌ Error creating booking:', bookingError);
        return NextResponse.json(
          { error: 'Failed to create booking', details: bookingError },
          { status: 500 }
        );
      }

      console.log('✅ Booking created successfully:', booking.id);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('❌ Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed', details: error.message },
      { status: 500 }
    );
  }
}
*/
