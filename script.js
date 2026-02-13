
// 1. Initial State
let appState = {
    streak: 0,
    tickets: 0,
    tasksCompletedToday: false
};

// 2. Select UI Elements
const streakDisplay = document.getElementById('streak-count');
const ticketDisplay = document.getElementById('ticket-count');
const submitBtn = document.getElementById('submit-btn');
const checkboxes = document.querySelectorAll('.task-check');

// 2a. Load from browser local storage
const savedData = localStorage.getItem('streakData');
if (savedData) {
    appState = JSON.parse(savedData);
    render(); // Show the saved numbers immediately
}

// 3. Update the UI
function render() {
    streakDisplay.innerText = appState.streak;
    ticketDisplay.innerText = appState.tickets;

    // Save to browser memory
    localStorage.setItem('streakData', JSON.stringify(appState));
}


submitBtn.addEventListener('click', () => {

    // 1st way of checking, via forEach loop
    // const checks = document.querySelectorAll('.task-check');
    // let allDone = true;

    // checks.forEach(box => {
    //     if (!box.checked) allDone = false;
    // });

    // 2nd way of checking, via Array.every
    // Check if every checkbox is checked
    const allFinished = Array.from(checkboxes).every(box => box.checked);

    if (allFinished) {
        // Logic: Increment streak
        appState.streak += 1;

        // Logic: Calculate tickets (1 for every 5 days)
        appState.tickets = Math.floor(appState.streak / 5);

        alert("Boom! Streak updated.");
    } else {
        // Logic: Reset streak if they missed a task
        appState.streak = 0;
        alert("Streak reset! Try again tomorrow.");
    }

    // Refresh the screen with new numbers
    render();
});