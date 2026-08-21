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
let q4Selections = [];

function setAnswer(question, choice) {
    if (answers[question] && answers[question] !== "unsure") {
        if (Array.isArray(answers[question])) {
            answers[question].forEach(oldChoice => {
                scores[oldChoice] -= 2;
            });
        } else {
            scores[answers[question]] -= 2;
        }
    }

    answers[question] = choice;

    if (Array.isArray(choice)) {
        choice.forEach(newChoice => {
            scores[newChoice] += 2;
        });
    } else if (choice !== "unsure") {
        scores[choice] += 2;
    }
}

function resetScores() {
    scores.software = 0;
    scores.web = 0;
    scores.ai = 0;
    scores.data = 0;
    scores.cybersecurity = 0;
    scores.uiux = 0;

    unsureCount = 0;
    answers = {};
    q4Selections = [];
}

function discoverPath() {
    resetScores();
    showQuestionOne();
}

function chooseUnsure(questionKey) {
    if (answers[questionKey] !== "unsure") {
        unsureCount++;
    }
    setAnswer(questionKey, "unsure");
    nextQuestion();
}

function nextQuestion() {
    if (!answers.question1) {
        showQuestionTwo();
    } else if (!answers.question2) {
        showQuestionThree();
    } else if (!answers.question3) {
        showQuestionFour();
    } else if (!answers.question4) {
        showQuestionFive();
    } else if (!answers.question5) {
        showQuestionSix();
    } else if (!answers.question6) {
        showQuestionSeven();
    } else {
        showResult();
    }
}

/* QUESTION 1 */

function showQuestionOne() {
    document.getElementById("question").innerHTML = `
        <p>Question 1 of 7 ✨</p>

        <h2>You're given a new project and complete freedom to decide what to do. What sounds most satisfying?</h2>

        <button onclick="chooseQ1('software')">🧩 Building the logic that makes everything work</button>
        <button onclick="chooseQ1('web')">🌐 Creating something people can interact with online</button>
        <button onclick="chooseQ1('ai')">🤖 Making a system learn from examples</button>
        <button onclick="chooseQ1('data')">📊 Finding patterns hidden in information</button>
        <button onclick="chooseQ1('cybersecurity')">🔐 Figuring out how to protect the system</button>
        <button onclick="chooseQ1('uiux')">🎨 Making the experience beautiful and easy to use</button>
        <button onclick="chooseUnsure('question1')">🌷 I'm not sure yet — I'm still exploring</button>
    `;
}

function chooseQ1(choice) {
    setAnswer("question1", choice);
    showQuestionTwo();
}

/* QUESTION 2 */

function showQuestionTwo() {
    document.getElementById("question").innerHTML = `
        <p>Question 2 of 7 ✨</p>

        <h2>Imagine you could spend an entire afternoon learning one of these. Which would you choose?</h2>

        <button onclick="chooseQ2('software')">🛠️ How apps and software are built behind the scenes</button>
        <button onclick="chooseQ2('web')">🌐 How websites become interactive and responsive</button>
        <button onclick="chooseQ2('ai')">🤖 How computers can learn, predict, and make decisions</button>
        <button onclick="chooseQ2('data')">🔎 How large amounts of data can reveal useful patterns</button>
        <button onclick="chooseQ2('cybersecurity')">🛡️ How hackers find weaknesses and how systems defend against them</button>
        <button onclick="chooseQ2('uiux')">🎨 How to design digital experiences people love using</button>
        <button onclick="chooseUnsure('question2')">🌷 I'm not sure yet — I'm still exploring</button>
        <button onclick="showQuestionOne()">← Go Back</button>
    `;
}

function chooseQ2(choice) {
    setAnswer("question2", choice);
    showQuestionThree();
}

/* QUESTION 3 */

