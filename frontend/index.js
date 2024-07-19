var state = {
  strategies: [],
  credits: 0,
  username: "",
  email_id: "",
  reports: [],
};
const email_id = JSON.parse(window.sessionStorage.getItem("userEmail"));
if (email_id === null || email_id == "") {
  window.location.href = "login.html";
}
async function getUserStrategies() {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email_id: email_id }),
  };
  const response = await fetch("http://127.0.0.1:8000/allstrategies", options);
  const data = await response.json();
  return data;
}

async function getUserDetails() {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email_id: email_id }),
  };
  const response = await fetch("http://127.0.0.1:8000/getUserDetails", options);
  const data = await response.json();
  return data;
}

function fillStrategies() {
  const container = document.getElementById("cards-container");

  state.strategies.forEach((strategy) => {
    const colDiv = document.createElement("div");
    colDiv.className = "col-md-6 col-lg-4 col-xl-3 mb-4";

    const cardDiv = document.createElement("div");
    cardDiv.className = "card shadow border-start-primary py-2";

    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";

    const rowDiv = document.createElement("div");
    rowDiv.className = "row align-items-center no-gutters";

    const colMeDiv = document.createElement("div");
    colMeDiv.className = "col me-2";

    const textDarkDiv = document.createElement("div");
    textDarkDiv.className = "text-dark fw-bold h5 mb-0";
    const amountSpan = document.createElement("span");
    amountSpan.innerText = strategy;
    textDarkDiv.appendChild(amountSpan);

    colMeDiv.appendChild(textDarkDiv);

    const colAutoDiv = document.createElement("div");
    colAutoDiv.className = "col-auto";
    const optimizeButton = document.createElement("a");
    optimizeButton.className =
      "btn btn-primary btn-sm d-none d-sm-inline-block";
    optimizeButton.role = "button";
    optimizeButton.innerHTML = "&nbsp;See Report&nbsp;";
    optimizeButton.addEventListener("click", () => {
      sessionStorage.setItem("strategyName", JSON.stringify(strategy));
      window.location.href = "report.html";
    });
    colAutoDiv.appendChild(optimizeButton);

    rowDiv.appendChild(colMeDiv);
    rowDiv.appendChild(colAutoDiv);

    cardBodyDiv.appendChild(rowDiv);
    cardDiv.appendChild(cardBodyDiv);
    colDiv.appendChild(cardDiv);

    container.appendChild(colDiv);
  });

  if (state.strategies.length === 0) {
    const header = document.getElementById("empty");
    header.innerHTML = "You have not created any strategies yet!";
  }
}
const userData = getUserDetails();
userData.then((data) => {
  state.credits = data.credits;
  state.username = data.username;
  state.email_id = data.email_id;
  const credits = document.getElementById("credits");
  credits.innerText = state.credits;
  const username = document.getElementById("username");
  username.innerText = state.username;
});
const strategies = getUserStrategies();
strategies.then((data) => {
  data.strategies.forEach((element) => {
    state.strategies.push(element);
  });
  fillStrategies();
});

const seeReportButton = document.querySelectorAll("#see-report");

const logoutButton = document.getElementById("log-out");
logoutButton.addEventListener("click", function () {
  window.sessionStorage.removeItem("userEmail");
  window.location.href = "login.html";
});
