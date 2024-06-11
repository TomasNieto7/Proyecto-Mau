const jwt = require('jsonwebtoken')

window.onload = init

function init() {
    if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token')
        const decoded = jwt.verify(token, "debugKey")
        console.log(decoded);
        loadPokemon()
    } else {
        window.location.href = 'login.html'
    }
}

function loadPokemon() {
    fetch("http://localhost:3000/notes", {
        headers: {
            'Authorization': "bearer " + localStorage.getItem("token")
        }
    })
    .then(function(res) {
        console.log(res);
    })
    .catch(function(err) {
        console.log(err);
    })
}


// Open the modal
function openModal() {
    document.getElementById("modal").style.display = "block";
}

// Close the modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    if (event.target == document.getElementById("modal")) {
        closeModal();
    }
}

// Placeholder handling
document.getElementById('noteTitle').addEventListener('focus', function() {
    this.placeholder = '';
});
document.getElementById('noteTitle').addEventListener('blur', function() {
    if (this.value === '') {
        this.placeholder = 'Título';
    }
});

document.getElementById('noteDescription').addEventListener('focus', function() {
    this.placeholder = '';
});
document.getElementById('noteDescription').addEventListener('blur', function() {
    if (this.value === '') {
        this.placeholder = 'Escribe algo...';
    }
});