function showQuestionThree() {
    document.getElementById("question").innerHTML = `
        <p>Question 3 of 7 ✨</p>

        <h2>You've built something, but it suddenly stops working. What would you most likely do first?</h2>

        <button onclick="chooseQ3('software')">🔍 Break the problem down and figure out exactly where it went wrong</button>
        <button onclick="chooseQ3('ai')">🧪 Try different approaches until you discover what works</button>
        <button onclick="chooseQ3('data')">🧠 Look for a pattern that might explain why it's happening</button>
        <button onclick="chooseQ3('cybersecurity')">🛡️ Check whether something could have caused a security problem</button>
        <button onclick="chooseQ3('uiux')">🎨 Look at the experience from the user's point of view</button>
        <button onclick="chooseQ3('web')">🌐 Test how it behaves across different devices or situations</button>
        <button onclick="chooseUnsure('question3')">🌷 I'm not sure yet — I'm still exploring</button>
        <button onclick="showQuestionTwo()">← Go Back</button>
    `;
}

function chooseQ3(choice) {
    setAnswer("question3", choice);
    showQuestionFour();
}

/* QUESTION 4 - MULTIPLE CHOICE */

function showQuestionFour() {
    q4Selections = [];

    document.getElementById("question").innerHTML = `
        <p>Question 4 of 7 ✨</p>

        <h2>Which challenges would keep you curious the longest?</h2>

        <p><strong>You can choose up to 2. ✨</strong></p>

        <p id="limitMessage" class="limit-message"></p>

        <button onclick="toggleQ4('software', this)">🧠 Designing a complex system that has to work reliably</button>
        <button onclick="toggleQ4('ai', this)">🤖 Teaching a computer to recognize something it hasn't seen before</button>
        <button onclick="toggleQ4('data', this)">📊 Turning a huge amount of information into a useful conclusion</button>
        <button onclick="toggleQ4('cybersecurity', this)">🔐 Finding and fixing a hidden weakness before someone exploits it</button>
        <button onclick="toggleQ4('web', this)">🌐 Creating an online experience that feels smooth and effortless</button>
        <button onclick="toggleQ4('uiux', this)">🎨 Turning a complicated idea into something simple and enjoyable to use</button>
        <button onclick="chooseQ4Unsure()">🌷 I'm not sure yet — I'm still exploring</button>
        <button onclick="submitQ4()">Continue ✨</button>
        <button onclick="showQuestionThree()">← Go Back</button>
    `;
}

function toggleQ4(choice, button) {

    let index = q4Selections.indexOf(choice);

    if (index !== -1) {
        q4Selections.splice(index, 1);
        button.classList.remove("selected");
    } else {

        if (q4Selections.length >= 2) {
            showLimitMessage("You can only choose 2 🌷");
            return;
        }

        q4Selections.push(choice);
        button.classList.add("selected");
    }
}

function showLimitMessage(text) {
    const msg = document.getElementById("limitMessage");
    if (!msg) return;

    msg.textContent = text;
    msg.classList.add("show");

    setTimeout(() => {
        msg.classList.remove("show");
    }, 1500);
}

function chooseQ4Unsure() {
    if (answers.question4 !== "unsure") {
        unsureCount++;
    }
    answers.question4 = "unsure";
    q4Selections = [];
    showQuestionFive();
}

function submitQ4() {

    if (q4Selections.length === 0) {
        showLimitMessage("Choose at least one, or tap “I'm not sure yet” 🌷");
        return;
    }

    setAnswer("question4", q4Selections.slice());
    showQuestionFive();
}

/* QUESTION 5 */

function showQuestionFive() {
    document.getElementById("question").innerHTML = `
        <p>Question 5 of 7 ✨</p>

        <h2>When you use a new app or website, what are you most likely to notice?</h2>

        <button onclick="chooseQ5('software')">⚙️ How smoothly everything works behind the scenes</button>
        <button onclick="chooseQ5('web')">🌐 How quickly and reliably the website responds</button>
        <button onclick="chooseQ5('ai')">🤖 How intelligently it seems to adapt or make suggestions</button>
        <button onclick="chooseQ5('data')">📊 The information, charts, or patterns it shows</button>
        <button onclick="chooseQ5('cybersecurity')">🔒 How safely it handles personal information</button>
        <button onclick="chooseQ5('uiux')">🎨 The layout, visuals, and overall experience</button>
        <button onclick="chooseUnsure('question5')">🌷 I'm not sure yet — I'm still exploring</button>
        <button onclick="showQuestionFour()">← Go Back</button>
    `;
}

