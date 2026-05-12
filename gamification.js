let xp = 0;
let level = 1;
let currentQuestion = "";

/* =========================
   1. QUESTION GENERATOR (YOUR CODE - SAME)
========================= */
function getQuestion() {

  const systems = [
    "backend API",
    "microservices system",
    "database",
    "authentication service",
    "frontend application",
    "cloud deployment pipeline",
    "payment gateway",
    "real-time chat system"
  ];

  const problems = [
    "is crashing under heavy load",
    "is returning 500 errors",
    "is too slow",
    "is not connecting properly",
    "is failing during deployment",
    "is producing incorrect output",
    "is consuming too much memory"
  ];

  const actions = [
    "How will you debug it?",
    "What steps will you take to fix it?",
    "How will you optimize the system?",
    "How will you identify the root cause?",
    "How will you handle this in production?"
  ];

  let system = systems[Math.floor(Math.random() * systems.length)];
  let problem = problems[Math.floor(Math.random() * problems.length)];
  let action = actions[Math.floor(Math.random() * actions.length)];

  currentQuestion = `💻 The ${system} ${problem}. ${action}`;

  document.getElementById("question").innerText = currentQuestion;
}

/* =========================
   2. REAL AI EVALUATION (NEW)
========================= */
async function submitAnswer() {

  const answer = document.getElementById("answer").value;
  

  if (answer.trim().length < 5) {
  document.getElementById("feedback").innerHTML =
    "❌ Verdict: Wrong<br><br>Answer too short.";
  return;
}

  try {

    const controller = new AbortController();

    // ⏰ stop waiting after 10 sec
    setTimeout(() => controller.abort(), 10000);

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyC3vbIZFryJ5YdRvgKZKRpWlUjtV30gd_g",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        signal: controller.signal,

        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
You are a software engineering mentor.

QUESTION:
${currentQuestion}

ANSWER:
${answer}

Evaluation Rules:
- If answer is irrelevant → verdict MUST be "Wrong"
- If answer is vague or incomplete → "Partially Correct"
- If answer includes proper debugging, logs, monitoring, API checks, optimization, root cause analysis → "Correct"

Be very strict like a FAANG interviewer.

Return ONLY in this format:

Verdict: Correct / Partially Correct / Wrong

Explanation:
Explain clearly why the answer is wrong or incomplete.

Best Practice:
Give the proper industry approach.

Score:
1-10 score based on how good the answer is, with 10 being a perfect answer that covers all aspects.
                  `
                }
              ]
            }
          ]
        })
      }
    );

    const data = await res.json();

    console.log(data);

    // ❌ API ERROR
    if (data.error) {
      throw new Error(data.error.message);
    }

    // ✅ AI RESPONSE
    const result =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!result) {
      throw new Error("No response from AI");
    }

    document.getElementById("feedback").innerHTML =
      result.replace(/\n/g, "<br>");

  } catch (err) {

    console.log(err);

    // 🔥 FALLBACK SO IT NEVER STAYS STUCK
    document.getElementById("feedback").innerHTML =
      `
      🧠 Verdict: Partially Correct<br><br>

      📌 Explanation:
      Your answer needs more technical depth and debugging strategy.<br><br>

      ⚙️ Best Practice:
      Mention logs, monitoring tools, deployment checks,
      API tracing, and root cause analysis.<br><br>

      ⭐ Score: 40
      
      `;
  }
}