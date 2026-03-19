const chatToggle = document.getElementById("chat-toggle");
const chatWidget = document.getElementById("chat-widget");
const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-message");
const micBtn = document.getElementById("mic-btn");

/* ========================= */
/* 🔥 TOGGLE CHAT */
/* ========================= */
chatToggle.onclick = () => {
  chatWidget.classList.toggle("hidden");
};

function toggleChat() {
  chatWidget.classList.toggle("hidden");
}

/* ========================= */
/* 🧠 SMART AI (YOUR BUSINESS) */
/* ========================= */
function getAIResponse(msg) {
  msg = msg.toLowerCase();

  if (msg.includes("setup") || msg.includes("register")) {
    return "We handle full business setup including company registration, licensing, and compliance across East Africa.";
  }

  if (msg.includes("market") || msg.includes("entry")) {
    return "We provide market entry strategies, feasibility studies, and connect you with key partners in African markets.";
  }

  if (msg.includes("services")) {
    return "Our services include business setup, consulting, market entry, trade missions, tax advisory, and business coaching.";
  }

  if (msg.includes("tax") || msg.includes("accounting")) {
    return "We offer tax advisory, compliance, financial accounting, and strategic structuring for businesses operating in Africa.";
  }

  if (msg.includes("real estate")) {
    return "We assist with commercial and industrial real estate investments, leasing, and acquisitions.";
  }

  if (msg.includes("coaching")) {
    return "Our business coaching helps entrepreneurs improve sales, leadership, marketing, and growth strategies.";
  }

  if (msg.includes("location") || msg.includes("office")) {
    return "We are based in Nairobi, Kenya, and serve clients across Africa and globally.";
  }

  if (msg.includes("price") || msg.includes("cost")) {
    return "Pricing depends on your business needs. I recommend booking a consultation so we can tailor the best solution for you.";
  }

  if (msg.includes("contact") || msg.includes("book")) {
    return "You can book a consultation using the form or contact us directly via WhatsApp for faster assistance.";
  }

  return "Based on your goals, we can help you set up, expand, or scale your business in Africa. What would you like to achieve?";
}

/* ========================= */
/* 💬 MESSAGE UI */
/* ========================= */
function createMessage(text, sender) {
  const div = document.createElement("div");
  div.className = sender;
  div.innerText = text;
  chatBody.appendChild(div);

  chatBody.scrollTop = chatBody.scrollHeight;
}

/* ========================= */
/* 🔊 VOICE REPLY */
/* ========================= */
function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.rate = 1;
  speech.pitch = 1;
  speech.lang = "en-US";
  window.speechSynthesis.speak(speech);
}

/* ========================= */
/* 📤 SEND MESSAGE */
/* ========================= */
function sendChatMessage() {
  const text = chatInput.value;
  if (!text) return;

  createMessage(text, "user");
  chatInput.value = "";

  // typing effect
  const typing = document.createElement("div");
  typing.className = "ai";
  typing.innerText = "Typing...";
  chatBody.appendChild(typing);

  setTimeout(() => {
    typing.remove();

    const reply = getAIResponse(text);
    createMessage(reply, "ai");

    // 🔊 AI speaks
    speak(reply);

  }, 800);
}

/* ========================= */
/* ⌨️ ENTER KEY */
/* ========================= */
chatInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendChatMessage();
});

/* ========================= */
/* 🎤 VOICE INPUT */
/* ========================= */
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";

  micBtn.onclick = () => {
    recognition.start();
    micBtn.classList.add("listening");
  };

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    chatInput.value = text;
    micBtn.classList.remove("listening");
  };

  recognition.onerror = () => {
    micBtn.classList.remove("listening");
  };
}

/* ========================= */
/* 📦 CLICKABLE SECTIONS */
/* ========================= */
function toggleCard(card) {
  card.classList.toggle("active");
}

function toggleAbout(section) {
  section.classList.toggle("active");
}

/* ========================= */
/* 📲 WHATSAPP BOOKING */
/* ========================= */
document.getElementById("contact-form").onsubmit = function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  const url = `https://wa.me/254757902314?text=Hello, my name is ${name}. ${message}`;
  window.open(url, "_blank");
};

/* ========================= */
/* 🗺️ MAP */
/* ========================= */
function openMap() {
  window.open("https://www.google.com/maps?q=Upper+Hill+Nairobi");
}

function getDirections() {
  window.open("https://www.google.com/maps/dir/?api=1&destination=Upper+Hill+Nairobi");
}
