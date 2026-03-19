const chatToggle = document.getElementById("chat-toggle");
const chatWidget = document.getElementById("chat-widget");
const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-message");
const micBtn = document.getElementById("mic-btn");

/* TOGGLE CHAT */
chatToggle.onclick = () => {
  chatWidget.classList.toggle("hidden");
};

function toggleChat() {
  chatWidget.classList.toggle("hidden");
}

/* 🧠 SMART AI (IMPROVED BUT SIMPLE OUTPUT) */
function getAIResponse(msg) {
  msg = msg.toLowerCase();

  if (msg.includes("setup") || msg.includes("register"))
    return "We help you fully register and set up your business in East Africa including licensing and compliance.";

  if (msg.includes("market") || msg.includes("entry"))
    return "We provide market entry strategies, feasibility studies and help you connect with key partners in Africa.";

  if (msg.includes("services"))
    return "We offer business setup, consulting, market entry, tax advisory and business development services.";

  if (msg.includes("africa"))
    return "We specialize in African markets with strong local expertise and global standards.";

  if (msg.includes("price") || msg.includes("cost"))
    return "Pricing depends on your needs. I recommend booking a consultation for a tailored solution.";

  if (msg.includes("contact") || msg.includes("book"))
    return "You can book a consultation using the form or contact us via WhatsApp.";

  return "We help businesses grow, expand and scale strategically across Africa.";
}

/* 💬 KEEP YOUR ORIGINAL MESSAGE STYLE */
function createMessage(text) {
  const div = document.createElement("div");
  div.innerText = text;
  chatBody.appendChild(div);

  chatBody.scrollTop = chatBody.scrollHeight;
}

/* 🔊 VOICE */
function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  window.speechSynthesis.speak(speech);
}

/* SEND MESSAGE */
function sendChatMessage() {
  const text = chatInput.value;
  if (!text) return;

  createMessage("You: " + text);
  chatInput.value = "";

  // typing indicator (simple text, no UI change)
  const typing = document.createElement("div");
  typing.innerText = "AI is typing...";
  chatBody.appendChild(typing);

  setTimeout(() => {
    chatBody.removeChild(typing);

    const reply = getAIResponse(text);
    createMessage("AI: " + reply);

    // voice reply
    speak(reply);

  }, 800);
}

/* ENTER KEY */
chatInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendChatMessage();
});

/* 🎤 MIC (NO UI CHANGE) */
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";

  micBtn.onclick = () => {
    recognition.start();
    micBtn.classList.add("listening");
  };

  recognition.onresult = (event) => {
    chatInput.value = event.results[0][0].transcript;
    micBtn.classList.remove("listening");
  };

  recognition.onerror = () => {
    micBtn.classList.remove("listening");
  };
}

/* CLICKABLE SECTIONS */
function toggleCard(card) {
  card.classList.toggle("active");
}

function toggleAbout(section) {
  section.classList.toggle("active");
}

/* WHATSAPP BOOKING */
document.getElementById("contact-form").onsubmit = function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  const url = `https://wa.me/254757902314?text=Hello, my name is ${name}. ${message}`;
  window.open(url, "_blank");
};

/* MAP */
function openMap() {
  window.open("https://www.google.com/maps?q=Upper+Hill+Nairobi");
}

function getDirections() {
  window.open("https://www.google.com/maps/dir/?api=1&destination=Upper+Hill+Nairobi");
}
