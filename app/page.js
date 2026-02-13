'use client' // This tells Next.js this is an interactive page

import { useState, useEffect } from 'react'

export default function Home() {
    // This is how we handle "State" in Next.js/React
    const [streak, setStreak] = useState(0)
    const [tickets, setTickets] = useState(0)

    // UseEffect runs once when the page loads (Load from browser local storage)
    useEffect(() => {
        const saved = localStorage.getItem('streakData');
        if (saved) {
            const parsed = JSON.parse(saved);
            setStreak(parsed.streak)
            setTickets(parsed.tickets)
        }
    }, [])

    const handleFinishDay = () => {
        const checkboxes = document.querySelectorAll('.task-check')
        const allDone = Array.from(checkboxes).every(box => box.checked)

        let newStreak = streak = allDone ? streak + 1 : 0
        let newTickets = Math.floor(newStreak / 5)

        // Save to browser local storage
        localStorage.setItem('streakData', JSON.stringify({ streak: newStreak, tickets: newTickets }));
    }

    return (
        <div id="app">
            <h1>Streak Tracker</h1>
            <div id="stats">
                <p>Current Streak: <span id="streak-count">{streak}</span> days</p>
                <p>Tickets: <span id="ticket-count">{tickets}</span></p>
            </div>

            <div className="tasks">
                <label><input type="checkbox" class="task-check" /> School HW</label>
                <label><input type="checkbox" class="task-check" /> Spelling</label>
                <label><input type="checkbox" class="task-check" /> D HW</label>
                <label><input type="checkbox" class="task-check" /> Piano</label>
            </div>

            <button onClick={handleFinishDay}>Finish Day</button>
        </div>
    )
}


