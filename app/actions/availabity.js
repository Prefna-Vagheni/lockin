'use server';

import { supabaseAdmin } from '../lib/supabase';
import { revalidatePath } from 'next/cache';

export async function saveStaffAvailability(staffId, availabilityData) {
  try {
    // Delete existing availability for this staff member
    await supabaseAdmin
      .from('staff_availability')
      .delete()
      .eq('staff_id', staffId);

    // Insert new availability slots
    const availabilityRecords = [];

    Object.keys(availabilityData).forEach((day) => {
      if (availabilityData[day].enabled) {
        availabilityRecords.push({
          staff_id: staffId,
          day_of_week: parseInt(day),
          start_time: availabilityData[day].start,
          end_time: availabilityData[day].end,
        });
      }
    });

    if (availabilityRecords.length > 0) {
      const { error } = await supabaseAdmin
        .from('staff_availability')
        .insert(availabilityRecords);

      if (error) throw error;
    }

    revalidatePath('/admin/staff');
    return { success: true };
  } catch (error) {
    console.error('Error saving availability:', error);
    return { success: false, error: error.message };
  }
}
