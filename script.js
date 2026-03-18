const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-message");
const voiceBtn = document.getElementById("voice-btn");

// Prevent errors if elements not loaded
if (chatInput) {
  chatInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendChatMessage();
  });
}

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

if (voiceBtn) {
  voiceBtn.addEventListener("click", () => {
    if (recognition) recognition.start();
  });
}

// AI logic
function getAIResponse(message) {
  const msg = message.toLowerCase();

  if (msg.includes("business")) return "Focus on growth, customer retention, and scaling.";
  if (msg.includes("marketing")) return "Consistency + content + targeting = results.";
  if (msg.includes("money")) return "Cut costs and increase high-margin services.";
  if (msg.includes("startup")) return "Start small, validate fast, scale smart.";

  return "I recommend analyzing your business and executing a focused growth strategy.";
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
  if (!chatInput || !chatBody) return;

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

// Speak
function speak(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }
}
