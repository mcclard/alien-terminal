document.addEventListener('DOMContentLoaded', function() {
    const outputElement = document.getElementById('output');
    const inputElement = document.getElementById('input');
    
    // Add typing sound effect
    const typeSound = new Audio('type.mp3'); // You'll need a typing sound file
    typeSound.volume = 0.2;
    
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
                'SECURITY CLEARANCE REQUIRED',
                'ENTER AUTHENTICATION CODE:'
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
    
    // Handle input submission
    inputElement.addEventListener('keydown', function(e) {
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
        } else {
            // Play typing sound for each keypress
            typeSound.currentTime = 0;
            typeSound.play().catch(e => {});
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
                    
                    // Random typing sound
                    if (Math.random() > 0.7) {
                        typeSound.currentTime = 0;
                        typeSound.play().catch(e => {});
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
