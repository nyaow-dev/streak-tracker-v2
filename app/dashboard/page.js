"use client"; // This tells Next.js this is an interactive page

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // Import the client directly for Auth
import { useRouter } from "next/navigation";
import { getInitialData, updateStreak } from "../actions";

export default function DashboardPage() {
  const [streak, setStreak] = useState(0);
  const [tickets, setTickets] = useState(0);
  const router = useRouter();

  // 1. Check for active session on load
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/");
      } else {
        const data = await getInitialData();

        if (data) {
          setStreak(data.streak);
          setTickets(data.tickets);
        }
      }
    };
    checkUser();
  }, [router]);

  const handleLogout = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error logging out: ", error.message);
    } else {
      router.push("/");
    }
  };

  const handleFinishDay = async () => {
    const checkboxes = document.querySelectorAll(".task-check");
    const allDone = Array.from(checkboxes).every((box) => box.checked);

    // Call the Server Action
    const updatedData = await updateStreak(allDone);

    setStreak(updatedData.streak);
    setTickets(updatedData.tickets);
  };

  return (
    <div id="app">
      <h1>Streak Tracker</h1>
      <div id="stats">
        <p>
          Current Streak: <span id="streak-count">{streak}</span> days
        </p>
        <p>
          Tickets: <span id="ticket-count">{tickets}</span>
        </p>
      </div>

      <div className="tasks">
        <label>
          <input type="checkbox" className="task-check" /> School HW
        </label>
        <label>
          <input type="checkbox" className="task-check" /> Spelling
        </label>
        <label>
          <input type="checkbox" className="task-check" /> D HW
        </label>
        <label>
          <input type="checkbox" className="task-check" /> Piano
        </label>
      </div>

      <button onClick={handleFinishDay}>Finish Day</button>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
}
