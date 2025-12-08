import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from '../../auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      staffId,
      staffName,
      serviceId,
      serviceName,
      servicePrice,
      serviceDuration,
      date,
      time,
      userId,
    } = body;

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: serviceName,
              description: `Appointment with ${staffName} on ${date} at ${time}`,
            },
            unit_amount: Math.round(parseFloat(servicePrice) * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.AUTH_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.AUTH_URL}/booking/${staffId}`,
      metadata: {
        staffId,
        staffName,
        serviceId,
        serviceName,
        serviceDuration,
        date,
        time,
        userId,
      },
      customer_email: session.user.email,
    });

    return NextResponse.json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
