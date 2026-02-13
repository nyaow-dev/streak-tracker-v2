'use server' // This marks the file as Server-Side code

// Later, we will replace this "mock" database with Supabase
let mockDatabase = { streak: 0, tickets: 0 };

export async function UpdateStreak(allDone) {
    console.log("Server is processing the streak...");

    // Logic happens on the server now
    if (allDone) {
        mockDatabase.streak += 1;
    } else {
        mockDatabase.streak = 0;
    }

    mockDatabase.tickets = Math.floor(mockDatabase.streak / 5);

    return mockDatabase;
}


