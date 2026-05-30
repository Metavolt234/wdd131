// Temple Array
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },

  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },

  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },

  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },

  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },

  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },

  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
// Add more temple objects here...

  {
    templeName: "Manila Philippines",
    location: "Manila, Philippines",
    dedicated: "1984, September, 25",
    area: 26683,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/75a25fc00384f7067f485315607cc760381f35d2/full/!1200,/0/default"
  },

  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/60ecad34b8ccba920297633d3f3b4763a7785667/full/!1200,/0/default"
  },

  {
    templeName: "Cebu City Philippines",
    location: "Cebu City, Philippines",
    dedicated: "2010, June, 13",
    area: 29356,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/cebu-city-philippines-temple/cebu-city-philippines-temple-33251.jpg"
  },

  {
    templeName: "Buenos Aires",
    location: "Buenos Aires, Argentina",
    dedicated: "1986, January, 19",
    area: 29356,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/396dd44dcb8c55b10150bae7f3916389465acc0d/full/!1200,/0/default"
  },

  {
    templeName: "Durban South Africa",
    location: "Durban, South Africa",
    dedicated: "2020, February, 16",
    area: 19860,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/8b3f1b895a7c92ee66c2d0c7e78606f75f0d0cc8/full/!1200,/0/default"
  }
];

// Select Elements
const gallery = document.querySelector(".gallery");
const heading = document.querySelector("main h2");

// Temple Cards
function displayTemples(templeList) {

  gallery.innerHTML = "";

  templeList.forEach((temple) => {

    const card = document.createElement("section");

    card.innerHTML = `
      <h3>${temple.templeName}</h3>

      <p><strong>Location:</strong> ${temple.location}</p>

      <p><strong>Dedicated:</strong> ${temple.dedicated}</p>

      <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>

      <img src="${temple.imageUrl}" 
           alt="${temple.templeName}"
           loading="lazy">
    `;

    gallery.appendChild(card);

  });
}

// Initial Display
displayTemples(temples);

// HOME
document.querySelector("#home").addEventListener("click", (e) => {

  e.preventDefault();

  heading.textContent = "Temple Gallery";

  displayTemples(temples);

});

// OLD
document.querySelector("#old").addEventListener("click", (e) => {

  e.preventDefault();

  heading.textContent = "Old Temples";

  const oldTemples = temples.filter((temple) =>
    parseInt(temple.dedicated) < 1900
  );

  displayTemples(oldTemples);

});

// NEW
document.querySelector("#new").addEventListener("click", (e) => {

  e.preventDefault();

  heading.textContent = "New Temples";

  const newTemples = temples.filter((temple) =>
    parseInt(temple.dedicated) > 2000
  );

  displayTemples(newTemples);

});

// LARGE
document.querySelector("#large").addEventListener("click", (e) => {

  e.preventDefault();

  heading.textContent = "Large Temples";

  const largeTemples = temples.filter((temple) =>
    temple.area > 90000
  );

  displayTemples(largeTemples);

});

// SMALL
document.querySelector("#small").addEventListener("click", (e) => {

  e.preventDefault();

  heading.textContent = "Small Temples";

  const smallTemples = temples.filter((temple) =>
    temple.area < 10000
  );

  displayTemples(smallTemples);

});

// Footer
document.querySelector("#currentyear").textContent =
  new Date().getFullYear();

document.querySelector("#lastModified").textContent =
  `Last Modified: ${document.lastModified}`;