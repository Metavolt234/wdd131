// Dynamic Web Fundamentals - Tumwesige Nelson
// getdates.js functionality: dynamically populate copyright year and last modified date

document.addEventListener('DOMContentLoaded', function() {
    // 1. Set current copyright year
    const yearSpan = document.getElementById('currentyear');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = currentYear;
    }
    
    // 2. Set last modified date from document property
    const lastModifiedPara = document.getElementById('lastModified');
    if (lastModifiedPara) {
        // document.lastModified returns a string like "MM/DD/YYYY HH:MM:SS"
        lastModifiedPara.textContent = 'Last modification: ' + document.lastModified;
    }
    
    // Optional console log to confirm script execution
    console.log('Dynamic content loaded for Rubia M. Francesco — WDD 131 assignment');
});
