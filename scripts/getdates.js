// Dynamic Web Fundamentals - Rubia M. Francesco
// getdates.js functionality: dynamically populate copyright year and last modified date

// Wait for DOM to be fully loaded (defer ensures this, but safe approach)
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

// Alternative approach without event listener works as well due to defer positioning,
// but we include DOMContentLoaded to ensure robustness.
// Explanation: The defer attribute ensures the script executes after HTML parsing,
// so getElementById will find elements even without an event listener. We include
// both to follow best practices.