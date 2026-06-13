// HOME PAGE

const tipsContainer = document.querySelector("#tips-container");

if (tipsContainer) {

const tips = [
"Use certified seeds",
"Practice crop rotation",
"Apply organic manure",
"Use irrigation systems"
];

tips.forEach(tip => {

tipsContainer.innerHTML += `
<div class="card">
<h3>Tip</h3>
<p>${tip}</p>
</div>
`;

});

}

// CROPS PAGE

const cropCards = document.querySelector("#crop-cards");

if (cropCards) {

const crops = [

{
name:"Maize",
season:"Rainy",
image:"images/maize.jpg"
},

{
name:"Beans",
season:"Rainy",
image:"images/beans.jpg"
},

{
name:"Tomatoes",
season:"Dry",
image:"images/tomatoes.jpg"
},

{
name:"Coffee",
season:"Rainy",
image:"images/coffee.jpg"
}

];

crops.forEach(crop => {

cropCards.innerHTML += `
<div class="card">

<img
src="${crop.image}"
alt="${crop.name}"
loading="lazy">

<h3>${crop.name}</h3>

<p>
Growing Season:
${crop.season}
</p>

</div>
`;

});

}

// LIVESTOCK PAGE

const livestockContainer =
document.querySelector("#livestock-container");

if(livestockContainer){

const livestock = [

{
name:"Dairy Farming",
benefit:"Milk Production"
},

{
name:"Poultry Farming",
benefit:"Egg Production"
},

{
name:"Goat Farming",
benefit:"Meat Production"
},

{
name:"Pig Farming",
benefit:"Commercial Production"
}

];

livestock.forEach(item=>{

livestockContainer.innerHTML += `
<div class="card">
<h3>${item.name}</h3>
<p>${item.benefit}</p>
</div>
`;

});

}

// CONTACT FORM

const form =
document.querySelector("#contactForm");

if(form){

form.addEventListener("submit",function(e){

e.preventDefault();

document.querySelector("#message")
.textContent =
"Thank you for contacting us.";

localStorage.setItem(
"contact",
"submitted"
);

});

}

// VISITS COUNTER

let visits =
Number(localStorage.getItem("visits")) || 0;

visits++;

localStorage.setItem("visits", visits);

const visitCount =
document.querySelector("#visit-count");

if(visitCount){

visitCount.textContent =
`Visits: ${visits}`;

}

// FOOTER

document.querySelectorAll("#currentYear")
.forEach(el=>{

el.textContent =
new Date().getFullYear();

});

document.querySelectorAll("#lastModified")
.forEach(el=>{

el.textContent =
document.lastModified;

});