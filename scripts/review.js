document.addEventListener("DOMContentLoaded", function () {

    const counter = document.getElementById("counter");

    if (!counter) return;

    let count = localStorage.getItem("reviewCount");

    count = count ? parseInt(count, 10) : 0;

    count++;

    localStorage.setItem("reviewCount", count);

    counter.textContent = count;

});