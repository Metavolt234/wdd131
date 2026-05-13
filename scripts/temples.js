const menuButton = document.querySelector('#menu-button');
const nav = document.querySelector('nav');

menuButton.addEventListener('click', () => {
    nav.classList.toggle('open');

    if (nav.classList.contains('open')) {
        menuButton.textContent = '✖';
    } else {
        menuButton.textContent = '☰';
    }
});

// Footer
document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#lastModified').textContent =
    `Last Modified: ${document.lastModified}`;