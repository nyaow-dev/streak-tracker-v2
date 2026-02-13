'use client' // This tells Next.js this is an interactive page

import { updateStreak } from './actions'
import { useState, useEffect } from 'react'

export default function Home() {
    // This is how we handle "State" in Next.js/React
    const [streak, setStreak] = useState(0)
    const [tickets, setTickets] = useState(0)

    // UseEffect runs once when the page loads (Load from browser local storage)
    // useEffect(() => {
    //     const saved = localStorage.getItem('streakData');
    //     if (saved) {
    //         const parsed = JSON.parse(saved)
    //         setStreak(parsed.streak)
    //         setTickets(parsed.tickets)
    //     }
    // }, [])

    const handleFinishDay = async () => {
        const checkboxes = document.querySelectorAll('.task-check')
        const allDone = Array.from(checkboxes).every(box => box.checked)

        // Call the Server Action
        const updatedData = await updateStreak(allDone);

        setStreak(updatedData.streak)
        setTickets(updatedData.tickets)
    }

    return (
        <div id="app">
            <h1>Streak Tracker</h1>
            <div id="stats">
                <p>Current Streak: <span id="streak-count">{streak}</span> days</p>
                <p>Tickets: <span id="ticket-count">{tickets}</span></p>
            </div>

            <div className="tasks">
                <label><input type="checkbox" className="task-check" /> School HW</label>
                <label><input type="checkbox" className="task-check" /> Spelling</label>
                <label><input type="checkbox" className="task-check" /> D HW</label>
                <label><input type="checkbox" className="task-check" /> Piano</label>
            </div>

            <button onClick={handleFinishDay}>Finish Day</button>
        </div>
    )
}
