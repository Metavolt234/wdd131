// ========== FOOTER FUNCTIONALITY: Current Year, Last Modified, Visit Counter ==========
function initFooter() {
    // Set current year
    const yearSpan = document.getElementById('currentyear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Set last modified date
    const lastModifiedP = document.getElementById('lastModified');
    if (lastModifiedP) {
        lastModifiedP.textContent = `Last Modified: ${document.lastModified}`;
    }
    
    // Visit counter using localStorage
    const visitCountSpan = document.getElementById('visit-count');
    if (visitCountSpan) {
        let visitCount = localStorage.getItem('agritechVisitCount');
        if (visitCount === null) {
            visitCount = 1;
        } else {
            visitCount = parseInt(visitCount) + 1;
        }
        localStorage.setItem('agritechVisitCount', visitCount);
        visitCountSpan.textContent = visitCount;
    }
}

// ========== MOBILE MENU TOGGLE (All pages) ==========
function initMobileMenu() {
    const toggles = ['menuToggle', 'menuToggle2', 'menuToggle3', 'menuToggle4', 'menuToggle5', 'menuToggleRef'];
    toggles.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => {
                const navId = id.replace('menuToggle', 'navLinks');
                const nav = document.getElementById(navId);
                if (nav) nav.classList.toggle('show');
            });
        }
    });
}

// ========== HOMEPAGE STATS (Objects, Arrays, Template Literals, localStorage) ==========
function initHomeStats() {
    const statsContainer = document.getElementById('statsContainer');
    if (!statsContainer) return;

    // Array of stat objects
    const farmingStats = [
        { label: "Water Saved (Drip)", value: "60%", icon: "💧" },
        { label: "Yield Increase", value: "30%", icon: "🌾" },
        { label: "Pesticide Reduction", value: "70%", icon: "🐞" },
        { label: "CO₂ Sequestration", value: "+45%", icon: "🌍" }
    ];

    function renderStats(statsArray) {
        if (!statsContainer) return;
        statsContainer.innerHTML = statsArray.map(stat => `
            <div class="stat-item">
                <div class="stat-icon">${stat.icon}</div>
                <div class="stat-number">${stat.value}</div>
                <div class="stat-label">${stat.label}</div>
            </div>
        `).join('');
    }

    // Load from localStorage or use default
    const savedStats = localStorage.getItem('agritechStats');
    const statsNote = document.getElementById('statsNote');
    if (savedStats) {
        renderStats(JSON.parse(savedStats));
        if (statsNote) statsNote.innerHTML = "📀 Loaded from your saved preferences.";
    } else {
        renderStats(farmingStats);
    }

    const updateBtn = document.getElementById('updateStatsBtn');
    if (updateBtn) {
        updateBtn.addEventListener('click', () => {
            const newStats = [
                { label: "Efficiency Gain", value: "55%", icon: "⚙️" },
                { label: "Water Reduction", value: "75%", icon: "💧" },
                { label: "Soil Health", value: "+40%", icon: "🌱" },
                { label: "Profit Boost", value: "25%", icon: "📈" }
            ];
            renderStats(newStats);
            localStorage.setItem('agritechStats', JSON.stringify(newStats));
            if (statsNote) statsNote.innerHTML = "✅ New statistics saved to localStorage!";
        });
    }

    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            window.location.href = 'crops.html';
        });
    }
}

// ========== CROP RECOMMENDATION (Conditional branching + arrays) ==========
function initCropTool() {
    const regionSelect = document.getElementById('regionSelect');
    const getBtn = document.getElementById('getCropBtn');
    const resultDiv = document.getElementById('cropResult');
    if (!getBtn || !regionSelect) return;

    const cropDatabase = {
        dry: ["Sorghum", "Millet", "Cowpeas", "Cactus Pear", "Drought-Tolerant Maize"],
        temperate: ["Wheat", "Barley", "Apples", "Lentils", "Oats"],
        tropical: ["Maize", "Cassava", "Plantains", "Rice", "Yams"]
    };

    getBtn.addEventListener('click', () => {
        const region = regionSelect.value;
        const crops = cropDatabase[region] || ["Fallow", "Cover crops"];
        resultDiv.innerHTML = `<strong>🌱 Recommended crops for ${region.toUpperCase()} region:</strong><br> ${crops.join(" • ")}`;
        // Save last recommendation to localStorage (array method)
        localStorage.setItem('lastCropAdvice', JSON.stringify({ region, crops, timestamp: new Date().toLocaleString() }));
    });

    // load previous
    const savedCrop = localStorage.getItem('lastCropAdvice');
    if (savedCrop && resultDiv) {
        const data = JSON.parse(savedCrop);
        resultDiv.innerHTML = `<strong>🔄 Last saved advice (${data.timestamp}):</strong><br> Region: ${data.region} → ${data.crops.join(" • ")}`;
    }
}

