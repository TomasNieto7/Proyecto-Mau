window.onload = init;

function init() {
    if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
        try {
            const decoded = jwt_decode(token); // Utiliza jwt_decode en lugar de jwt.verify
            getNotes(decoded.userMail)
        } catch (error) {
            console.error("Token inválido:", error);
            window.location.href = 'login.html';
        }
    } else {
        window.location.href = 'login.html';
    }
    document.querySelector('#logout').addEventListener('click', logout)
}


function getNotes(user){
    axios({
        method: 'post',
        url: 'http://localhost:3000/notes',
        data: {
            owner: user
        }
    }).then((res => {
        if (res.data.code === 200) {
            renderNotes(res.data.message)
        } else {
            alert("error")
        }
    })).catch(error => console.log(error))
}

function renderNotes(notes) {
    const notas = document.querySelector('.notas-container')
    notes.map(note => {
        notas.innerHTML += `
            <div class="nota" id='${note.id}'>
                    <h3>${note.titulo}</h3>
                    <p>${note.description}</p>
                    <div class="actions">
                        <button class="delete" onClick="deleteNote(this)"></button>
                        <button class="edit"></button>
                    </div>
            </div>
        `
    })
}

function logout() {
    localStorage.removeItem('token')
    window.location.href = 'login.html'
}

function deleteNote(button) {
    const nota = button.closest('.nota');
    const notaId = nota.id;
    axios({
        method: 'delete',
        url: 'http://localhost:3000/notes/delete',
        data: {
            id: notaId
        }
    }).then((res) => {
        if (res.data.code === 201) {
            nota.remove();
        } else {
            alert("Error al eliminar la nota");
        }
    }).catch(error => console.log(error));
}


function editNote() {
    
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

