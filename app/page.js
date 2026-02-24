"use client"; // This tells Next.js this is an interactive page

import { useState, useEffect } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser"; // Import the client directly for Auth
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // 1. Check for active session on load
  useEffect(() => {
    const supabase = supabaseBrowser();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);

      if (user) {
        router.push("/dashboard");
      }
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const supabase = supabaseBrowser();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) alert(error.message);
    else {
      setUser(data.user);
      router.push("/dashboard");
    }
  };

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
