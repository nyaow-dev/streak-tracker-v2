'use server' // This marks the file as Server-Side code

import { supabase } from '@/lib/supabase'

export async function updateStreak(allDone) {
    console.log('Server is processing the streak...');

    // 1. Fetch current data (Assuming ID 1 for our single user)
    const { data: currentRecord } = await supabase
        .from('progress')
        .select('streak')
        .eq('id', 1)
        .single();

    let newStreak = allDone ? (currentRecord.streak + 1) : 0;
    let newTickets = Math.floor(newStreak / 5);

    // 2. Update the database
    const { data, error } = await supabase
        .from('progress')
        .update({
            streak: newStreak,
            tickets: newTickets,
            updated_at: new Date()
        })
        .eq('id', 1)
        .select()
        .single();

    if (error) throw new Error(error.message);

    return data; // This goes back to page.js
}


