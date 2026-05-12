async function generateFeedback(){

  const answer = document.getElementById("userAnswer").value;
  const feedback = document.getElementById("feedback");

  if(answer.trim() === ""){

    feedback.innerHTML = "Please enter your response first.";
    return;
  }

  feedback.innerHTML = "Analyzing with AI...";

  // REPLACE WITH YOUR GEMINI API KEY
  const API_KEY = "AIzaSyC3vbIZFryJ5YdRvgKZKRpWlUjtV30gd_g";

  const prompt = `
  You are an AI industry mentor.

  Analyze this student response for:
  - Problem solving
  - Communication
  - Technical thinking
  - Team collaboration

  Give:
  1. Strengths
  2. Improvements
  3. Final score out of 10

  Student Response:
  ${answer}
  `;

  try{

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          contents:[
            {
              parts:[
                {
                  text:prompt
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const result = data.candidates[0].content.parts[0].text;

    feedback.innerHTML = result;

  }
  catch(error){

    feedback.innerHTML = "Error generating AI feedback.";

    console.log(error);
  }
}