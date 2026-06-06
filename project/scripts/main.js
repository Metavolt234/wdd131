// Product Array - Data source for product options
const products = [
    { id: "book-001", name: "The Midnight Library - Hardcover Edition" },
    { id: "book-002", name: "Atomic Habits - Paperback" },
    { id: "book-003", name: "Project Hail Mary - Audiobook" },
    { id: "book-004", name: "The Seven Husbands of Evelyn Hugo - Kindle Edition" },
    { id: "book-005", name: "Dune: The Graphic Novel - Collector's Edition" },
    { id: "book-006", name: "The Psychology of Money - Hardback" },
    { id: "book-007", name: "Where the Crawdads Sing - Movie Tie-in" },
    { id: "book-008", name: "The Silent Patient - Premium Edition" },
    { id: "book-009", name: "Educated: A Memoir - Anniversary Edition" },
    { id: "book-010", name: "Becoming by Michelle Obama - Signed Copy" }
];

// Initialize form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Populate product select options
    populateProductOptions();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize rating stars interaction
    initRatingStars();
    
    // Handle review confirmation page
    if (window.location.pathname.includes('review.html')) {
        displayReviewSummary();
        updateReviewCounter();
    }
});

// Populate product select options dynamically
function populateProductOptions() {
    const productSelect = document.getElementById('product-name');
    if (!productSelect) return;
    
    // Clear existing options (keep the placeholder)
    while (productSelect.options.length > 1) {
        productSelect.remove(1);
    }
    
    // Add product options from array
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });
}

// Initialize form validation
function initFormValidation() {
    const form = document.querySelector('.review-form');
    if (!form) return;
    
    const productSelect = document.getElementById('product-name');
    const ratingRadios = document.querySelectorAll('input[name="rating"]');
    const dateInput = document.getElementById('installation-date');
    
    // Real-time validation
    if (productSelect) {
        productSelect.addEventListener('change', function() {
            validateField(this);
        });
    }
    
    if (ratingRadios.length > 0) {
        ratingRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                validateRating();
            });
        });
    }
    
    if (dateInput) {
        dateInput.addEventListener('change', function() {
            validateField(this);
        });
    }
    
    // Form submission validation
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        // Validate product
        if (!validateField(productSelect)) isValid = false;
        
        // Validate rating
        if (!validateRating()) isValid = false;
        
        // Validate date
        if (!validateField(dateInput)) isValid = false;
        
        if (!isValid) {
            e.preventDefault();
            showFormErrors();
        }
    });
}

// Validate individual field
function validateField(field) {
    if (!field) return true;
    
    const formGroup = field.closest('.form-group');
    let isValid = true;
    
    if (field.hasAttribute('required')) {
        if (field.type === 'select-one') {
            isValid = field.value !== '';
        } else {
            isValid = field.value.trim() !== '';
        }
    }
    
    if (field.id === 'installation-date' && field.value) {
        const selectedDate = new Date(field.value);
        const today = new Date();
        if (selectedDate > today) {
            isValid = false;
            if (formGroup) {
                formGroup.classList.add('error');
                const errorMsg = formGroup.querySelector('.error-message');
                if (errorMsg) errorMsg.textContent = 'Installation date cannot be in the future';
            }
        }
    }
    
    if (formGroup) {
        if (isValid) {
            formGroup.classList.remove('error');
        } else {
            formGroup.classList.add('error');
        }
    }
    
    return isValid;
}

// Validate rating selection
function validateRating() {
    const ratingRadios = document.querySelectorAll('input[name="rating"]');
    const ratingGroup = document.querySelector('.form-group:has(.rating-container)');
    const isChecked = Array.from(ratingRadios).some(radio => radio.checked);
    
    if (ratingGroup) {
        if (isChecked) {
            ratingGroup.classList.remove('error');
        } else {
            ratingGroup.classList.add('error');
        }
    }
    
    return isChecked;
}

// Show form errors
function showFormErrors() {
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const requiredField = group.querySelector('[required]');
        if (requiredField && !requiredField.value) {
            group.classList.add('error');
        }
    });
}

// Initialize rating stars interaction
function initRatingStars() {
    const ratingOptions = document.querySelectorAll('.rating-option');
    
    ratingOptions.forEach(option => {
        const radio = option.querySelector('input[type="radio"]');
        
        option.addEventListener('mouseenter', function() {
            if (!radio.checked) {
                this.style.transform = 'translateY(-3px)';
                this.style.borderColor = '#667eea';
            }
        });
        
        option.addEventListener('mouseleave', function() {
            if (!radio.checked) {
                this.style.transform = 'translateY(0)';
                this.style.borderColor = '#e9ecef';
            }
        });
        
        if (radio) {
            radio.addEventListener('change', function() {
                // Remove highlight from all options
                ratingOptions.forEach(opt => {
                    opt.style.borderColor = '#e9ecef';
                });
                // Highlight selected option
                if (this.checked) {
                    option.style.borderColor = '#f39c12';
                }
            });
        }
    });
}

