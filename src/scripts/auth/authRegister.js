const callback = (data) => {
    console.log(data)
    const result = JSON.parse(data);
    if (result.hasOwnProperty("status") && result["status"] === "success") {
      window.location = "login.html";
    } else{
      document.getElementById("warningTextRegister").textContent = result['description'];
    }
  };

const registrationInputCallback = (data) => {
  const result = JSON.parse(data)
  if (result.hasOwnProperty("status") && result["status"] === "success") {
    if (result["description"] === "USER_SUCCESS") {
      // document.getElementById("warningTextRegisterUser").textContent = "";
      document.getElementById("registerUsername").style.border = "2px solid green";
      user = true
      buttonStatusCheck(user,email,password)

    }
    if (result["description"] === "EMAIL_SUCCESS") {
      // document.getElementById("warningTextRegisterEmail").textContent = "";
      document.getElementById("registerEmail").style.border = "2px solid green";
      email = true
      buttonStatusCheck( user,email,password)

    }
  } 
  
  else{
      if (result["description"] === "EMAIL_TAKEN") {
        // document.getElementById("warningTextRegisterEmail").textContent = "Email already taken!";
        document.getElementById("registerEmail").style.border = "2px solid red";
        email = false
        buttonStatusCheck(user,email,password)

      } else if (result["description"] === "USER_TAKEN") {
        // document.getElementById("warningTextRegisterUser").textContent = "Username already taken!";
        document.getElementById("registerUsername").style.border = "2px solid red";
        user = false
        buttonStatusCheck(user,email,password)
      } else if (result["description"] === "EMAIL_BLANK") {
        // document.getElementById("warningTextRegisterEmail").textContent = "";
        document.getElementById("registerEmail").style.border = "2px solid red";
        email = false
        buttonStatusCheck(user,email,password)
      } else if (result["description"] === "USER_BLANK") {
        // document.getElementById("warningTextRegisterUser").textContent = "";
        document.getElementById("registerUsername").style.border = "2px solid red";
        user = false
        buttonStatusCheck(user,email,password)
      }  else if (result["description"] === "EMAIL_UNSUPORTED_FORMAT") {
        // document.getElementById("warningTextRegisterUser").textContent = "";
        document.getElementById("registerEmail").style.border = "2px solid red";
        user = false
        buttonStatusCheck(user,email,password)
      }
  }
}



// EVENT LISTENERS FOR REGISTRATION FORM

/*  Submit => POST to php/auth/register.php
*   Input => POST to php/auth/val_registration/{val_email || val_user}.php
*
*/
const form = document.getElementById("formRegister");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(e.target)
  postAPI("php/auth/register.php", registrationSubmitCallback, formData);
  return;
});


form.addEventListener("input", (e) => {
  e.preventDefault()

  // construct form data value from e
  let formData = new FormData();
  formData.append(e.target.name, e.target.value);

  if (e.target.id === "registerEmail") {
    postAPI("php/auth/val_registration/val_email.php", registrationInputCallback, formData);
  } else if (e.target.id === "registerUsername") {
    postAPI("php/auth/val_registration/val_user.php", registrationInputCallback, formData);
  } else if (e.target.id === "registerPassword" || e.target.id === "registerPasswordConfirm") {
    const pass = document.getElementById("registerPassword").value
    const confirmPass = document.getElementById("registerPasswordConfirm").value

    if (pass === confirmPass) {
      // document.getElementById("warningTextRegisterPass").textContent = "";
      document.getElementById("registerPassword").style.border = "1px solid black";
      document.getElementById("registerPasswordConfirm").style.border = "1px solid black";
      password = true
      if (pass === ""){password = false}
      buttonStatusCheck( user,email,password)

    }
    else {
      // document.getElementById("warningTextRegisterPass").textContent = "Passwords do not match!";
      document.getElementById("registerPassword").style.border = "2px solid red";
      document.getElementById("registerPasswordConfirm").style.border = "2px solid red";
      password = false
      buttonStatusCheck( user,email,password)
    }
  }
  return;
})