// ========== LIVESTOCK FEED CALCULATOR (Objects, array methods, localStorage) ==========
function initLivestockCalc() {
    const calcBtn = document.getElementById('calcFeedBtn');
    if (!calcBtn) return;
    const cattleInput = document.getElementById('cattleCount');
    const goatInput = document.getElementById('goatCount');
    const resultDiv = document.getElementById('feedResult');

    // object for feed requirements
    const feedRates = {
        cattle: 12, // kg per day
        goat: 2.5
    };

    function calculateFeed(cattle, goats) {
        const total = (cattle * feedRates.cattle) + (goats * feedRates.goat);
        return { cattle, goats, total: total.toFixed(1) };
    }

    calcBtn.addEventListener('click', () => {
        let cattle = parseInt(cattleInput.value) || 0;
        let goats = parseInt(goatInput.value) || 0;
        if (cattle < 0) cattle = 0;
        if (goats < 0) goats = 0;
        const feedObj = calculateFeed(cattle, goats);
        resultDiv.innerHTML = `🐮 ${feedObj.cattle} cattle + 🐐 ${feedObj.goats} goats → <strong>Total daily feed: ${feedObj.total} kg</strong>`;
    });

    const saveBtn = document.getElementById('saveFeedDataBtn');
    const loadBtn = document.getElementById('loadFeedDataBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const data = { cattle: cattleInput.value, goats: goatInput.value, savedAt: new Date().toISOString() };
            localStorage.setItem('livestockFeedData', JSON.stringify(data));
            resultDiv.innerHTML += `<br>✅ Data saved to localStorage.`;
        });
    }
    if (loadBtn) {
        loadBtn.addEventListener('click', () => {
            const saved = localStorage.getItem('livestockFeedData');
            if (saved) {
                const { cattle, goats } = JSON.parse(saved);
                cattleInput.value = cattle;
                goatInput.value = goats;
                resultDiv.innerHTML = `📀 Loaded: Cattle=${cattle}, Goats=${goats}. Click calculate again.`;
            } else {
                resultDiv.innerHTML = `No saved data found.`;
            }
        });
    }
}

// ========== WATER SAVINGS ESTIMATOR (conditional + template literals) ==========
function initWaterTool() {
    const calcBtn = document.getElementById('calcWaterBtn');
    if (!calcBtn) return;
    const fieldInput = document.getElementById('fieldSize');
    const resultDiv = document.getElementById('waterResult');
    calcBtn.addEventListener('click', () => {
        let acres = parseFloat(fieldInput.value);
        if (isNaN(acres) || acres <= 0) acres = 1;
        const traditionalWater = acres * 45000;  // gallons per acre per season approx
        const dripWater = acres * 18000;
        const saved = traditionalWater - dripWater;
        const percentSaved = ((saved / traditionalWater) * 100).toFixed(0);
        resultDiv.innerHTML = `<strong>💧 Water Savings Analysis</strong><br>
        🌾 Traditional flood irrigation: ${traditionalWater.toLocaleString()} gallons<br>
        💧 Drip irrigation: ${dripWater.toLocaleString()} gallons<br>
        ✅ You save <strong>${saved.toLocaleString()} gallons</strong> per season! (${percentSaved}% less water)`;
    });
}

// ========== CONTACT FORM with localStorage, DOM events ==========
function initContactForm() {
    const form = document.getElementById('consultForm');
    if (!form) return;
    const feedbackDiv = document.getElementById('formFeedback');
    const showBtn = document.getElementById('showSubmissionsBtn');
    const submissionsDiv = document.getElementById('submissionsList');

    // Load existing submissions from localStorage (array)
    let submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const farmType = document.getElementById('farmType').value;
        const message = document.getElementById('message').value;
        if (!name || !email) {
            feedbackDiv.innerHTML = "❌ Please fill name and email.";
            return;
        }
        const newSubmission = { name, email, farmType, message, date: new Date().toLocaleString() };
        submissions.push(newSubmission);
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
        feedbackDiv.innerHTML = `✅ Thank you ${name}! Your consultation request has been saved.`;
        form.reset();
    });

    if (showBtn && submissionsDiv) {
        showBtn.addEventListener('click', () => {
            if (submissions.length === 0) {
                submissionsDiv.innerHTML = "No saved inquiries yet. Submit a form first!";
                return;
            }
            submissionsDiv.innerHTML = submissions.map(sub => `
                <div style="border-bottom:1px solid #ccc; margin-bottom:10px; padding-bottom:8px;">
                    <strong>${sub.name}</strong> (${sub.email}) - ${sub.farmType}<br>
                    📝 ${sub.message.substring(0, 100)}${sub.message.length > 100 ? '...' : ''}<br>
                    <small>📅 ${sub.date}</small>
                </div>
            `).join('');
        });
    }
}

// ========== INITIALIZE ALL ==========
document.addEventListener('DOMContentLoaded', () => {
    initFooter();        // Sets year, lastModified, visit counter
    initMobileMenu();    // Mobile navigation
    initHomeStats();     // Homepage stats with localStorage
    initCropTool();      // Crop recommendation tool
    initLivestockCalc(); // Livestock feed calculator
    initWaterTool();     // Water savings estimator
    initContactForm();   // Contact form handling
});