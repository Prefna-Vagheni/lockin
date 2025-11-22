'use server';

import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function createStaffAction(formData) {
  const supabase = createServerClient({ cookies });

  const email = formData.get('email');
  const name = formData.get('name');
  const bio = formData.get('bio');
  const specialties = formData
    .get('specialties')
    ?.split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const hourlyRate = parseFloat(formData.get('hourlyRate'));
  const photo = formData.get('photo');

  // 1. get or create user
  const { data: existing } = await supabase
    .from('booking.users')
    .select('id')
    .eq('email', email)
    .single();

  let userId = existing?.id;

  if (!userId) {
    const { data: newUser, error } = await supabase
      .from('booking.users')
      .insert({ email, name, role: 'staff' })
      .select()
      .single();

    if (error) throw error;
    userId = newUser.id;
  }

  // 2. Photo upload
  let photoUrl = null;

  if (photo && typeof photo !== 'string') {
    const ext = photo.name.split('.').pop();
    const filename = `${userId}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('staff-photos')
      .upload(filename, photo);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('staff-photos')
      .getPublicUrl(filename);

    photoUrl = data.publicUrl;
  }

  // 3. Create staff record
  const { error: staffErr } = await supabase.from('booking.staff').insert({
    user_id: userId,
    bio,
    specialties,
    hourly_rate: hourlyRate,
    photo_url: photoUrl,
    is_active: true,
  });

  if (staffErr) throw staffErr;

  return { success: true };
}
