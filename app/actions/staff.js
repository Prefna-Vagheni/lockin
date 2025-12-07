'use server';

import { supabaseAdmin } from '../lib/supabase';
import { revalidatePath } from 'next/cache';

export async function createStaff(formData) {
  try {
    const email = formData.get('email');
    const name = formData.get('name');
    const bio = formData.get('bio');
    const specialties = formData.get('specialties');
    const hourlyRate = formData.get('hourlyRate');
    const photoFile = formData.get('photo');

    // Step 1: Check if user exists or create new one
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    let userId;

    if (existingUser) {
      userId = existingUser.id;
    } else {
      const { data: newUser, error: userError } = await supabaseAdmin
        .from('users')
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

    // Step 2: Upload photo if provided
    let photoUrl = null;
    if (photoFile && photoFile.size > 0) {
      const fileExt = photoFile.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;

      // Convert File to ArrayBuffer
      const arrayBuffer = await photoFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error: uploadError } = await supabaseAdmin.storage
        .from('staff-photos')
        .upload(fileName, buffer, {
          contentType: photoFile.type,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabaseAdmin.storage.from('staff-photos').getPublicUrl(fileName);

      photoUrl = publicUrl;
    }

    // Step 3: Create staff profile
    const specialtiesArray = specialties
      ? specialties
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const { error: staffError } = await supabaseAdmin.from('staff').insert({
      user_id: userId,
      bio: bio || null,
      photo_url: photoUrl,
      specialties: specialtiesArray,
      hourly_rate: parseFloat(hourlyRate),
      is_active: true,
    });

    if (staffError) throw staffError;

    revalidatePath('/admin/staff');
    return { success: true };
  } catch (error) {
    console.error('Error creating staff:', error);
    return { success: false, error: error.message };
  }
}

export async function updateStaff(staffId, formData) {
  try {
    const name = formData.get('name');
    const bio = formData.get('bio');
    const specialties = formData.get('specialties');
    const hourlyRate = formData.get('hourlyRate');
    const isActive = formData.get('isActive') === 'true';
    const photoFile = formData.get('photo');
    const userId = formData.get('userId');

    // Update user name
    await supabaseAdmin.from('users').update({ name }).eq('id', userId);

    // Handle photo upload if new photo provided
    let photoUrl = formData.get('currentPhotoUrl');

    if (photoFile && photoFile.size > 0) {
      const fileExt = photoFile.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;

      const arrayBuffer = await photoFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error: uploadError } = await supabaseAdmin.storage
        .from('staff-photos')
        .upload(fileName, buffer, {
          contentType: photoFile.type,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabaseAdmin.storage.from('staff-photos').getPublicUrl(fileName);

      photoUrl = publicUrl;
    }

    // Update staff profile
    const specialtiesArray = specialties
      ? specialties
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const { error: staffError } = await supabaseAdmin
      .from('staff')
      .update({
        bio: bio || null,
        photo_url: photoUrl,
        specialties: specialtiesArray,
        hourly_rate: parseFloat(hourlyRate),
        is_active: isActive,
      })
      .eq('id', staffId);

    if (staffError) throw staffError;

    revalidatePath('/admin/staff');
    return { success: true };
  } catch (error) {
    console.error('Error updating staff:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteStaff(staffId) {
  try {
    // Delete staff (user will cascade delete due to foreign key)
    const { error } = await supabaseAdmin
      .from('staff')
      .delete()
      .eq('id', staffId);

    if (error) throw error;

    revalidatePath('/admin/staff');
    return { success: true };
  } catch (error) {
    console.error('Error deleting staff:', error);
    return { success: false, error: error.message };
  }
}
