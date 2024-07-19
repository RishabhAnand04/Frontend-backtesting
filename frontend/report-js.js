var state = {
  credits: 0,
  username: "",
  email_id: "",
  strategy_name: "",
  strategies: [],
};
state.email_id = JSON.parse(window.sessionStorage.getItem("userEmail"));
if (state.email_id === null || state.email_id == "") {
  window.location.href = "login.html";
}
state.strategy_name = JSON.parse(window.sessionStorage.getItem("strategyName"));

async function getReportData() {
  const url = "http://127.0.0.1:8000/reportData";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_id: state.email_id,
      strategy_name: state.strategy_name,
    }),
  };
  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      state.reports = data;
      for (const key in data) {
        const element = document.getElementById(key);
        if (element) {
          element.innerHTML = data[key];
        }
      }
      const name = document.getElementById("strategy_name");
      name.innerHTML = state.strategy_name;
      const ctx = document.getElementById("myChart");
      var yValue = data.pnl_array.yvalues;
      var xValue = data.pnl_array.xvalues;
      yValue = JSON.parse(yValue);
      xValue = JSON.parse(xValue);
      xValue = xValue.map((element) => "Trade: " + element);

      new Chart(ctx, {
        type: "line",
        data: {
          labels: xValue,
          datasets: [
            {
              label: "Returns (%) ",
              data: yValue,
              borderWidth: 1,
              pointRadius: 2,
              borderColor: yValue.map((value) => (value > 1 ? "green" : "red")),
              backgroundColor: yValue.map((value) =>
                value > 1 ? "green" : "red"
              ),
              pointBackgroundColor: yValue.map((value) =>
                value > 1 ? "green" : "red"
              ),
              pointBorderColor: yValue.map((value) =>
                value > 1 ? "green" : "red"
              ),
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function getStrategyData() {
  const url = "http://127.0.0.1:8000/strategyData";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_id: state.email_id,
      strategy_name: state.strategy_name,
    }),
  };
  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const modal = document.getElementById("strategy_details_modal");

      let htmlContent = `<h5><b>Data Settings : </b></h5>`;
      htmlContent += `<p>Symbol: ${data.data_setting.symbol}</p>`;
      htmlContent += `<p>Start Date: ${data.data_setting.start_date}</p>`;
      htmlContent += `<p>End Date: ${data.data_setting.end_date}</p>`;
      htmlContent += `<p>Time Period: ${data.data_setting.time_period}</p>`;
      htmlContent += `<p>Quantity: ${data.data_setting.quantity}</p>`;

      htmlContent += `<h5 style="margin-top: 20px;"><b>Indicators : </b></h5>`;
      data.indicators.forEach((indicator, index) => {
        htmlContent += `<p>${index + 1}. ${indicator.indicatorName} (${
          indicator.indicatorType
        })</p>`;
      });

      htmlContent += `<h5 style="margin-top: 20px;"><b>Entry Conditions : </b></h5>`;
      for (let i = 0; i < data.entry_conditions.ops.length; i++) {
        htmlContent += `<p>${i + 1}) ${data.entry_conditions.Ind1[i]} ${
          data.entry_conditions.ops[i]
        } ${data.entry_conditions.Ind2[i]}, ${data.entry_conditions.cand1[i]} ${
          data.entry_conditions.cand2[i]
        }, ${data.entry_conditions.andOr[i]}.</p>`;
      }

      htmlContent += `<h5 style="margin-top: 20px;"><b>Exit Conditions :</b> </h5>`;
      for (let i = 0; i < data.exit_conditions.ops.length; i++) {
        htmlContent += `<p>${i + 1}) ${data.exit_conditions.Ind1[i]} ${
          data.exit_conditions.ops[i]
        } ${data.exit_conditions.Ind2[i]}, ${data.exit_conditions.cand1[i]} ${
          data.exit_conditions.cand2[i]
        }, ${data.exit_conditions.andOr[i]}.</p>`;
      }
      // Set the innerHTML of the modal
      modal.innerHTML = htmlContent;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function getUserDetails() {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email_id: state.email_id }),
  };
  const response = await fetch("http://127.0.0.1:8000/getUserDetails", options);
  const data = await response.json();
  return data;
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

getReportData();
getStrategyData();

async function getUserStrategies() {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email_id: state.email_id }),
  };
  const response = await fetch("http://127.0.0.1:8000/allstrategies", options);
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
const strategies = getUserStrategies();
strategies.then((data) => {
  data.strategies.forEach((element) => {
    state.strategies.push(element);
  });
  fillStrategies();
});

const toggleButton = document.getElementById("stratergies-toggle");
toggleButton.addEventListener("click", function () {
  const strategies = document.getElementById("view-stratergies");
  if (strategies.style.display === "none") {
    strategies.style.display = "block";
  } else {
    strategies.style.display = "none";
  }
});

const logoutButton = document.getElementById("log-out");
logoutButton.addEventListener("click", function () {
  window.sessionStorage.removeItem("userEmail");
  window.location.href = "login.html";
});
