const token = localStorage.getItem("access");
console.log(token);


if (!token) window.location = "/";

function handleLogout() {
    localStorage.clear();
    location.reload();
  }