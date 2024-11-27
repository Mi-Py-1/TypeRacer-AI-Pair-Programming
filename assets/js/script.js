document.addEventListener('DOMContentLoaded', function() {
    let startTime, endTime;

    const startButton = document.getElementById('start-btn');
    const stopButton = document.getElementById('stop-btn');
    const retryButton = document.getElementById('retry-btn');
    const resultDisplay = document.getElementById('time');
    const wpmDisplay = document.getElementById('wpm');
    const levelDisplay = document.getElementById('level');
    const difficultySelect = document.getElementById('difficulty');
    const sampleTextDiv = document.getElementById('sample-text');
    const userInput = document.getElementById('user-input');

    function updateSampleText() {
        const selectedDifficulty = difficultySelect.value;
        let selectedText = '';

        // Example texts for different difficulty levels
        if (selectedDifficulty === 'easy') {
            selectedText = 'The quick brown fox jumps over the lazy dog.';
        } else if (selectedDifficulty === 'medium') {
            selectedText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
        } else if (selectedDifficulty === 'hard') {
            selectedText = 'Sphinx of black quartz, judge my vow.';
        }

        sampleTextDiv.textContent = selectedText;
    }

    function startTest() {
        startTime = new Date();
        startButton.disabled = true;
        stopButton.disabled = false;
        retryButton.disabled = true;
        resultDisplay.textContent = '0';
        wpmDisplay.textContent = '0';
        userInput.value = '';
        userInput.disabled = false;
        userInput.focus();
    }

    function stopTest() {
        endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000;
        resultDisplay.textContent = timeTaken.toFixed(2);
        startButton.disabled = false;
        stopButton.disabled = true;
        retryButton.disabled = false;
        userInput.disabled = true;

        // Calculate WPM
        const sampleText = sampleTextDiv.textContent.trim();
        const userText = userInput.value.trim();
        const sampleWords = sampleText.split(' ');
        const userWords = userText.split(' ');
        let correctWords = 0;

        for (let i = 0; i < userWords.length; i++) {
            if (userWords[i] === sampleWords[i]) {
                correctWords++;
            }
        }

        const wpm = Math.round((correctWords / timeTaken) * 60);
        wpmDisplay.textContent = wpm;

        // Update difficulty level
        levelDisplay.textContent = difficultySelect.options[difficultySelect.selectedIndex].text;
    }

    difficultySelect.addEventListener('change', updateSampleText);
    startButton.addEventListener('click', startTest);
    stopButton.addEventListener('click', stopTest);
    retryButton.addEventListener('click', startTest);

    // Initialize with a random text from the default difficulty level
    updateSampleText();
});