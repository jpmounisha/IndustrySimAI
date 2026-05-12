let chartInstance = null;

// MAIN SIMULATION
function runSimulation() {

  let students = [
    { name: "Student A", skills: [70, 60, 65] },
    { name: "Student B", skills: [50, 40, 45] },
    { name: "Student C", skills: [85, 80, 78] }
  ];

  let labels = ["Coding", "Communication", "Problem Solving"];

  let leaderboard = "";
  let datasets = [];

  students.forEach(s => {

    let score = (s.skills[0] + s.skills[1] + s.skills[2]) / 3;
    let status = score >= 70 ? "Job Ready" : "Needs Training";

    leaderboard += `
      <tr>
        <td>${s.name}</td>
        <td>${score.toFixed(1)}</td>
        <td>${status}</td>
      </tr>
    `;

    datasets.push({
      label: s.name,
      data: s.skills
    });

  });

  document.getElementById("leaderboard").innerHTML = leaderboard;

  document.getElementById("analysis").innerText =
    "AI analysis complete: Skill gaps identified";

  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(document.getElementById("chart"), {
    type: "bar",
    data: {
      labels: labels,
      datasets: datasets
    }
  });

  document.getElementById("roadmap").innerText =
    "Run AI Mentor for personalized learning plan";
}


// AI MENTOR
function runMentor() {

  document.getElementById("mentorStatus").innerText =
    "🧠 AI analyzing skills...";

  document.getElementById("mentorOutput").innerText = "";

  setTimeout(() => {

    let tips = [
      "Improve Coding: Practice DSA daily",
      "Improve Communication: Join GDs & mock interviews",
      "Improve Problem Solving: Solve aptitude & case studies"
    ];

    let pick = tips[Math.floor(Math.random() * tips.length)];

    document.getElementById("mentorStatus").innerText =
      "✅ Analysis Complete";

    document.getElementById("mentorOutput").innerText = pick;

  }, 1500);
}