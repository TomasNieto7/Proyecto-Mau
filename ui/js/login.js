

window.onload = init

function init() {
    document.querySelector(".btn-register").addEventListener('click', () => {
        window.location.href = 'register.html'
    })

    document.querySelector('.btn-login').addEventListener('click', login)
}

const login = () => {
    const email = document.getElementById('input-email').value
    const password = document.getElementById('input-password').value

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data: {
            email: email,
            password: password
        }
    }).then((res => console.log(res))).catch(error => console.log(error))
}