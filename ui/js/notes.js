window.onload = init;

function init() {
    if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
        try {
            const decoded = jwt_decode(token); // Utiliza jwt_decode en lugar de jwt.verify
            console.log(decoded);
            renderNotes(decoded.userMail)
        } catch (error) {
            console.error("Token inválido:", error);
            window.location.href = 'login.html';
        }
    } else {
        window.location.href = 'login.html';
    }
}


function renderNotes(user){
    console.log(user);
    axios({
        method: 'post',
        url: 'http://localhost:3000/notes',
        data: {
            owner: user
        }
    }).then((res => {
        if (res.data.code === 200) {
            alert("exitoso!!")
            console.log(res.data.message);
        } else {
            alert("user incorrets")
        }
    })).catch(error => console.log(error))
}

/*

<div class="nota">
                    <h3>Ideas proyecto</h3>
                    <p>Descripción de la nota, lorem</p>
                    <div class="actions">
                        <button class="delete"></button>
                        <button class="edit"></button>
                    </div>
                </div>
                <div class="nota">
                    <h3>Ideas proyecto</h3>
                    <p>Descripción de la nota, lorem</p>
                    <div class="actions">
                        <button class="delete"></button>
                        <button class="edit"></button>
                    </div>
                </div>
                <div class="nota">
                    <h3>Ideas proyecto</h3>
                    <p>Descripción de la nota, lorem</p>
                    <div class="actions">
                        <button class="delete"></button>
                        <button class="edit"></button>
                    </div>
                </div>
                <div class="nota">
                    <h3>Ideas proyecto</h3>
                    <p>Descripción de la nota, lorem</p>
                    <div class="actions">
                        <button class="delete"></button>
                        <button class="edit"></button>
                    </div>
                </div>
                <div class="nota">
                    <h3>Ideas proyecto</h3>
                    <p>Descripción de la nota, lorem</p>
                    <div class="actions">
                        <button class="delete"></button>
                        <button class="edit"></button>
                    </div>
                </div>
                <div class="nota">
                    <h3>Ideas proyecto</h3>
                    <p>Descripción de la nota, lorem</p>
                    <div class="actions">
                        <button class="delete"></button>
                        <button class="edit"></button>
                    </div>
                </div>

 */

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