// Initialize mobile menu
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
}

// Display review summary on confirmation page
function displayReviewSummary() {
    const urlParams = new URLSearchParams(window.location.search);
    const summaryContainer = document.getElementById('summary-content');
    
    if (!summaryContainer) return;
    
    const productId = urlParams.get('productName');
    const product = products.find(p => p.id === productId);
    const rating = urlParams.get('rating');
    const installationDate = urlParams.get('installationDate');
    const features = urlParams.getAll('features');
    const review = urlParams.get('review');
    const userName = urlParams.get('userName') || 'Anonymous';
    
    // Get rating text
    const ratingText = getRatingText(rating);
    
    let summaryHTML = `
        <div class="summary-item">
            <strong>Product:</strong> ${product ? product.name : 'Not specified'}
        </div>
        <div class="summary-item">
            <strong>Rating:</strong> ${ratingText || 'Not specified'}
        </div>
        <div class="summary-item">
            <strong>Installation Date:</strong> ${installationDate || 'Not specified'}
        </div>
        <div class="summary-item">
            <strong>Useful Features:</strong>
            ${features.length > 0 ? 
                `<ul class="features-list">${features.map(f => `<li>${formatFeatureName(f)}</li>`).join('')}</ul>` : 
                'None selected'}
        </div>
        <div class="summary-item">
            <strong>Review:</strong> ${review ? review.substring(0, 200) : 'No review provided'}
            ${review && review.length > 200 ? '...' : ''}
        </div>
        <div class="summary-item">
            <strong>Reviewed by:</strong> ${escapeHtml(userName)}
        </div>
    `;
    
    summaryContainer.innerHTML = summaryHTML;
}

// Get rating text based on value
function getRatingText(rating) {
    const ratings = {
        '1': '★☆☆☆☆ - Poor',
        '2': '★★☆☆☆ - Fair',
        '3': '★★★☆☆ - Good',
        '4': '★★★★☆ - Very Good',
        '5': '★★★★★ - Excellent'
    };
    return ratings[rating] || null;
}

// Format feature name for display
function formatFeatureName(feature) {
    const features = {
        'ease-of-use': 'Ease of Use',
        'performance': 'Performance',
        'design': 'Design & Appearance',
        'customer-support': 'Customer Support',
        'value-for-money': 'Value for Money',
        'documentation': 'Documentation'
    };
    return features[feature] || feature;
}

// Update review counter in localStorage
function updateReviewCounter() {
    let reviewCount = localStorage.getItem('reviewCounter');
    
    if (reviewCount === null) {
        reviewCount = 1;
    } else {
        reviewCount = parseInt(reviewCount) + 1;
    }
    
    localStorage.setItem('reviewCounter', reviewCount);
    
    // Display the counter
    const counterElement = document.getElementById('review-counter');
    if (counterElement) {
        counterElement.textContent = reviewCount;
        // Add animation
        counterElement.style.animation = 'scaleIn 0.5s ease';
        setTimeout(() => {
            counterElement.style.animation = '';
        }, 500);
    }
}

// Escape HTML to prevent XSS
function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Clear form functionality
const resetButton = document.querySelector('.btn-reset');
if (resetButton) {
    resetButton.addEventListener('click', function() {
        setTimeout(() => {
            const formGroups = document.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.classList.remove('error');
            });
        }, 100);
    });
}

// Add character counter for textarea
const textarea = document.getElementById('written-review');
if (textarea) {
    const counterHint = document.createElement('span');
    counterHint.className = 'field-hint';
    counterHint.style.textAlign = 'right';
    counterHint.style.display = 'block';
    counterHint.style.marginTop = '0.5rem';
    
    function updateCharCount() {
        const length = textarea.value.length;
        counterHint.textContent = `${length} characters${length < 10 ? ' (Minimum 10 recommended)' : ''}`;
        if (length > 0 && length < 10) {
            counterHint.style.color = '#e74c3c';
        } else {
            counterHint.style.color = '#7f8c8d';
        }
    }
    
    textarea.parentNode.appendChild(counterHint);
    textarea.addEventListener('input', updateCharCount);
    updateCharCount();
}

console.log('Product review form initialized successfully!');