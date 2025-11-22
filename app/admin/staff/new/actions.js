'use server';

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

function supabaseServer() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies }
  );
}

export async function createStaffAction(formData) {
  const supabase = supabaseServer();

  try {
    const email = formData.get('email');
    const name = formData.get('name');
    const bio = formData.get('bio');
    const specialties =
      formData
        .get('specialties')
        ?.split(',')
        .map((s) => s.trim())
        .filter(Boolean) ?? [];

    const hourlyRate = parseFloat(formData.get('hourlyRate'));
    const photo = formData.get('photo');

    // 1️⃣ Check if user exists
    const { data: existingUser } = await supabase
      .from('booking.users')
      .select('id')
      .eq('email', email)
      .single();

    let userId = existingUser?.id;

    // 2️⃣ Create user if not existing
    if (!userId) {
      const { data: newUser, error: userError } = await supabase
        .from('booking.users')
        .insert({
          email,
          name,
          role: 'staff',
        })
        .select()
        .single();

      if (userError) throw userError;
      userId = newUser.id;
    }

    // 3️⃣ Upload photo (optional)
    let photoUrl = null;

    if (photo && photo.size > 0) {
      const ext = photo.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('staff-photos')
        .upload(fileName, photo, {
          contentType: photo.type,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from('staff-photos').getPublicUrl(fileName);

      photoUrl = publicUrl;
    }

    // 4️⃣ Create staff profile
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
  } catch (err) {
    console.error('Server Action Error:', err);
    return { success: false, message: err.message };
  }
}