function chooseQ5(choice) {
    setAnswer("question5", choice);
    showQuestionSix();
}

/* QUESTION 6 */

function showQuestionSix() {
    document.getElementById("question").innerHTML = `
        <p>Question 6 of 7 ✨</p>

        <h2>You have the time and freedom to create one project. Which would you be most excited to show someone?</h2>

        <button onclick="chooseQ6('software')">💻 An app that solves a real everyday problem</button>
        <button onclick="chooseQ6('web')">🌐 A beautiful interactive website</button>
        <button onclick="chooseQ6('ai')">🤖 An intelligent tool that can learn and make predictions</button>
        <button onclick="chooseQ6('data')">📊 A project that turns complicated data into clear insights</button>
        <button onclick="chooseQ6('cybersecurity')">🔐 A system designed to detect and prevent cyber threats</button>
        <button onclick="chooseQ6('uiux')">🎨 A digital product with an incredibly thoughtful user experience</button>
        <button onclick="chooseUnsure('question6')">🌷 I'm not sure yet — I'm still exploring</button>
        <button onclick="showQuestionFive()">← Go Back</button>
    `;
}

function chooseQ6(choice) {
    setAnswer("question6", choice);
    showQuestionSeven();
}

/* QUESTION 7 */

function showQuestionSeven() {
    document.getElementById("question").innerHTML = `
        <p>Question 7 of 7 ✨</p>

        <h2>Which statement feels most like you?</h2>

        <button onclick="chooseQ7('software')">🧩 I enjoy figuring out how things work and making them work better.</button>
        <button onclick="chooseQ7('web')">🌐 I like creating things that people can see, interact with, and enjoy.</button>
        <button onclick="chooseQ7('ai')">🤖 I'm fascinated by how technology can learn, adapt, and become smarter.</button>
        <button onclick="chooseQ7('data')">📊 I naturally look for patterns, connections, and meaning in information.</button>
        <button onclick="chooseQ7('cybersecurity')">🔐 I'm curious about what could go wrong and how things can be protected.</button>
        <button onclick="chooseQ7('uiux')">🎨 I care about how things look, feel, and make people experience them.</button>
        <button onclick="chooseUnsure('question7')">🌷 I'm not sure yet — I'm still exploring</button>
        <button onclick="showQuestionSix()">← Go Back</button>
    `;
}

function chooseQ7(choice) {
    setAnswer("question7", choice);
    showResult();
}

/* RESULT */

