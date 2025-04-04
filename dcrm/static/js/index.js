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
    const loginButton = document.querySelector(".btn.btn-primary");
  
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
  });
  