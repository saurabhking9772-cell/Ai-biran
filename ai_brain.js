// AI Brain Core Logic - Mobile Compatible

class AIBrain {
    constructor() {
        this.memory = [];
        this.maxMemory = 50; // Mobile ke liye limit
        this.initKnowledgeBase();
    }

    initKnowledgeBase() {
        this.knowledge = {
            coding: {
                python: {
                    basics: [
                        "Python mein print() function se output milta hai",
                        "Variables banana: x = 10, name = 'Rahul'",
                        "Indentation important hai Python mein"
                    ],
                    functions: [
                        "def keyword se function banate hain",
                        "Function: def add(a, b): return a + b",
                        "Function call: result = add(5, 3)"
                    ],
                    loops: [
                        "for loop: for i in range(5): print(i)",
                        "while loop: while condition: code"
                    ]
                },
                javascript: {
                    basics: [
                        "console.log() se output dekhte hain",
                        "let aur const se variables banate hain",
                        "JavaScript web development ke liye best hai"
                    ]
                },
                html: {
                    basics: [
                        "<html> se start, </html> se end",
                        "<head> mein meta data, <body> mein content",
                        "Tags: <h1> heading, <p> paragraph"
                    ]
                }
            },
            education: {
                programming_concepts: {
                    variables: "Variables data store karte hain. Jaise: x = 5",
                    functions: "Functions reusable code blocks hain",
                    loops: "Loops se hum ek code ko baar baar chala sakte hain"
                },
                math: {
                    algebra: "Algebra mein hum variables ke through problems solve karte hain",
                    geometry: "Geometry shapes aur unke properties ke baare mein hai"
                }
            }
        };
    }

    // Code Analysis
    analyzeCode(code, language) {
        let issues = [];
        let suggestions = [];
        
        // Basic checks
        if (code.includes("print(") && !code.includes(")")) {
            issues.push("Print statement incomplete - closing bracket missing");
        }
        
        if (code.includes("def ") && !code.includes(":")) {
            issues.push("Function definition mein colon missing");
        }
        
        if (code.includes("for ") && !code.includes("in ")) {
            issues.push("For loop mein 'in' keyword missing");
        }
        
        // Complexity check
        const lines = code.split('\n').length;
        if (lines > 20) {
            suggestions.push("Code ko chhote functions mein divide karein");
        }
        
        // Generate suggestions based on language
        if (language === 'python') {
            suggestions.push("Pythonic code likhne ke liye list comprehension use karein");
            suggestions.push("Docstrings add karein for documentation");
        }
        
        if (language === 'javascript') {
            suggestions.push("ES6 features jaise arrow functions use karein");
            suggestions.push("const aur let use karein, var avoid karein");
        }
        
        return {
            issues: issues.length > 0 ? issues : ["No major issues found!"],
            suggestions: suggestions,
            complexity: lines < 10 ? "Simple" : lines < 30 ? "Medium" : "Complex",
            score: Math.max(0, 100 - (issues.length * 10))
        };
    }

    // Generate Code
    generateCode(description, language) {
        const templates = {
            python: {
                factorial: `def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)`,
                calculator: `def calculator(a, b, operation):
    if operation == 'add':
        return a + b
    elif operation == 'subtract':
        return a - b
    elif operation == 'multiply':
        return a * b
    elif operation == 'divide':
        return a / b if b != 0 else "Error: Division by zero"`
            },
            javascript: {
                factorial: `function factorial(n) {
    if (n === 0) return 1;
    return n * factorial(n - 1);
}`,
                calculator: `function calculator(a, b, operation) {
    switch(operation) {
        case 'add': return a + b;
        case 'subtract': return a - b;
        case 'multiply': return a * b;
        case 'divide': return b !== 0 ? a / b : "Error: Division by zero";
        default: return "Invalid operation";
    }
}`
            }
        };

        // Simple keyword matching
        if (description.toLowerCase().includes('factorial')) {
            return templates[language]?.factorial || "Code generation not available for this language";
        }
        
        if (description.toLowerCase().includes('calculator')) {
            return templates[language]?.calculator || "Code generation not available for this language";
        }
        
        return `// ${language.toUpperCase()} Code for: ${description}\n// Implement your logic here`;
    }

