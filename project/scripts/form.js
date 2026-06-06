const products = [
    {
        id: "fc-1888",
        name: "Flux Capacitor",
        avgRating: 4.5
    },
    {
        id: "fc-2050",
        name: "Power Laces",
        avgRating: 4.7
    },
    {
        id: "fs-1987",
        name: "Flying Skateboard",
        avgRating: 4.3
    },
    {
        id: "ac-2000",
        name: "Anti-Gravity Boots",
        avgRating: 4.8
    },
    {
        id: "jp-3000",
        name: "Jet Pack",
        avgRating: 4.2
    }
];

const productSelect = document.querySelector("#product");

products.forEach(product => {
    const option = document.createElement("option");

    option.value = product.id;
    option.textContent = product.name;

    productSelect.appendChild(option);
});