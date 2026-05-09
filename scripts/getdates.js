// Dynamic Web Fundamentals - T.Nelson
// getdates.js functionality

document.addEventListener('DOMContentLoaded', function() {
    // 1. Setting current copyright year
    const yearSpan = document.getElementById('currentyear');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = currentYear;
    }
    
    // 2. Setting last modified date from document property
    const lastModifiedPara = document.getElementById('lastModified');
    if (lastModifiedPara) {
        // document.lastModified returns a string like "MM/DD/YYYY HH:MM:SS"
        lastModifiedPara.textContent = 'Last modification: ' + document.lastModified;
    }
    
    // Optional console log to confirm script execution
    console.log('Dynamic content loaded for Tumwesige Nelson — WDD 131 assignment');
});
