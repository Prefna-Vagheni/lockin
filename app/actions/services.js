'use server';

import { supabaseAdmin } from '../lib/supabase';
import { revalidatePath } from 'next/cache';

export async function createService(formData) {
  try {
    const name = formData.get('name');
    const description = formData.get('description');
    const durationMinutes = formData.get('durationMinutes');
    const price = formData.get('price');

    const { error } = await supabaseAdmin.from('services').insert({
      name,
      description: description || null,
      duration_minutes: parseInt(durationMinutes),
      price: parseFloat(price),
      is_active: true,
    });

    if (error) throw error;

    revalidatePath('/admin/services');
    return { success: true };
  } catch (error) {
    console.error('Error creating service:', error);
    return { success: false, error: error.message };
  }
}

export async function updateService(serviceId, formData) {
  try {
    const name = formData.get('name');
    const description = formData.get('description');
    const durationMinutes = formData.get('durationMinutes');
    const price = formData.get('price');
    const isActive = formData.get('isActive') === 'true';

    const { error } = await supabaseAdmin
      .from('services')
      .update({
        name,
        description: description || null,
        duration_minutes: parseInt(durationMinutes),
        price: parseFloat(price),
        is_active: isActive,
      })
      .eq('id', serviceId);

    if (error) throw error;

    revalidatePath('/admin/services');
    return { success: true };
  } catch (error) {
    console.error('Error updating service:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteService(serviceId) {
  try {
    const { error } = await supabaseAdmin
      .from('services')
      .delete()
      .eq('id', serviceId);

    if (error) throw error;

    revalidatePath('/admin/services');
    return { success: true };
  } catch (error) {
    console.error('Error deleting service:', error);
    return { success: false, error: error.message };
  }
}
