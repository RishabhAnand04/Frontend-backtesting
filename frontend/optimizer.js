const email = JSON.parse(window.sessionStorage.getItem("userEmail"));
if (email === null || email == "") {
  window.location.href = "login.html";
}