    // Explain Concept
    explainConcept(topic, level) {
        const explanations = {
            'python': {
                beginner: "Python ek easy-to-learn programming language hai. Iska syntax simple aur readable hai. Aap Python se web development, data science, AI, aur bahut kuch kar sakte hain.",
                intermediate: "Python mein advanced features jaise decorators, generators, context managers hain. Object-Oriented Programming, functional programming dono support karta hai.",
                advanced: "Python internals, GIL optimization, C extensions, async programming, metaprogramming jaise advanced topics."
            },
            'recursion': {
                beginner: "Recursion ek technique hai jisme ek function khud ko call karta hai. Har baar problem chhota hota jaata hai jab tak base case reach nahi ho jaata.",
                intermediate: "Recursion stack memory use karta hai. Tail recursion optimization important hai. Tree traversal, backtracking mein useful hai.",
                advanced: "Recursion complexity analysis, memoization techniques, converting recursion to iteration."
            },
            'html css': {
                beginner: "HTML website ki structure banata hai, CSS usko style karta hai. Basic tags: <div>, <p>, <h1>. CSS properties: color, margin, padding.",
                intermediate: "CSS Grid, Flexbox se layouts banate hain. Responsive design media queries se. CSS animations aur transitions.",
                advanced: "CSS custom properties, BEM methodology, CSS-in-JS, performance optimization."
            }
        };

        const key = Object.keys(explanations).find(k => 
            topic.toLowerCase().includes(k.toLowerCase())
        );

        if (key && explanations[key][level]) {
            return explanations[key][level];
        }

        // Fallback explanation
        return `${topic} ek important concept hai ${level} level ke liye. Ismein aap basics se lekar advanced tak seekh sakte hain. Practice karte rahein aur examples banate rahein.`;
    }

    // Chat Response
    async getChatResponse(message) {
        // Add to memory
        this.addToMemory(message, 'user');
        
        // Simple AI response logic
        let response = "";
        
        if (message.toLowerCase().includes('hello') || message.includes('नमस्ते')) {
            response = "नमस्ते! Main AI Brain hoon. Aap mujhse coding ya education ke bare mein kuch bhi poochh sakte hain!";
        }
        else if (message.toLowerCase().includes('code') || message.includes('कोड')) {
            response = "Coding ke liye aap mujhse poochh sakte hain:\n1. Code analysis\n2. Bug fixing\n3. Code generation\n4. Best practices";
        }
        else if (message.toLowerCase().includes('learn') || message.includes('सीख')) {
            response = "Learning ke liye main in topics mein help kar sakta hoon:\n- Programming basics\n- Web development\n- Data structures\n- Algorithms";
        }
        else if (message.toLowerCase().includes('thank') || message.includes('धन्यवाद')) {
            response = "You're welcome! Kuch aur help chahiye?";
        }
        else {
            // Try to find in knowledge base
            for (const category in this.knowledge) {
                for (const topic in this.knowledge[category]) {
                    if (message.toLowerCase().includes(topic)) {
                        const knowledge = this.knowledge[category][topic];
                        if (typeof knowledge === 'string') {
                            response = knowledge;
                        } else if (Array.isArray(knowledge)) {
                            response = knowledge[0];
                        } else {
                            const firstKey = Object.keys(knowledge)[0];
                            response = knowledge[firstKey][0];
                        }
                        break;
                    }
                }
                if (response) break;
            }
            
            if (!response) {
                response = "Main samjha ki aap poochh rahe hain: \"" + message + "\"\nAap specifically bataein kya seekhna chahte hain?";
            }
        }
        
        // Add response to memory
        this.addToMemory(response, 'ai');
        
        return response;
    }

    addToMemory(content, type) {
        this.memory.push({
            content: content,
            type: type,
            timestamp: new Date().toLocaleTimeString()
        });
        
        // Keep memory limited
        if (this.memory.length > this.maxMemory) {
            this.memory = this.memory.slice(-this.maxMemory);
        }
    }

    getMemory() {
        return this.memory;
    }
}

// Initialize AI Brain globally
window.aiBrain = new AIBrain();
