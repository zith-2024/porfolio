// Watch data
const watches = [
    {
        id: 1,
        name: 'Royal Oak Chronograph',
        brand: 'Audemars Piguet',
        price: '$42,500',
        image: 'https://images.unsplash.com/photo-1726981407933-06fe96c4cefa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMGdvbGR8ZW58MXx8fHwxNzYzMjE5MDM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        category: 'Dress',
        isNew: true,
    },
    {
        id: 2,
        name: 'Seamaster Diver 300M',
        brand: 'Omega',
        price: '$8,900',
        image: 'https://images.unsplash.com/photo-1762513461072-5008c7f6511d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjaHJvbm9ncmFwaCUyMHdhdGNofGVufDF8fHx8MTc2MzI2OTIyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        category: 'Sports',
        isNew: false,
    },
    {
        id: 3,
        name: 'Datejust 41',
        brand: 'Rolex',
        price: '$13,150',
        image: 'https://images.unsplash.com/photo-1636639818651-d97365346a5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWx2ZXIlMjBsdXh1cnklMjB3YXRjaHxlbnwxfHx8fDE3NjMyNjkyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        category: 'Classic',
        isNew: true,
    },
    {
        id: 4,
        name: 'Portugieser Chronograph',
        brand: 'IWC',
        price: '$15,400',
        image: 'https://images.unsplash.com/photo-1704961211864-b20364cade61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd3Jpc3R3YXRjaHxlbnwxfHx8fDE3NjMyMDY4NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        category: 'Dress',
        isNew: false,
    },
    {
        id: 5,
        name: 'Nautilus 5711',
        brand: 'Patek Philippe',
        price: '$89,900',
        image: 'https://images.unsplash.com/photo-1760532466974-f969f56dfcc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwdGltZXBpZWNlfGVufDF8fHx8MTc2MzIwNTMzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        category: 'Sports',
        isNew: true,
    },
    {
        id: 6,
        name: 'Speedmaster Professional',
        brand: 'Omega',
        price: '$6,800',
        image: 'https://images.unsplash.com/photo-1633451238042-85d93d267866?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwd2F0Y2h8ZW58MXx8fHwxNzYzMTg2OTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        category: 'Chronograph',
        isNew: false,
    },
];

const categories = ['ONLY LUXURY COLLECTION'];
const brands = ['All Brands', 'Rolex', 'Omega', 'Patek Philippe', 'Audemars Piguet', 'IWC'];

// State
let selectedCategory = 'All';
let selectedBrand = 'All Brands';
let searchQuery = '';
let favorites = new Set();

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');
const searchInput = document.getElementById('searchInput');
const categoryButtons = document.getElementById('categoryButtons');
const brandBadges = document.getElementById('brandBadges');
const watchContainer = document.getElementById('watchContainer');
const watchCount = document.getElementById('watchCount');
const emptyState = document.getElementById('emptyState');

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
});

// Search functionality
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    filterWatches();
});

// Initialize category buttons
function initCategories() {
    categoryButtons.innerHTML = '';
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = `btn btn-outline ${selectedCategory === category ? 'active' : ''}`;
        btn.textContent = category;
        btn.addEventListener('click', () => {
            selectedCategory = category;
            initCategories();
            filterWatches();
        });
        categoryButtons.appendChild(btn);
    });
}

// Initialize brand badges
function initBrands() {
    brandBadges.innerHTML = '';
    brands.forEach(brand => {
        const badge = document.createElement('span');
        badge.className = `brand-badge ${selectedBrand === brand ? 'active' : ''}`;
        badge.textContent = brand;
        badge.addEventListener('click', () => {
            selectedBrand = brand;
            initBrands();
            filterWatches();
        });
        brandBadges.appendChild(badge);
    });
}

// Create watch card
function createWatchCard(watch) {
    const card = document.createElement('div');
    card.className = 'watch-card';
    
    const isFavorite = favorites.has(watch.id);
    
    card.innerHTML = `
        <div class="watch-image-wrapper">
            <img src="${watch.image}" alt="${watch.brand} ${watch.name}" class="watch-image">
            ${watch.isNew ? '<span class="new-badge">NEW</span>' : ''}
            <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${watch.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="${isFavorite ? '#ef4444' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </button>
        </div>
        <div class="watch-info">
            <div class="watch-brand">${watch.brand}</div>
            <div class="watch-name">${watch.name}</div>
            <div class="watch-footer">
                <span class="watch-price">${watch.price}</span>
                <span class="watch-category">${watch.category}</span>
            </div>
        </div>
    `;
    
    // Add favorite button event listener
    const favoriteBtn = card.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(watch.id);
    });
    
    return card;
}

// Toggle favorite
function toggleFavorite(watchId) {
    if (favorites.has(watchId)) {
        favorites.delete(watchId);
    } else {
        favorites.add(watchId);
    }
    filterWatches();
}

// Filter watches
function filterWatches() {
    const filteredWatches = watches.filter(watch => {
        const matchesCategory = selectedCategory === 'All' || watch.category === selectedCategory;
        const matchesBrand = selectedBrand === 'All Brands' || watch.brand === selectedBrand;
        const matchesSearch = searchQuery === '' ||
            watch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            watch.brand.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesBrand && matchesSearch;
    });
    
    renderWatches(filteredWatches);
}

// Render watches
function renderWatches(watchesToRender) {
    watchContainer.innerHTML = '';
    
    if (watchesToRender.length === 0) {
        watchContainer.classList.add('hidden');
        emptyState.classList.remove('hidden');
        watchCount.textContent = '0 watches available';
    } else {
        watchContainer.classList.remove('hidden');
        emptyState.classList.add('hidden');
        
        watchesToRender.forEach(watch => {
            const card = createWatchCard(watch);
            watchContainer.appendChild(card);
        });
        
        const countText = watchesToRender.length === 1 ? 'watch' : 'watches';
        watchCount.textContent = `${watchesToRender.length} ${countText} available`;
    }
}

// Initialize the page
function init() {
    initCategories();
    initBrands();
    filterWatches();
}

// Run initialization when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
