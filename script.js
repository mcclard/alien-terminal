@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: #000;
    color: #33ff33;
    font-family: 'VT323', monospace;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.terminal {
    width: 90%;
    max-width: 900px;
    height: 80vh;
    background-color: #000;
    border: 2px solid #33ff33;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(51, 255, 51, 0.5);
    display: flex;
    flex-direction: column;
}

.terminal-header {
    padding: 10px;
    border-bottom: 1px solid #33ff33;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.terminal-title {
    font-size: 1.2rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    text-shadow: 0 0 10px rgba(51, 255, 51, 0.8);
}

.terminal-options {
    margin-right: 20px;
}

.sound-toggle {
    display: flex;
    align-items: center;
    cursor: pointer;
    letter-spacing: 3px;
    text-transform: uppercase;
    text-shadow: 0 0 10px rgba(51, 255, 51, 0.8);
}

.sound-toggle input {
    margin-right: 5px;
    appearance: none;
    width: 16px;
    height: 16px;
    border: 1px solid #33ff33;
    background: transparent;
    position: relative;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(51, 255, 51, 0.8);
}

.sound-toggle input:checked::after {
    content: "✓";
    color: #33ff33;
    position: absolute;
    top: -2px;
    left: 2px;
}

.status-indicator {
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: #33ff33;
    border-radius: 50%;
    margin-right: 5px;
    animation: blink 1.5s infinite;
    box-shadow: 0 0 8px rgba(51, 255, 51, 0.8);
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
}

.terminal-content {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.terminal-output {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 15px;
}

.terminal-output p {
    margin-bottom: 16px;
    line-height: 1.5;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-shadow: 0 0 8px rgba(51, 255, 51, 0.8);
}

.terminal-input-container {
    display: flex;
    align-items: center;
}

.prompt {
    margin-right: 10px;
    text-shadow: 0 0 8px rgba(51, 255, 51, 0.8);
}

.terminal-input {
    background: transparent;
    border: none;
    color: #33ff33;
    font-family: 'VT323', monospace;
    font-size: 1.1rem;
    outline: none;
    width: 100%;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-shadow: 0 0 8px rgba(51, 255, 51, 0.8);
}

/* CRT effect */
.terminal:before {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
    background-size: 100% 2px, 3px 100%;
    pointer-events: none;
    z-index: 2;
    opacity: 0.15;
}
