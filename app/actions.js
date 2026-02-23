"use server"; // This marks the file as Server-Side code

import { createClient } from "@/lib/supabase-server";

export async function updateStreak(allDone) {
  console.log("Server is verifying the current user...");

  const supabaseServer = await createClient();

  const { data: { user } } = await supabaseServer.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized! You must be a parent to update streaks.");
  }

  console.log("Server is processing the streak...");

  // 1. Fetch current data (Assuming ID 1 for our single user)
  const { data: currentRecord } = await supabaseServer
    .from("progress")
    .select("streak")
    .eq("id", 1)
    .single();

  console.log("Server fetched the record...");

  let newStreak = allDone ? currentRecord.streak + 1 : 0;
  let newTickets = Math.floor(newStreak / 5);

  console.log("Server is updating the record...");

  // 2. Update the database
  const { data, error } = await supabaseServer
    .from("progress")
    .update({
      streak: newStreak,
      tickets: newTickets,
      updated_at: new Date(),
    })
    .eq("id", 1)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data; // This goes back to page.js
}

// Fetch the initial data when the app loads
export async function getInitialData() {
  const supabaseServer = await createClient();

  const { data } = await supabaseServer
    .from("progress")
    .select("*")
    .eq("id", 1)
    .single();

  return data;
}
