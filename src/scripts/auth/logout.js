const logoutCallback = (data) => {
    console.log(data)
    const result = JSON.parse(data);
    if (result.hasOwnProperty("status") && result["status"] === "success") {
        checkLogin();
    } else{
        document.getElementById("warningTextLogin").textContent = result['description'];
    }
};

const guestLoginButton = document.getElementById("logout")

guestLoginButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("masok");
  postAPI("php/auth/logout.php", logoutCallback);
})
