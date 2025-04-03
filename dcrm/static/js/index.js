axios.post('/api/auth/token' , {username: 'ajay', password: 'Ajay@123'}).then(response => {
    console.log(response.data);
    localStorage.setItem('access' , response.data.access);
    localStorage.setItem('refresh' , response.data.refresh);
})