let categoryFilters = document.querySelectorAll('.category-filter');
let products = document.querySelectorAll('.product');

categoryFilters.forEach(filterBtn => {
    filterBtn.addEventListener('click', e => {
        let clickedCat = e.target.dataset.category;
        products.forEach(product => {
            if (clickedCat === '0' || product.dataset.category === clickedCat) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
});