function showResult() {

    if (unsureCount >= 4) {
        showExploringResult();
        return;
    }

    let highestScore = Math.max(
        scores.software,
        scores.web,
        scores.ai,
        scores.data,
        scores.cybersecurity,
        scores.uiux
    );

    let result = "";
    let description = "";
    let details = "";
    let enjoy = "";

    if (highestScore === scores.software) {

        result = "Software Development 💻";
        description = "You may enjoy building software, solving problems, and turning ideas into working applications.";
        details = "This path could suit you if you enjoy logical thinking, solving challenges, and creating useful programs from scratch.";
        details += "<br><br><strong>You might enjoy:</strong> Programming, Problem Solving, Software Design";
        details += "<br><br><strong>Possible Career Roles:</strong><br>• Software Engineer<br>• Software Developer<br>• Application Developer";
        enjoy = `
            <li>💻 Building applications</li>
            <li>🧩 Solving programming problems</li>
            <li>⚙️ Creating useful software</li>
        `;
    }

    else if (highestScore === scores.web) {

        result = "Web Development 🌐";
        description = "You may enjoy creating websites and interactive applications that people can actually use.";
        details = "This path could suit you if you enjoy creating interactive websites, learning how applications work, and building things people can use.";
        details += "<br><br><strong>You might enjoy:</strong> HTML, CSS, JavaScript";
        details += "<br><br><strong>Possible Career Roles:</strong><br>• Frontend Developer<br>• Web Developer<br>• Full-Stack Developer";
        enjoy = `
            <li>🌐 Creating websites</li>
            <li>🎨 Designing interactive pages</li>
            <li>💻 Building web applications</li>
        `;
    }

    else if (highestScore === scores.ai) {

        result = "AI & Machine Learning 🤖";
        description = "You may enjoy exploring intelligent systems, patterns, automation, and teaching computers to learn.";
        details = "This path could suit you if you enjoy solving problems, experimenting with technology, and discovering how computers can learn from data.";
        details += "<br><br><strong>You might enjoy:</strong> Python, Machine Learning, Data Analysis";
        details += "<br><br><strong>Possible Career Roles:</strong><br>• AI Engineer<br>• Machine Learning Engineer<br>• AI Developer";
        enjoy = `
            <li>🤖 Building intelligent systems</li>
            <li>🧠 Solving complex problems</li>
            <li>📊 Working with data and patterns</li>
        `;
    }

    else if (highestScore === scores.data) {

        result = "Data Science 📊";
        description = "You may enjoy finding patterns, analysing information, and turning data into useful insights.";
        details = "This path could suit you if you enjoy analysing information, finding patterns, and using data to answer questions.";
        details += "<br><br><strong>You might enjoy:</strong> Python, Data Analysis, Statistics";
        details += "<br><br><strong>Possible Career Roles:</strong><br>• Data Scientist<br>• Data Analyst<br>• Machine Learning Analyst";
        enjoy = `
            <li>📊 Analysing data</li>
            <li>🔎 Finding patterns and insights</li>
            <li>📈 Working with numbers and information</li>
        `;
    }

    else if (highestScore === scores.cybersecurity) {

        result = "Cybersecurity 🔐";
        description = "You may enjoy protecting systems, investigating problems, and thinking about how technology can be secured.";
        details = "This path could suit you if you enjoy investigating problems, understanding how systems work, and keeping information secure.";
        details += "<br><br><strong>You might enjoy:</strong> Network Security, Ethical Hacking, Digital Forensics";
        details += "<br><br><strong>Possible Career Roles:</strong><br>• Cybersecurity Analyst<br>• Security Engineer<br>• Security Specialist";
        enjoy = `
            <li>🔐 Protecting systems and information</li>
            <li>🕵️ Investigating security problems</li>
            <li>🧠 Thinking about threats and solutions</li>
        `;
    }

    else {

        result = "UI/UX Design 🎨";
        description = "You may enjoy combining creativity and technology to make digital experiences beautiful and easy to use.";
        details = "This path could suit you if you enjoy creativity, understanding users, and making digital products easy and enjoyable to use.";
        details += "<br><br><strong>You might enjoy:</strong> User Research, Wireframing, Interface Design";
        details += "<br><br><strong>Possible Career Roles:</strong><br>• UX Designer<br>• UI Designer<br>• Product Designer";
        enjoy = `
            <li>🎨 Creating visual designs</li>
            <li>🖱️ Designing user-friendly experiences</li>
            <li>✨ Combining creativity with technology</li>
        `;
    }

    document.getElementById("question").innerHTML = `
        <h2>Your strongest match is... 🎀</h2>
        <h1>${result}</h1>
        <p>${description}</p>
        <h3>Why this might suit you ⭐</h3>
        <p>${details}</p>
        <h3>You might enjoy 💡</h3>
        <ul>${enjoy}</ul>
        <button class="restart-btn" onclick="discoverPath()">Take the Test Again 🌷</button>
    `;
}

/* STILL EXPLORING RESULT */

function showExploringResult() {

    document.getElementById("question").innerHTML = `
        <h2>Your path is still unfolding... 🌱</h2>
        <h1>Still Exploring ✨</h1>

        <p>
            You don't have to know your perfect CS path yet.
            Being curious about different areas is a great place to start.
        </p>

        <h3>Try exploring these areas 🌷</h3>

        <ul>
            <li>💻 Software Development</li>
            <li>🌐 Web Development</li>
            <li>🤖 AI & Machine Learning</li>
            <li>📊 Data Science</li>
            <li>🔐 Cybersecurity</li>
            <li>🎨 UI/UX Design</li>
        </ul>

        <p>
            Explore a little, build something small, and see what makes you curious.
            Your path doesn't have to be decided today. 🦋
        </p>

        <button class="restart-btn" onclick="discoverPath()">Explore Again 🌷</button>
    `;
}
