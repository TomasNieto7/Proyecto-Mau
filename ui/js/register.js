
window.onload = init

function init() {
    document.querySelector(".btn-login").addEventListener('click', () => {
        window.location.href = 'login.html'
    })

    document.querySelector('.btn-register').addEventListener('click', register)
}

const register = () => {
    const name = document.getElementById('input-name').value
    const last_name = document.getElementById('input-last_name').value
    const email = document.getElementById('input-email').value
    const phone_number = document.getElementById('input-phone_number').value
    const password = document.getElementById('input-password').value

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/register',
        data: {
            name: name,
            last_name:last_name,
            email: email,
            phone_number: phone_number,
            password: password
        }
    }).then((res => {
        console.log(res);
        window.location.href = "login.html"
    })).catch(error => console.log(error))
}