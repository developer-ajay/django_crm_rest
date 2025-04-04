// axios.post('/api/auth/token' , {username: 'ajay', password: 'Ajay@123'}).then(response => {
//     console.log(response.data);
//     localStorage.setItem('access' , response.data.access);
//     localStorage.setItem('refresh' , response.data.refresh);
// })

// axios.get('/api/records/', {  
//     headers: {
//         authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzNzcxMTkwLCJpYXQiOjE3NDM2ODQ3OTAsImp0aSI6ImE3ZWJjZjk5M2RiNzQxYWU5MTZkZDY1NWE4YTIzYTlhIiwidXNlcl9pZCI6MX0.GacH7G1-rb4igO2BUXL5N12dD9mrYsMtcVUBGxaHwUs`
//     }
// }).then((res) => {
//     console.log(res.data);
// }).catch((err) => {
//     console.log(err);
// });


document.addEventListener("DOMContentLoaded", function () {
  const loginLink = document.getElementById("loginLink");
  const registerLink = document.getElementById("registerLink");
  const loginButton = document.getElementById("mainLoginBtn");
  const registerButton = document.getElementById("mainRegisterBtn");
  

  const openLoginModal = () => {
    const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
    loginModal.show();
  };

  const openRegisterModal = () => {
    const registerModal = new bootstrap.Modal(document.getElementById("registrationModal"));
    registerModal.show();
  };

  if (loginLink) {
    loginLink.addEventListener("click", function (e) {
      e.preventDefault();
      openLoginModal();
    });
  }

  if (loginButton) {
    loginButton.addEventListener("click", function (e) {
      e.preventDefault();
      openLoginModal();
    });
  }

  if (registerLink) {
    registerLink.addEventListener("click", function (e) {
      e.preventDefault();
      openRegisterModal();
    });
  }

  if (registerButton) {
    registerButton.addEventListener("click", function (e) {
      e.preventDefault();
      openRegisterModal();
    });
  }
});

const username = document.getElementById("username");
const password = document.getElementById("password");
const newUsername = document.getElementById("newUsername");
const newPassword = document.getElementById("newPassword");

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

function toggleLoginButton() {
  if (username.value.trim() && password.value.trim()) {
    loginBtn.disabled = false;
  } else {
    loginBtn.disabled = true;
  }
}

function toggleRegisterButton() {
  if (newUsername.value.trim() && newPassword.value.trim()) {
    registerBtn.disabled = false;
  } else {
    registerBtn.disabled = true;
  }
}

username.addEventListener('input', toggleLoginButton);
password.addEventListener('input', toggleLoginButton);
newUsername.addEventListener('input' ,toggleRegisterButton);
newPassword.addEventListener('input' ,toggleRegisterButton);

async function handleLogin() {
  const usernameValue = username.value;
  const passwordValue = password.value;
  
  try {
    const response = await axios.post("/api/auth/token", {
      username: usernameValue,
      password: passwordValue
    });
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
    username.value = "";
    password.value = "";
    $("#loginModal").modal("hide");
  } catch (err) {
    username.value = "";
    password.value = "";
    alert("Invalid login");
    console.error(err);  
  }
}

async function handleRegister() {
  const newUsernameValue = newUsername.value;
  const newPasswordValue = newPassword.value;

  console.log(newUsernameValue);
  console.log(newPasswordValue);
  console.log("Inside register")
}




