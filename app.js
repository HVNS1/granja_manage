let productList = JSON.parse(localStorage.getItem("productList")) || [];
const addItemForm = document.getElementById("addItemForm");
const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const productListUl = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const searchResultsUl = document.getElementById("searchResults");
function addItem(name, price) {
    const product = { name, price };
    productList.push(product);
    saveProductList();
    renderProductList();
}
function saveProductList() {
    localStorage.setItem("productList", JSON.stringify(productList));
}
function renderProductList() {
    productListUl.innerHTML = "";
    productList.forEach((product, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${product.name} - Precio: $${product.price}<br>
                             <button onclick="editItem(${index})">Editar</button><br>
                             <button onclick="deleteItem(${index})">Borrar</button>`;
        productListUl.appendChild(listItem);
    });
}
function editItem(index) {
    const newName = prompt("Nuevo nombre del producto:");
    const newPrice = parseFloat(prompt("Nuevo precio del producto:"));
    if (newName !== null && !isNaN(newPrice)) {
        productList[index].name = newName;
        productList[index].price = newPrice;
        saveProductList();
        renderProductList();
    }
}
function deleteItem(index) {
    productList.splice(index, 1);
    saveProductList();
    renderProductList();
}
function searchProducts(query) {
    const results = productList.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
    if (query.trim() === "") {
        searchResultsUl.innerHTML = "";
    } else {
        renderSearchResults(results);
    }
}
function renderSearchResults(results) {
    searchResultsUl.innerHTML = "";
    if (results.length === 0) {
        const noResultsItem = document.createElement("li");
        noResultsItem.textContent = "No se encontraron resultados.";
        searchResultsUl.appendChild(noResultsItem);
    } else {
        results.forEach(product => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `${product.name} - Precio: $${product.price}`;
            searchResultsUl.appendChild(listItem);
        });
    }
}
addItemForm.addEventListener("submit", event => {
    event.preventDefault();
    const name = productNameInput.value;
    const price = parseFloat(productPriceInput.value);
    if (name && !isNaN(price)) {
        addItem(name, price);
        productNameInput.value = "";
        productPriceInput.value = "";
    }
});
searchInput.addEventListener("input", () => {
    const query = searchInput.value;
    searchProducts(query);
});
renderProductList();