document.addEventListener('DOMContentLoaded', function() {
    const outputElement = document.getElementById('output');
    const inputElement = document.getElementById('input');
    const soundToggle = document.getElementById('soundToggle');
    
    // Startup sound for when toggle is checked
    const startupSound = new Audio('sounds/console powering on.mp3');
    startupSound.volume = 0.3;
    
    // Function to create and play a new sound instance for typing
    function playKeySound() {
        if (soundToggle.checked) {
            // Create a new audio instance each time for overlapping sounds
            const keySound = new Audio('sounds/electronic input, quick.mp3');
            keySound.volume = 0.2;
            keySound.play().catch(e => {});
        }
    }
    
    // Listen for changes to the sound toggle
    soundToggle.addEventListener('change', function() {
        if (this.checked) {
            // Play startup sound when sounds are enabled
            startupSound.play().catch(e => {});
        }
    });
    
    // Commands database
    const commands = {
        'help': function() {
            return [
                'AVAILABLE COMMANDS:',
                '- HELP: Display this help menu',
                '- MISSIONS: View available missions',
                '- REPORTS: Access mission reports',
                '- SUBMIT: Submit a new report',
                '- CLEAR: Clear terminal screen',
                '- LOGOUT: Disconnect from terminal'
            ];
        },
        'missions': function() {
            return [
                'AVAILABLE MISSIONS:',
                '- DEEP SPACE SALVAGE: Recover cargo from derelict vessel',
                '- COLONY MAINTENANCE: Routine inspection of outpost',
                '- DISTRESS SIGNAL: Investigate emergency beacon',
                '- SPECIMEN RECOVERY: Retrieve biological samples'
            ];
        },
        'reports': function() {
            return [
                'ACCESSING REPORT DATABASE...',
                'REPORT DATABASE ACCESSED. DISPLAYING RECENT REPORTS:',
                '- SALVAGE REPORT #42A: Derelict mining vessel "Nostromos"',
                '- SPECIMEN ANALYSIS #17: Unknown biological organism',
                '- MAINTENANCE LOG #113: Atmospheric processor malfunction'
            ];
        },
        'submit': function() {
            window.location.href = 'submit.html';
            return ['REDIRECTING TO REPORT SUBMISSION INTERFACE...'];
        },
        'clear': function() {
            outputElement.innerHTML = '';
            return [];
        },
        'logout': function() {
            return [
                'DISCONNECTING FROM TERMINAL...',
                'THANK YOU FOR USING WEYLAND-YUTANI SERVICES',
                'CONNECTION TERMINATED'
            ];
        }
    };
    
    // Startup sequence
    const startupLines = [
        "INITIALIZING SYSTEM...",
        "ESTABLISHING CONNECTION...",
        "WELCOME TO THE DEEP SPACE MISSION DATABASE",
        "VERSION 2.1.79"
    ];
    
    // Empty the output first
    outputElement.innerHTML = '';
    
    // Display startup messages with scrolling effect
    displayStartupSequence(0);
    
    function displayStartupSequence(lineIndex) {
        if (lineIndex < startupLines.length) {
            const line = startupLines[lineIndex];
            const element = document.createElement('p');
            element.textContent = '> ';
            outputElement.appendChild(element);
            
            let charIndex = 0;
            const timer = setInterval(() => {
                if (charIndex < line.length) {
                    element.textContent = '> ' + line.substring(0, charIndex + 1);
                    charIndex++;
                    
                    // Random typing sound for system responses
                    if (soundToggle.checked && Math.random() > 0.7) {
                        playKeySound();
                    }
                    
                    outputElement.scrollTop = outputElement.scrollHeight;
                } else {
                    clearInterval(timer);
                    setTimeout(() => {
                        displayStartupSequence(lineIndex + 1);
                    }, 500); // Wait before showing next line
                }
            }, 40); // Speed of typing
        } else {
            // After startup sequence, display help menu
            setTimeout(() => {
                const helpResponse = commands['help']();
                typeResponse(helpResponse, 0);
            }, 500);
        }
    }
    
    // Handle input submission
    inputElement.addEventListener('keydown', function(e) {
        // Play sound for every keystroke
        playKeySound();
        
        if (e.key === 'Enter') {
            const input = inputElement.value.trim().toUpperCase();
            
            // Add the command to the output
            const commandElement = document.createElement('p');
            commandElement.textContent = '> ' + input;
            outputElement.appendChild(commandElement);
            
            // Process the command
            if (input !== '') {
                const command = input.split(' ')[0];
                if (commands[command.toLowerCase()]) {
                    const response = commands[command.toLowerCase()]();
                    
                    // Display the response with a typing effect
                    if (response.length > 0) {
                        typeResponse(response, 0);
                    }
                } else {
                    const unknownElement = document.createElement('p');
                    unknownElement.textContent = 'UNKNOWN COMMAND: ' + command;
                    outputElement.appendChild(unknownElement);
                }
            }
            
            // Clear the input
            inputElement.value = '';
            
            // Scroll to the bottom
            outputElement.scrollTop = outputElement.scrollHeight;
        }
    });
    
    // Typing effect for responses
    function typeResponse(lines, index) {
        if (index < lines.length) {
            const line = lines[index];
            const element = document.createElement('p');
            
            let charIndex = 0;
            const timer = setInterval(() => {
                if (charIndex < line.length) {
                    element.textContent += line.charAt(charIndex);
                    charIndex++;
                    
                    // Random typing sound for system responses
                    if (soundToggle.checked && Math.random() > 0.7) {
                        playKeySound();
                    }
                    
                    outputElement.scrollTop = outputElement.scrollHeight;
                } else {
                    clearInterval(timer);
                    typeResponse(lines, index + 1);
                }
            }, 20);
            
            outputElement.appendChild(element);
        }
    }
    
    // Focus input on click anywhere
    document.addEventListener('click', function() {
        inputElement.focus();
    });
    
    // Initial focus
    inputElement.focus();
});
