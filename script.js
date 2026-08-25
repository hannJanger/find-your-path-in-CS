/* ---------- QUIZ DATA ---------- */

const questions = [
    {
        key: "question1",
        text: "You're given a new project and complete freedom to decide what to do. What sounds most satisfying?",
        type: "single",
        options: [
            { value: "software", label: "Building the logic that makes everything work" },
            { value: "web", label: "Creating something people can interact with online" },
            { value: "ai", label: "Making a system learn from examples" },
            { value: "data", label: "Finding patterns hidden in information" },
            { value: "cybersecurity", label: "Figuring out how to protect the system" },
            { value: "uiux", label: "Making the experience beautiful and easy to use" }
        ]
    },
    {
        key: "question2",
        text: "Imagine you could spend an entire afternoon learning one of these. Which would you choose?",
        type: "single",
        options: [
            { value: "software", label: "How apps and software are built behind the scenes" },
            { value: "web", label: "How websites become interactive and responsive" },
            { value: "ai", label: "How computers can learn, predict, and make decisions" },
            { value: "data", label: "How large amounts of data can reveal useful patterns" },
            { value: "cybersecurity", label: "How hackers find weaknesses and how systems defend against them" },
            { value: "uiux", label: "How to design digital experiences people love using" }
        ]
    },
    {
        key: "question3",
        text: "You've built something, but it suddenly stops working. What would you most likely do first?",
        type: "single",
        options: [
            { value: "software", label: "Break the problem down and figure out exactly where it went wrong" },
            { value: "ai", label: "Try different approaches until you discover what works" },
            { value: "data", label: "Look for a pattern that might explain why it's happening" },
            { value: "cybersecurity", label: "Check whether something could have caused a security problem" },
            { value: "uiux", label: "Look at the experience from the user's point of view" },
            { value: "web", label: "Test how it behaves across different devices or situations" }
        ]
    },
    {
        key: "question4",
        text: "Which challenges would keep you curious the longest?",
        type: "multi",
        maxSelect: 2,
        options: [
            { value: "software", label: "Designing a complex system that has to work reliably" },
            { value: "ai", label: "Teaching a computer to recognize something it hasn't seen before" },
            { value: "data", label: "Turning a huge amount of information into a useful conclusion" },
            { value: "cybersecurity", label: "Finding and fixing a hidden weakness before someone exploits it" },
            { value: "web", label: "Creating an online experience that feels smooth and effortless" },
            { value: "uiux", label: "Turning a complicated idea into something simple and enjoyable to use" }
        ]
    },
    {
        key: "question5",
        text: "When you use a new app or website, what are you most likely to notice?",
        type: "single",
        options: [
            { value: "software", label: "How smoothly everything works behind the scenes" },
            { value: "web", label: "How quickly and reliably the website responds" },
            { value: "ai", label: "How intelligently it seems to adapt or make suggestions" },
            { value: "data", label: "The information, charts, or patterns it shows" },
            { value: "cybersecurity", label: "How safely it handles personal information" },
            { value: "uiux", label: "The layout, visuals, and overall experience" }
        ]
    },
    {
        key: "question6",
        text: "You have the time and freedom to create one project. Which would you be most excited to show someone?",
        type: "single",
        options: [
            { value: "software", label: "An app that solves a real everyday problem" },
            { value: "web", label: "A beautiful interactive website" },
            { value: "ai", label: "An intelligent tool that can learn and make predictions" },
            { value: "data", label: "A project that turns complicated data into clear insights" },
            { value: "cybersecurity", label: "A system designed to detect and prevent cyber threats" },
            { value: "uiux", label: "A digital product with an incredibly thoughtful user experience" }
        ]
    },
    {
        key: "question7",
        text: "Which statement feels most like you?",
        type: "single",
        options: [
            { value: "software", label: "I enjoy figuring out how things work and making them work better." },
            { value: "web", label: "I like creating things that people can see, interact with, and enjoy." },
            { value: "ai", label: "I'm fascinated by how technology can learn, adapt, and become smarter." },
            { value: "data", label: "I naturally look for patterns, connections, and meaning in information." },
            { value: "cybersecurity", label: "I'm curious about what could go wrong and how things can be protected." },
            { value: "uiux", label: "I care about how things look, feel, and make people experience them." }
        ]
    }
];

/* ---------- STATE ---------- */

let scores = {
    software: 0,
    web: 0,
    ai: 0,
    data: 0,
    cybersecurity: 0,
    uiux: 0
};

let unsureCount = 0;
let answers = {};
let currentIndex = 0;
let pendingSelection = null;
let pendingUnsure = false;

/* ---------- SCORING ---------- */

function setAnswer(key, choice) {
    if (answers[key] && answers[key] !== "unsure") {
        if (Array.isArray(answers[key])) {
            answers[key].forEach(old => { scores[old] -= 2; });
        } else {
            scores[answers[key]] -= 2;
        }
    }

    answers[key] = choice;

    if (Array.isArray(choice)) {
        choice.forEach(val => { scores[val] += 2; });
    } else if (choice !== "unsure") {
        scores[choice] += 2;
    }
}

