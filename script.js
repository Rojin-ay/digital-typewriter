const quotes = [
  "If Allah helps you, none can defeat you.",
  "If it doesn't happen the way you wanted, it will happen in a better way than you imagined.",
  "And my success can only come from Allah.",
  "Allah is the best planner",
  "Allah does not burden any soul with more than it can bear.",
  "Indeed, Allah wil not change the condition of the people until they change what is in themselves.",
  "Ve zamani geldiginde Rabbin sana gönlündekini verecek. Seni hosnut edecek."
];

const sampleEvents = [
  { title: "Google Calendar wird später verbunden", time: "Heute", type: "personal" }
];

const sampleTodos = [
  { title: "Notion wird später verbunden", type: "personal" }
];

const sampleEmails = [
  { subject: "Gmail wird später verbunden", time: "Heute" }
];

function getDayIndex(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  return Math.floor(diff / 86400000);
}

function updateDateTime() {
  const now = new Date();

  document.getElementById("clock").textContent = now.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit"
  });

  document.getElementById("weekday").textContent = now.toLocaleDateString("de-DE", {
    weekday: "short"
  });

  document.getElementById("dayNumber").textContent = now.toLocaleDateString("de-DE", {
    day: "2-digit"
  });

  document.getElementById("monthYear").textContent = now.toLocaleDateString("de-DE", {
    month: "short",
    year: "numeric"
  });
}

function setDailyQuote() {
  const today = new Date();
  const index = getDayIndex(today) % quotes.length;
  document.getElementById("dailyQuote").textContent = quotes[index];
}

function renderEvents(events) {
  const list = document.getElementById("eventsList");
  list.innerHTML = "";

  events.forEach(event => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="item-icon"><img src="assets/KalenderBlau.png" alt=""></span>
      <span>
        <span class="item-title">${event.title}</span>
        <span class="item-sub">${event.time}</span>
      </span>
      <span class="tag">${event.type || "event"}</span>
    `;
    list.appendChild(li);
  });
}

function renderTodos(todos) {
  const list = document.getElementById("todosList");
  list.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="todo-check"></span>
      <span class="item-title">${todo.title}</span>
      <span class="tag">${todo.type || "todo"}</span>
    `;
    list.appendChild(li);
  });
}

function renderEmails(emails) {
  const list = document.getElementById("gmailList");
  list.innerHTML = "";

  emails.forEach(mail => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="item-icon"><img src="assets/BlumeWeiß.png" alt=""></span>
      <span class="item-title">${mail.subject}</span>
      <span class="tag">${mail.time || ""}</span>
    `;
    list.appendChild(li);
  });
}

async function loadHamburgWeather() {
  try {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=53.5511&longitude=9.9937&current=temperature_2m&timezone=Europe%2FBerlin";
    const response = await fetch(url);
    const data = await response.json();
    const temp = Math.round(data.current.temperature_2m);
    document.getElementById("weatherTemp").textContent = `${temp}°C`;
  } catch {
    document.getElementById("weatherTemp").textContent = "--°C";
  }
}

updateDateTime();
setDailyQuote();
renderEvents(sampleEvents);
async function loadTodos() {
  try {
    const response = await fetch("/api/notion");
    const todos = await response.json();

    renderTodos(todos);
  } catch {
    renderTodos([
      {
        title: "Notion konnte nicht geladen werden",
        type: "error"
      }
    ]);
  }
}

loadTodos();
renderEmails(sampleEmails);
loadHamburgWeather();

setInterval(updateDateTime, 1000);

