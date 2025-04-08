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
  const addRecordLink = document.getElementById("addRecordLink");
  const recordFormSection = document.getElementById("recordFormSection");
  const homeContent = document.getElementById("homeContent");
  const recordSection = document.getElementById("recordSection");

  const loginLink = document.getElementById("loginLink");
  const registerLink = document.getElementById("registerLink");
  const loginButton = document.getElementById("mainLoginBtn");
  const registerButton = document.getElementById("mainRegisterBtn");

  addRecordLink.addEventListener("click", function (e) {
    e.preventDefault();
    recordFormSection.style.display = "block";
    homeContent.style.display = "none"; 
    recordSection.style.display = "none"; 
    addRecordLink.style.display = "none";
    loginLink.style.display = "none";
    registerLink.style.display = "none";
    logOutLink.style.display = "none";
  });

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

const token = localStorage.getItem("access");
const username = document.getElementById("username");
const password = document.getElementById("password");
const newUsername = document.getElementById("newUsername");
const newPassword = document.getElementById("newPassword");

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const homeContent = document.getElementById("homeContent");
const recordSection = document.getElementById("recordSection");
const loginLink = document.getElementById("loginLink");
const registerLink = document.getElementById("registerLink"); 
const logOutLink = document.getElementById("logOutLink");
const recordBody = document.getElementById("recordBody");
const addrecordLink = document.getElementById("addRecordLink");
const submitBtn = document.getElementById("updateSubmitBtn");
const recordFormSection = document.getElementById("recordFormSection");
const recordForm = document.getElementById("recordForm");

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
logOutLink.addEventListener("click", handleLogout);

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

    loadRecords();  //load records once logged in
  } catch (err) {
    username.value = "";
    password.value = "";
    alert("Invalid login");
    console.error(err);  
  }
}

function isValidPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}

async function handleRegister() {
  const newUsernameValue = newUsername.value;
  const newPasswordValue = newPassword.value;

  if (!isValidPassword(newPasswordValue)) {
    alert("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
    return;
  }

  try {
    await axios.post("/api/user/register", {
      username: newUsernameValue,
      password: newPasswordValue
    });
    
    const response = await axios.post("/api/auth/token", {
      username: newUsernameValue,
      password: newPasswordValue
    });
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
    
    newUsername.value = "";
    newPassword.value = "";
    $("#registrationModal").modal("hide");
    alert("Registration successful! Please Login!!");
  } catch (err) {
    username.value = "";
    password.value = "";
    alert("Invalid Register, User already exists!");
    console.error(err);  
  }
}

async function loadRecords() {
  try {
    const res = await axios.get("/api/records/", {
      headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
    });

    console.log(res.data);
    homeContent.style.display = "none";
    loginLink.style.display = "none";
    registerLink.style.display = "none";
    logOutLink.style.display = "inline-block";
    addrecordLink.style.display = "inline-block";
    recordSection.style.display = "block";
    
    
    recordBody.innerHTML = "";
    res.data.forEach((record) => {
      const row = `<tr style='cursor: pointer;' onclick=recordDetails(${record.id})>
        <td>${record.first_name}</td>
        <td>${record.last_name}</td>
        <td>${record.email}</td>
        <td>${record.state}</td>
        <td>${record.city}</td>
        <td>${record.phone}</td>
      </tr>`;
      recordBody.innerHTML += row;
    });

  } catch (err) {
    console.error(err);
  }
}

function handleLogout(e) {
  const confirmed = confirm("Are you sure you want to log out?");
  if (confirmed) {
    localStorage.clear();
    location.reload();
  }
};


function checkForChanges() {
  let hasChanged = false;

  [...recordForm.elements].forEach(el => {
    if (el.name) {
      const initial = (initialValues[el.name] || "").trim();
      const current = (el.value || "").trim();
      if (initial !== current) {
        hasChanged = true;
      }
    }
  });

  updateSubmitBtn.disabled = !hasChanged;
}

const initialValues = {};
recordForm.addEventListener('input', checkForChanges);

async function recordDetails(pk) {
  try {
    const res = await axios.get(`/api/record/${pk}/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
    });

    const data = res.data;

    document.getElementById("first_name").value = data.first_name || "";
    document.getElementById("last_name").value = data.last_name || "";
    document.getElementById("email").value = data.email || "";
    document.getElementById("phone").value = data.phone || "";
    document.getElementById("address").value = data.address || "";
    document.getElementById("city").value = data.city || "";
    document.getElementById("state").value = data.state || "";
    document.getElementById("zip_code").value = data.zipcode || "";

    homeContent.style.display = "none";
    loginLink.style.display = "none";
    registerLink.style.display = "none";
    logOutLink.style.display = "inline-block";
    addrecordLink.style.display = "inline-block";
    recordSection.style.display = "none";
    recordFormSection.style.display = "block";

    document.getElementById("formTitle").textContent = "Edit Record";
    document.getElementById("updateSubmitBtn").innerHTML = '<i class="fas fa-save"></i> Update';
    document.getElementById("deleteBtn").style.display = "inline-block";

    const recordForm = document.getElementById("recordForm");

    [...recordForm.elements].forEach(el => {
      if (el.name) {
        initialValues[el.name] = el.value;
      }
    });

    console.log("Initial Values:", initialValues);

    submitBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      console.log("clicked update button");
    });

  } catch (err) {
    console.error(err);
  }
}


if (token) loadRecords();