const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-message");
const voiceBtn = document.getElementById("voice-btn");
const chatToggle = document.getElementById("chat-toggle");
const chatWidget = document.getElementById("chat-widget");

chatToggle.addEventListener("click", () => {
  chatWidget.classList.toggle("hidden");
});

chatInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendChatMessage();
});

let conversation = [];

function getAIResponse(message) {
  const msg = message.toLowerCase();

  if (msg.includes("services"))
    return "We offer business setup, market entry, trade missions, franchising, accounting, and strategic consulting.";

  if (msg.includes("africa"))
    return "We specialize in helping businesses grow and expand across African markets.";

  if (msg.includes("why"))
    return "We combine global expertise with local African knowledge.";

  return "We provide tailored consulting solutions for business growth in Africa.";
}

function createMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${sender}`;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.innerText = text;

  msgDiv.appendChild(bubble);
  chatBody.appendChild(msgDiv);

  chatBody.scrollTop = chatBody.scrollHeight;
}

function sendChatMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  createMessage(text, "user");
  chatInput.value = "";

  const typing = document.createElement("div");
  typing.className = "message ai";
  typing.innerText = "Typing...";
  chatBody.appendChild(typing);

  setTimeout(() => {
    typing.remove();
    const reply = getAIResponse(text);
    createMessage(reply, "ai");
  }, 1000);
}

// CLICKABLE CARDS
function toggleCard(card) {
  document.querySelectorAll(".card").forEach(c => {
    if (c !== card) c.classList.remove("active");
  });

  card.classList.toggle("active");
}

function toggleAbout(section) {
  section.classList.toggle("active");
}

// FORM
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Consultation request sent!");
});
