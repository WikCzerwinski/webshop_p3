let alertSuccessMsg = document.getElementById('alertSuccessMsg');
let deleteButtons = document.querySelectorAll('.deleteBtn');

deleteButtons.forEach(deleteBtn => {
    deleteBtn.addEventListener('click', e => {
        alertSuccessMsg.style.display = 'block';
        alertSuccessMsg.innerHTML = 'Product succesvol verwijderd!';
    });
});
const offsetTop = alertSuccessMsg.offsetTop;

window.addEventListener('scroll', () => {
    if (window.pageYOffset >= offsetTop) {
        alertSuccessMsg.classList.add('sticky');
    } else {
        alertSuccessMsg.classList.remove('sticky');
    }
});