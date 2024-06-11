window.onload = init;

let user
let idUser

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
    if (document.getElementById('check2')) {
        document.getElementById('check2').addEventListener('click', editNote)
    }
}


function getNotes(user) {
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
            <div class="nota ${note.type}" id='${note.id}'>
                    <h3>${note.titulo}</h3>
                    <p>${note.description}</p>
                    <div class="actions">
                        <button class="delete" onClick="deleteNote(this)"></button>
                        <button class="edit" onclick="openModal2(this)"></button>
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
    await getNote(notaId)
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

function getNote(id) {
    axios({
        method: 'post',
        url: 'http://localhost:3000/notes/getNote',
        data: {
            id: id
        }
    }).then((res => {
        if (res.data.code === 200) {
            newNotePapeleta(res.data.message)
        } else {
            alert("error")
        }
    })).catch(error => console.log(error))
}

function newNotePapeleta(note) {
    console.log(note[0]);
    axios({
        method: 'post',
        url: 'http://localhost:3000/papelera/newNote',
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

function editNote() {
    const title = document.querySelector('#noteTitle2').value
    const description = document.querySelector('#noteDescription2').value
    const type = document.querySelector('#noteCategory2').value
    axios({
        method: 'put',
        url: 'http://localhost:3000/notes/edit',
        data: {
            id: idUser,
            title: title,
            description: description,
            type: type
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

function newNote() {
    const title = document.querySelector('#noteTitle').value
    const description = document.querySelector('#noteDescription').value
    const type = document.querySelector('#noteCategory').value
    axios({
        method: 'post',
        url: 'http://localhost:3000/notes/newNote',
        data: {
            owner: user,
            title: title,
            description: description,
            type: type
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

// Open the modal
async function openModal2(button) {
    const nota = button.closest('.nota');
    idUser = nota.id;
    await getNoteModal(idUser)
    document.getElementById("modal2").style.display = "block";
}

function getNoteModal(id) {
    axios({
        method: 'post',
        url: 'http://localhost:3000/notes/getNote',
        data: {
            id: id
        }
    }).then((res => {
        if (res.data.code === 200) {
            const note = res.data.message
            console.log(note);
            document.querySelector('#noteTitle2').value = note[0].titulo
            document.querySelector('#noteDescription2').value = note[0].description
            document.querySelector('#noteCategory2').value = note[0].type
        } else {
            alert("error")
        }
    })).catch(error => console.log(error))
}

// Close the modal
function closeModal2() {
    document.getElementById("modal2").style.display = "none";
}

// Close the modal if the user clicks outside of it
window.onclick = function (event) {
    if (event.target == document.getElementById("modal2")) {
        closeModal2();
    }
}

// Placeholder handling
document.getElementById('noteTitle').addEventListener('focus', function () {
    this.placeholder = '';
});
document.getElementById('noteTitle').addEventListener('blur', function () {
    if (this.value === '') {
        this.placeholder = 'Título';
    }
});

document.getElementById('noteDescription').addEventListener('focus', function () {
    this.placeholder = '';
});
document.getElementById('noteDescription').addEventListener('blur', function () {
    if (this.value === '') {
        this.placeholder = 'Escribe algo...';
    }
});