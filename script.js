const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-message");
const voiceBtn = document.getElementById("voice-btn");

// Enter key
chatInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendChatMessage();
});

// Voice recognition
let recognition;
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-US';

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    chatInput.value = transcript;
    sendChatMessage();
  };
}

voiceBtn.addEventListener("click", () => {
  if (recognition) recognition.start();
});

// AI logic (still demo — real GPT needs backend)
function getAIResponse(message) {
  const msg = message.toLowerCase();

  if (msg.includes("business")) return "Focus on growth, customers, and scaling.";
  if (msg.includes("marketing")) return "Consistency and value-driven content win.";
  if (msg.includes("money")) return "Increase margins and reduce waste.";
  if (msg.includes("startup")) return "Start small, validate, then scale.";

  return "Our consultants recommend a strategic, data-driven approach.";
}

// Create message
function createMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${sender}`;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.innerText = text;

  msgDiv.appendChild(bubble);
  chatBody.appendChild(msgDiv);

  chatBody.scrollTop = chatBody.scrollHeight;

  if (sender === "ai") speak(text);
}

// Send message
function sendChatMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  createMessage(text, "user");
  chatInput.value = "";

  const typing = document.createElement("div");
  typing.className = "message ai typing";
  typing.innerText = "AI is typing...";
  chatBody.appendChild(typing);

  setTimeout(() => {
    typing.remove();
    const reply = getAIResponse(text);
    createMessage(reply, "ai");
  }, 1000);
}

// Speech
function speak(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }
}

// Form
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Consultation request sent!");
});
