"use client"; // This tells Next.js this is an interactive page

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // Import the client directly for Auth
import { getInitialData, updateStreak } from "./actions";

export default function Home() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 1. Check for active session on load
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) alert(error.message);
    else setUser(data.user);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error logging out: ", error.message);
    } else {
      setUser(null);
      setEmail("");
      setPassword("");
    }
  };

  // This is how we handle "State" in Next.js/React
  const [streak, setStreak] = useState(0);
  const [tickets, setTickets] = useState(0);

  // UseEffect runs once when the page loads (Load from supabase)
  useEffect(() => {
    getInitialData().then((data) => {
      if (data) {
        setStreak(data.streak);
        setTickets(data.tickets);
      }
    });
  }, []);

  const handleFinishDay = async () => {
    const checkboxes = document.querySelectorAll(".task-check");
    const allDone = Array.from(checkboxes).every((box) => box.checked);

    // Call the Server Action
    const updatedData = await updateStreak(allDone);

    setStreak(updatedData.streak);
    setTickets(updatedData.tickets);
  };

  if (!user) {
    return (
      <div id="app">
        <h1>Parent Login</h1>
        <form onSubmit={handleLogin}>
          <div className="login">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

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