function resetScores() {
    scores = { software: 0, web: 0, ai: 0, data: 0, cybersecurity: 0, uiux: 0 };
    unsureCount = 0;
    answers = {};
    currentIndex = 0;
}

/* ---------- SCREEN TRANSITIONS ---------- */

function renderQuestion(html) {
    const container = document.getElementById("question");
    container.classList.remove("fade-in");
    void container.offsetWidth; // force reflow so the animation restarts every time
    container.innerHTML = html;
    container.classList.add("fade-in");
}

function discoverPath() {
    const welcomeSection = document.querySelector('.welcome');
    if (welcomeSection) welcomeSection.style.display = 'none';
    resetScores();
    renderCurrentQuestion();
}

function goToStart() {
    const welcomeSection = document.querySelector('.welcome');
    const questionSection = document.getElementById('question');
    if (welcomeSection) welcomeSection.style.display = '';
    if (questionSection) {
        questionSection.classList.remove('fade-in');
        questionSection.innerHTML = '';
    }
    resetScores();
}

/* ---------- QUESTION RENDERING ---------- */

function renderCurrentQuestion() {
    const q = questions[currentIndex];
    const existing = answers[q.key];

    if (q.type === "multi") {
        pendingSelection = Array.isArray(existing) ? existing.slice() : [];
    } else {
        pendingSelection = (existing && existing !== "unsure") ? existing : null;
    }
    pendingUnsure = existing === "unsure";

    const optionsHtml = q.options.map(opt => {
        const isSelected = q.type === "multi"
            ? pendingSelection.includes(opt.value)
            : pendingSelection === opt.value;
        return `<button class="${isSelected ? 'selected' : ''}" onclick="selectOption('${opt.value}', this)">${opt.label}</button>`;
    }).join("");

    const multiHint = q.type === "multi"
        ? `<p><strong>You can choose up to ${q.maxSelect}.</strong></p>`
        : "";

    const backButton = currentIndex > 0
        ? `<button class="back-btn" onclick="goBack()">← Go Back</button>`
        : "";

    renderQuestion(`
        <p>Question ${currentIndex + 1} of ${questions.length}</p>
        <h2>${q.text}</h2>
        ${multiHint}
        <p id="limitMessage" class="limit-message"></p>
        ${optionsHtml}
        <button class="${pendingUnsure ? 'selected' : ''}" onclick="selectUnsure(this)">I'm not sure yet — I'm still exploring</button>
        <button class="next-btn" onclick="confirmAndNext()">Next</button>
        ${backButton}
    `);
}

/* ---------- SELECTION (no full re-render, just class toggling) ---------- */

function selectOption(value, button) {
    const q = questions[currentIndex];

    pendingUnsure = false;
    const unsureBtn = [...document.querySelectorAll('#question button')].find(b => b.textContent.includes("I'm not sure yet"));
    if (unsureBtn) unsureBtn.classList.remove('selected');

    if (q.type === "multi") {
        const idx = pendingSelection.indexOf(value);
        if (idx !== -1) {
            pendingSelection.splice(idx, 1);
            button.classList.remove('selected');
        } else {
            if (pendingSelection.length >= q.maxSelect) {
                showLimitMessage(`You can only choose ${q.maxSelect}`);
                return;
            }
            pendingSelection.push(value);
            button.classList.add('selected');
        }
    } else {
        pendingSelection = value;
        document.querySelectorAll('#question button').forEach(b => {
            if (b !== button) b.classList.remove('selected');
        });
        button.classList.add('selected');
    }
}

function selectUnsure(button) {
    const q = questions[currentIndex];
    pendingUnsure = true;
    pendingSelection = q.type === "multi" ? [] : null;
    document.querySelectorAll('#question button').forEach(b => b.classList.remove('selected'));
    button.classList.add('selected');
}

function showLimitMessage(text) {
    const msg = document.getElementById("limitMessage");
    if (!msg) return;
    msg.textContent = text;
    msg.classList.add("show");
    setTimeout(() => { msg.classList.remove("show"); }, 1500);
}

/* ---------- NEXT / BACK ---------- */

function confirmAndNext() {
    const q = questions[currentIndex];

    if (pendingUnsure) {
        if (answers[q.key] !== "unsure") unsureCount++;
        setAnswer(q.key, "unsure");
    } else if (q.type === "multi") {
        if (pendingSelection.length === 0) {
            showLimitMessage("Choose at least one, or tap \u201cI'm not sure yet\u201d");
            return;
        }
        setAnswer(q.key, pendingSelection.slice());
    } else {
        if (pendingSelection === null) {
            showLimitMessage("Please choose an option to continue");
            return;
        }
        setAnswer(q.key, pendingSelection);
    }

    if (currentIndex < questions.length - 1) {
        currentIndex++;
        renderCurrentQuestion();
    } else {
        showResult();
    }
}

function goBack() {
    if (currentIndex > 0) {
        currentIndex--;
        renderCurrentQuestion();
    }
}

/* ---------- RESULT ---------- */

