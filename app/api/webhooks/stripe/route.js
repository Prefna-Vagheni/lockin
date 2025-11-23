import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  try {
    const body = await request.text();
    const signature = headers().get('stripe-signature');

    let event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      // Extract booking data from metadata
      const { staffId, serviceId, serviceDuration, date, time, userId } =
        session.metadata;

      // Calculate start and end times
      const startDateTime = new Date(`${date}T${time}:00`);
      const endDateTime = new Date(startDateTime);
      endDateTime.setMinutes(
        endDateTime.getMinutes() + parseInt(serviceDuration)
      );

      // Create booking in database
      const { error: bookingError } = await supabaseAdmin
        .from('bookings')
        .insert({
          client_id: userId,
          staff_id: staffId,
          service_id: serviceId,
          start_time: startDateTime.toISOString(),
          end_time: endDateTime.toISOString(),
          status: 'confirmed',
          total_price: session.amount_total / 100, // Convert from cents
          payment_intent_id: session.payment_intent,
        });

      if (bookingError) {
        console.error('Error creating booking:', bookingError);
        return NextResponse.json(
          { error: 'Failed to create booking' },
          { status: 500 }
        );
      }

      console.log('✅ Booking created successfully');
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
