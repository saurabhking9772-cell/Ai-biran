// Main JavaScript for Mobile AI Brain

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    
    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!menuBtn.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Code Analysis
    const analyzeBtn = document.getElementById('analyzeBtn');
    const codeInput = document.getElementById('codeInput');
    const languageSelect = document.getElementById('languageSelect');
    const codeResult = document.getElementById('codeResult');
    
    analyzeBtn.addEventListener('click', function() {
        const code = codeInput.value;
        const language = languageSelect.value;
        
        if (!code.trim()) {
            codeResult.innerHTML = '<p class="error">Please enter some code first!</p>';
            return;
        }
        
        // Show loading
        codeResult.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> Analyzing code...</p>';
        
        // Analyze after short delay
        setTimeout(() => {
            const analysis = aiBrain.analyzeCode(code, language);
            
            let html = `
                <div class="analysis-result">
                    <h4><i class="fas fa-check-circle"></i> Analysis Complete</h4>
                    <p><strong>Language:</strong> ${language.toUpperCase()}</p>
                    <p><strong>Complexity:</strong> ${analysis.complexity}</p>
                    <p><strong>Score:</strong> ${analysis.score}/100</p>
                    
                    <div class="issues">
                        <h5><i class="fas fa-exclamation-triangle"></i> Issues Found:</h5>
                        <ul>
                            ${analysis.issues.map(issue => `<li>${issue}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="suggestions">
                        <h5><i class="fas fa-lightbulb"></i> Suggestions:</h5>
                        <ul>
                            ${analysis.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            
            codeResult.innerHTML = html;
        }, 1000);
    });

    // Generate Code
    const generateBtn = document.getElementById('generateBtn');
    
    generateBtn.addEventListener('click', function() {
        const language = languageSelect.value;
        const code = codeInput.value;
        
        let description = "factorial function";
        if (code.trim()) {
            description = "improved version of: " + code.substring(0, 50) + "...";
        }
        
        codeResult.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> Generating code...</p>';
        
        setTimeout(() => {
            const generatedCode = aiBrain.generateCode(description, language);
            
            let html = `
                <div class="generated-code">
                    <h4><i class="fas fa-code"></i> Generated ${language.toUpperCase()} Code</h4>
                    <pre><code>${generatedCode}</code></pre>
                    <button class="btn primary copy-btn" onclick="copyToClipboard(this)">
                        <i class="fas fa-copy"></i> Copy Code
                    </button>
                </div>
            `;
            
            codeResult.innerHTML = html;
        }, 1500);
    });

    // Explain Concept
    const explainBtn = document.getElementById('explainBtn');
    const topicInput = document.getElementById('topicInput');
    const levelSelect = document.getElementById('levelSelect');
    const explanationResult = document.getElementById('explanationResult');
    
    explainBtn.addEventListener('click', function() {
        const topic = topicInput.value;
        const level = levelSelect.value;
        
        if (!topic.trim()) {
            explanationResult.innerHTML = '<p class="error">Please enter a topic!</p>';
            return;
        }
        
        explanationResult.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> Generating explanation...</p>';
        
        setTimeout(() => {
            const explanation = aiBrain.explainConcept(topic, level);
            
            let html = `
                <div class="explanation">
                    <h4><i class="fas fa-book"></i> ${topic} - ${level} Level</h4>
                    <p>${explanation}</p>
                    
                    <div class="examples">
                        <h5><i class="fas fa-code"></i> Example:</h5>
                        <p>Here's a simple example related to ${topic}:</p>
                        <pre><code>// ${topic} example code
// Implement based on your needs</code></pre>
                    </div>
                    
                    <div class="tips">
                        <h5><i class="fas fa-tips"></i> Learning Tips:</h5>
                        <ul>
                            <li>Practice daily for 30 minutes</li>
                            <li>Build small projects</li>
                            <li>Join online communities</li>
                            <li>Teach others what you learn</li>
                        </ul>
                    </div>
                </div>
            `;
            
            explanationResult.innerHTML = html;
        }, 1000);
    });

    // Chat Functionality
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    
    function addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = type + '-message';
        messageDiv.innerHTML = `<strong>${type === 'user' ? 'You' : 'AI Brain'}:</strong> ${content}`;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
    sendBtn.addEventListener('click', async function() {
        const message = userInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        userInput.value = '';
        
        // Show AI typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'ai-message';
        typingDiv.innerHTML = '<i class="fas fa-ellipsis-h"></i> AI Brain is typing...';
        chatBox.appendChild(typingDiv);
        
        // Get AI response
        setTimeout(async () => {
            chatBox.removeChild(typingDiv);
            const response = await aiBrain.getChatResponse(message);
            addMessage(response, 'ai');
        }, 1000);
    });
    
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });

    // Quick Questions
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            userInput.value = question;
            sendBtn.click();
        });
    });

    // Start Coding Button
    document.getElementById('startCoding').addEventListener('click', function() {
        document.getElementById('coding').scrollIntoView({ behavior: 'smooth' });
    });

    // Start Learning Button
    document.getElementById('startLearning').addEventListener('click', function() {
        document.getElementById('education').scrollIntoView({ behavior: 'smooth' });
    });

    // Copy to clipboard function
    window.copyToClipboard = function(button) {
        const codeElement = button.previousElementSibling;
        const text = codeElement.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Copied!';
            button.style.background = '#28a745';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
            }, 2000);
        });
    };

    // Add some sample code to textarea
    codeInput.value = `def greet(name):
    print("Hello, " + name + "!")
    
greet("AI Brain")`;

    // Add sample topic
    topicInput.value = "Python";
});

// Service Worker for PWA (Optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(() => {
            console.log('Service Worker Registered');
        });
    });
      }