function showResult() {

    if (unsureCount >= 4) {
        showExploringResult();
        return;
    }

    let highestScore = Math.max(
        scores.software, scores.web, scores.ai,
        scores.data, scores.cybersecurity, scores.uiux
    );

    let result = "", description = "", details = "", enjoy = "";

    if (highestScore === scores.software) {
        result = "Software Development";
        description = "You may enjoy building software, solving problems, and turning ideas into working applications.";
        details = "This path could suit you if you enjoy logical thinking, solving challenges, and creating useful programs from scratch.";
        details += "<br><br><strong>You might enjoy:</strong> Programming, Problem Solving, Software Design";
        details += "<br><br><strong>Possible Career Roles:</strong><br>• Software Engineer<br>• Software Developer<br>• Application Developer";
        enjoy = `<li>Building applications</li><li>Solving programming problems</li><li>Creating useful software</li>`;
    }
    else if (highestScore === scores.web) {
        result = "Web Development";
        description = "You may enjoy creating websites and interactive applications that people can actually use.";
        details = "This path could suit you if you enjoy creating interactive websites, learning how applications work, and building things people can use.";
        details += "<br><br><strong>You might enjoy:</strong> HTML, CSS, JavaScript";
        details += "<br><br><strong>Possible Career Roles:</strong><br>• Frontend Developer<br>• Web Developer<br>• Full-Stack Developer";
        enjoy = `<li>Creating websites</li><li>Designing interactive pages</li><li>Building web applications</li>`;
    }
    else if (highestScore === scores.ai) {
        result = "AI & Machine Learning";
        description = "You may enjoy exploring intelligent systems, patterns, automation, and teaching computers to learn.";
        details = "This path could suit you if you enjoy solving problems, experimenting with technology, and discovering how computers can learn from data.";
        details += "<br><br><strong>You might enjoy:</strong> Python, Machine Learning, Data Analysis";
        details += "<br><br><strong>Possible Career Roles:</strong><br>• AI Engineer<br>• Machine Learning Engineer<br>• AI Developer";
        enjoy = `<li>Building intelligent systems</li><li>Solving complex problems</li><li>Working with data and patterns</li>`;
    }
    else if (highestScore === scores.data) {
        result = "Data Science";
        description = "You may enjoy finding patterns, analysing information, and turning data into useful insights.";
        details = "This path could suit you if you enjoy analysing information, finding patterns, and using data to answer questions.";
        details += "<br><br><strong>You might enjoy:</strong> Python, Data Analysis, Statistics";
        details += "<br><br><strong>Possible Career Roles:</strong><br>• Data Scientist<br>• Data Analyst<br>• Machine Learning Analyst";
        enjoy = `<li>Analysing data</li><li>Finding patterns and insights</li><li>Working with numbers and information</li>`;
    }
    else if (highestScore === scores.cybersecurity) {
        result = "Cybersecurity";
        description = "You may enjoy protecting systems, investigating problems, and thinking about how technology can be secured.";
        details = "This path could suit you if you enjoy investigating problems, understanding how systems work, and keeping information secure.";
        details += "<br><br><strong>You might enjoy:</strong> Network Security, Ethical Hacking, Digital Forensics";
        details += "<br><br><strong>Possible Career Roles:</strong><br>• Cybersecurity Analyst<br>• Security Engineer<br>• Security Specialist";
        enjoy = `<li>Protecting systems and information</li><li>Investigating security problems</li><li>Thinking about threats and solutions</li>`;
    }
    else {
        result = "UI/UX Design";
        description = "You may enjoy combining creativity and technology to make digital experiences beautiful and easy to use.";
        details = "This path could suit you if you enjoy creativity, understanding users, and making digital products easy and enjoyable to use.";
        details += "<br><br><strong>You might enjoy:</strong> User Research, Wireframing, Interface Design";
        details += "<br><br><strong>Possible Career Roles:</strong><br>• UX Designer<br>• UI Designer<br>• Product Designer";
        enjoy = `<li>Creating visual designs</li><li>Designing user-friendly experiences</li><li>Combining creativity with technology</li>`;
    }

    renderQuestion(`
        <h2>Your strongest match is...</h2>
        <h1>${result}</h1>
        <p>${description}</p>
        <h3>Why this might suit you</h3>
        <p>${details}</p>
        <h3>You might enjoy</h3>
        <ul>${enjoy}</ul>
        <button class="restart-btn" onclick="goToStart()">Take the Test Again</button>
    `);
}

function showExploringResult() {
    renderQuestion(`
        <h2>Your path is still unfolding...</h2>
        <h1>Still Exploring</h1>
        <p>
            You don't have to know your perfect CS path yet.
            Being curious about different areas is a great place to start.
        </p>
        <h3>Try exploring these areas</h3>
        <ul>
            <li>Software Development</li>
            <li>Web Development</li>
            <li>AI & Machine Learning</li>
            <li>Data Science</li>
            <li>Cybersecurity</li>
            <li>UI/UX Design</li>
        </ul>
        <p>
            Explore a little, build something small, and see what makes you curious.
            Your path doesn't have to be decided today.
        </p>
        <button class="restart-btn" onclick="goToStart()">Explore Again</button>
    `);
}
