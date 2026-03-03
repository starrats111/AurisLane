// ============================================
// AurisLane - Main JavaScript
// ============================================

// Global variables - articles loaded from JSON
let articles = [];

async function loadArticles() {
    try {
        const response = await fetch('articles.json');
        articles = await response.json();
    } catch (e) {
        console.error('Failed to load articles:', e);
    }
    initializePage();
}

let currentPage = 1;
let articlesPerPage = 6;
let currentCategory = 'all';
let searchQuery = '';

// Generate URL-friendly slug from title/name
function generateSlug(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')      // Replace spaces with hyphens
        .replace(/-+/g, '-')       // Replace multiple hyphens with single hyphen
        .trim();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadArticles();
});

// Initialize header search functionality
function initializeHeaderSearch() {
    const headerSearchInput = document.getElementById('headerSearchInput');
    const headerSearchBtn = document.querySelector('.header-search-btn');
    
    if (headerSearchInput && headerSearchBtn) {
        // Handle search button click
        headerSearchBtn.addEventListener('click', function() {
            performHeaderSearch();
        });
        
        // Handle Enter key press
        headerSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performHeaderSearch();
            }
        });
    }
}

// Perform search from header
function performHeaderSearch() {
    const headerSearchInput = document.getElementById('headerSearchInput');
    if (!headerSearchInput) return;
    
    const query = headerSearchInput.value.trim();
    if (query) {
        // Navigate to articles page with search query
        window.location.href = `articles.html?search=${encodeURIComponent(query)}`;
    } else {
        // If empty, just go to articles page
        window.location.href = 'articles.html';
    }
}

// Initialize page based on current page
function initializePage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    
    // Initialize header search functionality
    initializeHeaderSearch();
    
    if (filename === 'index.html' || filename === '') {
        loadFeaturedArticles();
    } else if (filename === 'articles.html') {
        initializeArticlesPage();
    } else if (filename === 'article-detail.html') {
        loadArticleDetail();
    } else if (filename === 'contact.html') {
        initializeContactForm();
    }
    
    initializeMobileMenu();
    initializeSocialShare();
}

// ============================================
// Home Page - Featured Articles
// ============================================
function loadFeaturedArticles() {
    const featuredContainer = document.getElementById('featuredArticles');
    if (!featuredContainer) return;
    
    // Show first 3 articles
    const featured = articles.slice(0, 3);
    
    featuredContainer.innerHTML = featured.map(article => `
        <div class="article-card" onclick="window.location.href='article-detail.html?id=${generateSlug(article.title)}'">
            <img src="${article.image}" alt="${article.title}" class="article-card-image">
            <div class="article-card-content">
                <span class="article-card-category">${article.categoryName}</span>
                <h3 class="article-card-title">${article.title}</h3>
                <p class="article-card-excerpt">${article.excerpt}</p>
                <div class="article-card-meta">
                    <span>${article.author}</span>
                    <span>${formatDate(article.date)}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================
// Articles Page
// ============================================
function initializeArticlesPage() {
    // Check for category in URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
        currentCategory = category;
        const filterBtn = document.querySelector(`[data-category="${category}"]`);
        if (filterBtn) {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            filterBtn.classList.add('active');
        }
    }
    
    // Check for search query in URL (from header search)
    const searchQueryParam = urlParams.get('search');
    if (searchQueryParam) {
        searchQuery = searchQueryParam.toLowerCase();
        // Set the search input value if it exists
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = searchQueryParam;
        }
    }
    
    // Initialize search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Initialize category filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            currentPage = 1;
            displayArticles();
        });
    });
    
    displayArticles();
}

function handleSearch(e) {
    searchQuery = e.target.value.toLowerCase();
    currentPage = 1;
    displayArticles();
}

function displayArticles() {
    const articlesGrid = document.getElementById('articlesGrid');
    const pagination = document.getElementById('pagination');
    if (!articlesGrid) return;
    
    // Filter articles
    let filteredArticles = articles.filter(article => {
        const matchesCategory = currentCategory === 'all' || article.category === currentCategory;
        const matchesSearch = !searchQuery || 
            article.title.toLowerCase().includes(searchQuery) ||
            article.excerpt.toLowerCase().includes(searchQuery) ||
            article.content.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });
    
    // Calculate pagination
    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex);
    
    // Display articles
    if (paginatedArticles.length === 0) {
        articlesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--color-text-light);">No articles found. Try adjusting your filters.</p>';
    } else {
        articlesGrid.innerHTML = paginatedArticles.map(article => `
            <div class="article-card" onclick="window.location.href='article-detail.html?id=${generateSlug(article.title)}'">
                <img src="${article.image}" alt="${article.title}" class="article-card-image">
                <div class="article-card-content">
                    <span class="article-card-category">${article.categoryName}</span>
                    <h3 class="article-card-title">${article.title}</h3>
                    <p class="article-card-excerpt">${article.excerpt}</p>
                    <div class="article-card-meta">
                        <span>${article.author}</span>
                        <span>${formatDate(article.date)}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Display pagination
    if (pagination && totalPages > 1) {
        let paginationHTML = '';
        
        // Previous button
        paginationHTML += `<button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">Previous</button>`;
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                paginationHTML += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                paginationHTML += `<span class="pagination-btn" style="cursor: default; border: none; background: transparent;">...</span>`;
            }
        }
        
        // Next button
        paginationHTML += `<button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">Next</button>`;
        
        pagination.innerHTML = paginationHTML;
    } else if (pagination) {
        pagination.innerHTML = '';
    }
}

