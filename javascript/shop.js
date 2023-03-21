let categoryButtons = document.querySelectorAll('.category-filter');
categoryButtons.forEach(link => {
    link.addEventListener('click', (event) => {
        let selectedCategory = event.target.dataset.category;
    });
});

// <% for (let i = 0; i < products.length; i+= 3) { %>
//     <% for (let j = i; j < i + 3; j++) { %>
//         <% let clickedCat=0; %>
//             <% if (products[j].Category == clickedCat) { %>
//                 <div class="product">
//                     <div class="tile"><a><img src="<%= products[j].Image %>"></a></div>
//                     <div class="product-info">
//                         <div class="product-title"><a>
//                                 <span>
//                                     <%= products[j].Brand %>
//                                 </span>
//                                 <br>
//                                 <%= products[j].Name %>
//                             </a></div>
//                         <div class="product-price">
//                             €<%= products[j].Price.replace('.00', ',-' ); %>
//                         </div>
//                     </div>
//                 </div>
//                 <% } %>
//                     <% } %>
//                         <% } %>