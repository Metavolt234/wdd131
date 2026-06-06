let reviewCount = Number(localStorage.getItem("reviewCount")) || 0;

reviewCount++;

localStorage.setItem("reviewCount", reviewCount);

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#reviewCount").textContent = reviewCount;
});