function changePage(page) {
    currentPage = page;
    displayArticles();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// Article Detail Page
// ============================================
function loadArticleDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleSlug = urlParams.get('id');
    
    const article = articles.find(a => generateSlug(a.title) === articleSlug);
    if (!article) {
        document.body.innerHTML = '<div style="padding: 60px 20px; text-align: center;"><h1>Article not found</h1><a href="articles.html">Back to Articles</a></div>';
        return;
    }
    
    // Load article header
    const articleHeader = document.getElementById('articleHeader');
    if (articleHeader) {
        articleHeader.innerHTML = `
            <img src="${article.image}" alt="${article.title}" class="article-header-image">
            <div class="article-header-content">
                <span class="article-header-category">${article.categoryName}</span>
                <h1 class="article-header-title">${article.title}</h1>
                <div class="article-header-meta">
                    <span id="articleAuthor">By ${article.author}</span> • 
                    <span id="articleDate">${formatDate(article.date)}</span>
                </div>
            </div>
        `;
    }
    
    // Load article content
    const articleContent = document.getElementById('articleContent');
    if (articleContent) {
        articleContent.innerHTML = article.content;
    }
    
    // Load related articles
    loadRelatedArticles(article);
}

function loadRelatedArticles(currentArticle) {
    const relatedContainer = document.getElementById('relatedArticles');
    if (!relatedContainer) return;
    
    const related = articles
        .filter(a => a.id !== currentArticle.id && a.category === currentArticle.category)
        .slice(0, 3);
    
    if (related.length === 0) {
        relatedContainer.parentElement.style.display = 'none';
        return;
    }
    
    relatedContainer.innerHTML = related.map(article => `
        <div class="article-card" onclick="window.location.href='article-detail.html?id=${generateSlug(article.title)}'">
            <img src="${article.image}" alt="${article.title}" class="article-card-image">
            <div class="article-card-content">
                <span class="article-card-category">${article.categoryName}</span>
                <h3 class="article-card-title">${article.title}</h3>
                <p class="article-card-excerpt">${article.excerpt}</p>
                <div class="article-card-meta">
                    <span>${article.author}</span>
                    <span>${formatDate(article.date)}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================
// Contact Form
// ============================================
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Show success message (in a real app, this would send to a server)
            alert('Thank you for your message! We\'ll get back to you soon.');
            form.reset();
        });
    }
}

// ============================================
// Social Share
// ============================================
function initializeSocialShare() {
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.dataset.platform;
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            let shareUrl = '';
            switch(platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'pinterest':
                    shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${title}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

// ============================================
// Mobile Menu
// ============================================
function initializeMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (toggle && nav) {
        toggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }
}

// ============================================
// Utility Functions
// ============================================
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function getCategoryName(category) {
    const categoryMap = {
        'fashion': 'Fashion & Accessories',
        'health': 'Health & Beauty',
        'home': 'Home & Garden',
        'travel': 'Travel & Accommodation',
        'finance': 'Finance & Insurance',
        'food': 'Food & Beverage'
    };
    return categoryMap[category] || category;
}

// Add smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all article and product cards
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        document.querySelectorAll('.article-card, .category-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }, 100);
});

