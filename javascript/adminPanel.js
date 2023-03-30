let allViewBasketButtons = document.querySelectorAll('.btn.btn-primary');

allViewBasketButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    console.log(btn.id);
  });
});

