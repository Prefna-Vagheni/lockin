import {
  AlarmCheck,
  Calendar1,
  CalendarCheck,
  CreditCard,
  Repeat,
  Scissors,
} from 'lucide-react';

const cards = [
  {
    icon: Scissors,
    title: 'Expert Haidressers',
    color: 'rose',
    description:
      'Choose from our talented professionals, each with their own specialties and styles',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    color: 'amber',
    description:
      'Pay safely with Stripe. Your booking is confirmed only after successful payment',
  },
  {
    icon: Calendar1,
    title: 'Easy Scheduling',
    color: 'emerald',
    description:
      'See real-time availability and book your perfect time slot in seconds',
  },
  {
    icon: CalendarCheck,
    title: 'Instant Confirmation',
    color: 'blue',
    description:
      'Get immediate email confirmation with all your appointment details',
  },
  {
    icon: Repeat,
    title: 'Flexible Management',
    color: 'yellow',
    description:
      'Reschedule or cancel your appointments easily from your dashboard',
  },
  {
    icon: AlarmCheck,
    title: 'No Show-Up Fees',
    color: 'orange',
    description:
      'Payment required upfront ensures no wasted time for you or our stylists',
  },
];

function FeatureCard() {
  return (
    <>
      {cards.map((card, index) => {
        const Icon = card.icon;
        const color = card.color;

        return (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition border dark:border-gray-700"
          >
            <div
              className={`w-14 h-14 bg-${color}-100 rounded-full flex items-center justify-center mb-6`}
            >
              <Icon className={`w-7 h-7 text-${color}-600`} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {card.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 ">
              {card.description}
            </p>
          </div>
        );
      })}
    </>
  );
}

export default FeatureCard;
