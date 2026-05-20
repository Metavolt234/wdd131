document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastmodified").textContent = document.lastModified;

    const tempElement = document.getElementById("temp");
    const windElement = document.getElementById("wind");
    const windChillContainer = document.getElementById("windchill");
    const element = document.getElementById('your-id');

    if (tempElement && windElement && windChillContainer) {
        const temp = parseFloat(tempElement.textContent);
        const wind = parseFloat(windElement.textContent);

        const calculateWindChill = (t, s) => 13.12 + (0.6215 * t) - (11.37 * Math.pow(s, 0.16)) + (0.3965 * t * Math.pow(s, 0.16));

        if (temp <= 10 && wind > 4.8) {
            const result = calculateWindChill(temp, wind);
            windChillContainer.textContent = `${result.toFixed(1)} °C`;
        } else {
            windChillContainer.textContent = "N/A";
        }
    }
});