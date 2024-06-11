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
