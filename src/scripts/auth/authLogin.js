const callback = (data) => {
  console.log(data)
  const result = JSON.parse(data);
  if (result.hasOwnProperty("status") && result["status"] === "success") {
    window.location = 'sidebar.html';
  } else{
    document.getElementById("warningTextLogin").textContent = result['description'];
  }
};

const guessLoginCallback = (data) => {
  console.log(data)
  const result = JSON.parse(data);
  if (result.hasOwnProperty("status") && result["status"] === "success") {
    window.location = 'sidebar.html';
  } else{
    document.getElementById;("warningTextLogin").textContent = result['description'];
  }
};

const guestLoginButton = document.getElementById("whiteButton")

guestLoginButton.addEventListener("click", (e) => {
  e.preventDefault();
  postAPI("php/auth/guesslogin.php", guessLoginCallback);
  return;
})

const form = document.getElementById("formLogin");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(e.target)
  postAPI("php/auth/login.php", callback, formData);
  return;
});

form.addEventListener("input" , (e) => {
  document.getElementById("warningTextLogin").textContent = "";
})
