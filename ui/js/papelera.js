window.onload = init;

let user

function init() {
    if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token);
        user = decoded.userMail
        getNotes(user)
    } else {
        window.location.href = 'login.html';
    }
    document.querySelector('#logout').addEventListener('click', logout)
    if (document.querySelector('.check')) {
        document.querySelector('.check').addEventListener('click', newNote)
    }
}


function getNotes(user) {
    axios({
        method: 'post',
        url: 'http://localhost:3000/papelera',
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
            <div class="nota ${note.type}" id='${note.id}'>
                    <h3>${note.titulo}</h3>
                    <p>${note.description}</p>
                    <div class="actions">
                        <button class="delete" onClick="deleteNote(this)"></button>
                        <button class="restore" onClick="restoreNote(this)"></button>
                    </div>
            </div>
        `
    })
}

function logout() {
    localStorage.removeItem('token')
    window.location.href = 'login.html'
}

async function deleteNote(button) {
    const nota = button.closest('.nota');
    const notaId = nota.id;
    axios({
        method: 'delete',
        url: 'http://localhost:3000/papelera/delete',
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

async function restoreNote(button) {
    const nota = button.closest('.nota');
    const notaId = nota.id;
    await getNote(notaId)
    axios({
        method: 'delete',
        url: 'http://localhost:3000/papelera/delete',
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

function getNote(id) {
    axios({
        method: 'post',
        url: 'http://localhost:3000/papelera/getNote',
        data: {
            id: id
        }
    }).then((res => {
        if (res.data.code === 200) {
            newNote(res.data.message)
        } else {
            alert("error")
        }
    })).catch(error => console.log(error))
}

function newNote(note) {
    console.log(note[0]);
    axios({
        method: 'post',
        url: 'http://localhost:3000/notes/newNote',
        data: {
            owner: note[0].owner,
            title: note[0].titulo,
            description: note[0].description,
            type: note[0].type
        }
    }).then((res) => {
        if (res.data.code === 201) {
            console.log(res.data.message);
            closeModal();
            window.location.href = 'notes.html'
        } else {
            alert("Error al eliminar la nota");
        }
    }).catch(error => console.log(error));
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
window.onclick = function (event) {
    if (event.target == document.getElementById("modal")) {
        closeModal();
    }
}
