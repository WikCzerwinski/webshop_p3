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

$(function() {
    let products = $('.product');
    let numProducts = products.length;
    let itemsPerPage = 9;

    products.slice(itemsPerPage).hide();

    $('.pages-chooser').pagination({
      items: numProducts,
      itemsOnPage: itemsPerPage,
      cssStyle: '',
      prevText: '&laquo;',
      nextText: '&raquo;',
      onPageClick: function(pageNumber, event) {
        var startIndex = (pageNumber - 1) * itemsPerPage;
        var endIndex = startIndex + itemsPerPage;
        products.hide().slice(startIndex, endIndex).show();
      },
      currentPage: 1
    }).trigger('click');

  });