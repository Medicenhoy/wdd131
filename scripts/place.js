function calculateWindChill(t, w) {
    return (13.12 + 0.6215 * t - 11.37 * w ** 0.16 + 0.3965 * t * w ** 0.16).toFixed(1);
}

if (temperature <= 10 && windSpeed > 4.8) {
    windChillElement.textContent = `${calculateWindChill(temperature, windSpeed)} °C`;
} else {
    windChillElement.textContent = "N/A";
}
