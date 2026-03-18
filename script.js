const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-message");
const voiceBtn = document.getElementById("voice-btn");

// Press Enter to send
chatInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendChatMessage();
});

// Voice input setup
let recognition;
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    chatInput.value = transcript;
    sendChatMessage();
  };
} else {
  voiceBtn.disabled = true;
  voiceBtn.title = "Voice not supported in this browser";
}

voiceBtn.addEventListener("click", () => {
  if (recognition) recognition.start();
});

// AI Response Logic
function getAIResponse(message) {
  const msg = message.toLowerCase();

  if (msg.includes("grow") || msg.includes("business")) {
    return "To grow your business, focus on customer acquisition, retention, and scaling profitable areas. Track data and reinvest wisely.";
  }

  if (msg.includes("marketing")) {
    return "Focus on your target audience, create valuable content, and stay consistent. Marketing is about trust and visibility.";
  }

  if (msg.includes("money") || msg.includes("profit")) {
    return "Increase profit by optimizing pricing, reducing waste, and focusing on high-margin offerings.";
  }

  if (msg.includes("startup")) {
    return "Validate your idea first, build a simple version, and improve based on real feedback.";
  }

  return "As your AI consultant, I recommend analyzing your situation, identifying opportunities, and executing a focused strategy.";
}

// Message display
function createMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${sender}`;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.innerText = text;

  msgDiv.appendChild(bubble);
  chatBody.appendChild(msgDiv);

  chatBody.scrollTop = chatBody.scrollHeight;

  if (sender === "ai") speakText(text); // Speak AI responses
}

// Send message function
function sendChatMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  createMessage(text, "user");
  chatInput.value = "";

  // Typing indicator
  const typingDiv = document.createElement("div");
  typingDiv.className = "message ai typing";
  typingDiv.innerText = "AI is typing...";
  chatBody.appendChild(typingDiv);
  chatBody.scrollTop = chatBody.scrollHeight;

  setTimeout(() => {
    chatBody.removeChild(typingDiv);
    const reply = getAIResponse(text);
    createMessage(reply, "ai");
  }, 1000);
}

// Text-to-Speech
function speakText(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.pitch = 1;
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  }
}
