const chatToggle = document.getElementById("chat-toggle");
const chatWidget = document.getElementById("chat-widget");
const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-message");

chatToggle.onclick = () => {
  chatWidget.classList.toggle("hidden");
};

function getAIResponse(msg) {
  msg = msg.toLowerCase();

  if (msg.includes("services"))
    return "We offer business setup, consulting, and market entry across Africa.";

  if (msg.includes("africa"))
    return "We specialize in African markets with deep local expertise.";

  return "We help businesses grow and scale strategically in Africa.";
}

function createMessage(text) {
  const div = document.createElement("div");
  div.innerText = text;
  chatBody.appendChild(div);
}

function sendChatMessage() {
  const text = chatInput.value;
  if (!text) return;

  createMessage("You: " + text);
  chatInput.value = "";

  setTimeout(() => {
    createMessage("AI: " + getAIResponse(text));
  }, 800);
}

function toggleCard(card) {
  card.classList.toggle("active");
}

function toggleAbout(section) {
  section.classList.toggle("active");
}

document.getElementById("contact-form").onsubmit = function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  const url = `https://wa.me/254757902314?text=Hello, my name is ${name}. ${message}`;
  window.open(url, "_blank");
};
