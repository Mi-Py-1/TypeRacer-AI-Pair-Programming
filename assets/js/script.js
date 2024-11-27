document.addEventListener('DOMContentLoaded', function() {
    let startTime, endTime;
    let testStarted = false;

    const startButton = document.getElementById('start-btn');
    const stopButton = document.getElementById('stop-btn');
    const retryButton = document.getElementById('retry-btn');
    const resultDisplay = document.getElementById('time');
    const wpmDisplay = document.getElementById('wpm');
    const levelDisplay = document.getElementById('level');
    const difficultySelect = document.getElementById('difficulty');
    const sampleTextDiv = document.getElementById('sample-text');
    const userInput = document.getElementById('user-input');
    const bestEasyDisplay = document.getElementById('best-easy');
    const bestMediumDisplay = document.getElementById('best-medium');
    const bestHardDisplay = document.getElementById('best-hard');

    let bestResults = {
        easy: 0,
        medium: 0,
        hard: 0
    };

    function updateSampleText() {
        const selectedDifficulty = difficultySelect.value;
        let selectedText = '';

        // Example texts for different difficulty levels
        if (selectedDifficulty === 'easy') {
            const easyTexts = [
                'The quick brown fox jumps over the lazy dog.',
                'Pack my box with five dozen liquor jugs.',
                'How razorback-jumping frogs can level six piqued gymnasts!'
            ];
            selectedText = easyTexts[Math.floor(Math.random() * easyTexts.length)];
        } else if (selectedDifficulty === 'medium') {
            const mediumTexts = [
                'Sphinx of black quartz, judge my vow.',
                'The five boxing wizards jump quickly.',
                'Jinxed wizards pluck ivy from the big quilt.'  
            ];
            selectedText = mediumTexts[Math.floor(Math.random() * mediumTexts.length)];
        } else if (selectedDifficulty === 'hard') {
            const hardTexts = [
                'The quick onyx goblin jumps over the lazy dwarf.',
                'Jovial zookeeper quickly brightens the vixen\'s cage.',
                'Exquisite farm wench gives body jolt to prize stinker.'
            ];
            selectedText = hardTexts[Math.floor(Math.random() * hardTexts.length)];
        }

        sampleTextDiv.textContent = selectedText;
    }

    function startTest() {
        startTime = new Date();
        testStarted = true;
        startButton.disabled = true;
        stopButton.disabled = false;
        retryButton.disabled = true;
        resultDisplay.textContent = '0';
        wpmDisplay.textContent = '0';
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
        const selectedDifficulty = difficultySelect.value;
        levelDisplay.textContent = difficultySelect.options[difficultySelect.selectedIndex].text;

        // Update best results
        if (wpm > bestResults[selectedDifficulty]) {
            bestResults[selectedDifficulty] = wpm;
            updateBestResultsDisplay();
        }
    }

    function updateBestResultsDisplay() {
        bestEasyDisplay.textContent = bestResults.easy;
        bestMediumDisplay.textContent = bestResults.medium;
        bestHardDisplay.textContent = bestResults.hard;
    }

    function highlightText() {
        if (!testStarted) {
            startTest();
        }

        const sampleText = sampleTextDiv.textContent.trim();
        const userText = userInput.value.trim();
        const sampleWords = sampleText.split(' ');
        const userWords = userText.split(' ');

        let highlightedText = '';

        for (let i = 0; i < sampleWords.length; i++) {
            if (userWords[i] === sampleWords[i]) {
                highlightedText += `<span class="correct">${sampleWords[i]}</span> `;
            } else if (userWords[i]) {
                highlightedText += `<span class="incorrect">${sampleWords[i]}</span> `;
            } else {
                highlightedText += `${sampleWords[i]} `;
            }
        }

        sampleTextDiv.innerHTML = highlightedText.trim();
    }

    difficultySelect.addEventListener('change', updateSampleText);
    retryButton.addEventListener('click', function() {
        testStarted = false;
        userInput.value = '';
        sampleTextDiv.textContent = '';
        resultDisplay.textContent = '0';
        wpmDisplay.textContent = '0';
        startButton.disabled = false;
        stopButton.disabled = true;
        retryButton.disabled = true;
        userInput.disabled = false;
        updateSampleText();
    });
    userInput.addEventListener('input', highlightText);
    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            stopTest();
        }
    });

    // Initialize with a random text from the default difficulty level
    updateSampleText();
});