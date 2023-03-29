let alertSuccessMsg = document.getElementById('alertSuccessMsg');
let deleteButtons = document.querySelectorAll('.deleteBtn');
let editButtons = document.querySelectorAll('.editBtn');
let addBtn = document.getElementById('addNewBtn');
let addNewForm = document.getElementById('addNewForm');


deleteButtons.forEach(deleteBtn => {
    deleteBtn.addEventListener('click', e => {
        alertSuccessMsg.style.display = 'block';
        alertSuccessMsg.innerHTML = 'Product succesvol verwijderd!';
    });
});

let offsetTop = alertSuccessMsg.offsetTop;

window.addEventListener('scroll', () => {
    if (window.pageYOffset >= offsetTop) {
        alertSuccessMsg.classList.add('sticky');
    } else {
        alertSuccessMsg.classList.remove('sticky');
    }
});

addBtn.addEventListener('click', e => {
    addNewForm.style.display = 'Block'
});

