// Sample product data
const products = [
    {
        name: "Lavender Essential Oil",
        vendor: "Nature's Essence",
        stock: 145,
        category: "Oils",
        icon: "🌿",
        maxStock: 200
    },
    {
        name: "Turmeric Capsules",
        vendor: "Herbal Healing",
        stock: 23,
        category: "Supplements",
        icon: "💊",
        maxStock: 150
    },
    {
        name: "Organic Green Tea",
        vendor: "TeaLife Co.",
        stock: 89,
        category: "Herbs",
        icon: "🍵",
        maxStock: 120
    },
    {
        name: "Chamomile Flowers",
        vendor: "Nature's Essence",
        stock: 67,
        category: "Herbs",
        icon: "🌼",
        maxStock: 100
    },
    {
        name: "Vitamin D3",
        vendor: "HealthPlus",
        stock: 12,
        category: "Vitamins",
        icon: "☀️",
        maxStock: 80
    },
    {
        name: "Ginger Root Extract",
        vendor: "Herbal Healing",
        stock: 156,
        category: "Extracts",
        icon: "🫚",
        maxStock: 180
    },
    {
        name: "Echinacea Tincture",
        vendor: "Nature's Essence",
        stock: 34,
        category: "Tinctures",
        icon: "💧",
        maxStock: 60
    },
    {
        name: "Magnesium Complex",
        vendor: "HealthPlus",
        stock: 98,
        category: "Minerals",
        icon: "⚡",
        maxStock: 120
    },
    {
        name: "Ashwagandha Root",
        vendor: "Ayurvedic Wellness",
        stock: 45,
        category: "Herbs",
        icon: "🌱",
        maxStock: 80
    },
    {
        name: "Omega-3 Fish Oil",
        vendor: "Ocean Health",
        stock: 8,
        category: "Supplements",
        icon: "🐟",
        maxStock: 100
    },
    {
        name: "Spirulina Powder",
        vendor: "Green Wellness",
        stock: 112,
        category: "Superfoods",
        icon: "🥬",
        maxStock: 150
    },
    {
        name: "Probiotics Complex",
        vendor: "GutHealth Pro",
        stock: 67,
        category: "Supplements",
        icon: "🦠",
        maxStock: 90
    }
];

// Initialize the dashboard
function initDashboard() {
    renderProducts(products);
    setupSearch();
    createChart();
    animateStats();
}

// Render product cards
function renderProducts(productsToRender) {
    const grid = document.getElementById('inventory-grid');
    grid.innerHTML = '';

    productsToRender.forEach((product, index) => {
        const stockPercentage = (product.stock / product.maxStock) * 100;
        let stockStatus = 'high';
        if (stockPercentage < 20) stockStatus = 'low';
        else if (stockPercentage < 50) stockStatus = 'medium';

        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.animationDelay = `${index * 0.05}s`;
        card.innerHTML = `
            <div class="product-header">
                <span class="product-icon">${product.icon}</span>
                <span class="stock-badge ${stockStatus}">${stockStatus.toUpperCase()}</span>
            </div>
            <div class="product-name">${product.name}</div>
            <div class="product-vendor">📦 ${product.vendor}</div>
            <div class="product-details">
                <div class="product-stock">
                    <strong>${product.stock}</strong> / ${product.maxStock} units
                </div>
                <div class="product-category">${product.category}</div>
            </div>
        `;

        card.addEventListener('click', () => showProductDetails(product));
        grid.appendChild(card);
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.vendor.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );
        renderProducts(filtered);
    });
}

// Animate stats counters
function animateStats() {
    animateCounter('total-products', products.length, 1000);
    const lowStock = products.filter(p => (p.stock / p.maxStock) < 0.2).length;
    animateCounter('low-stock', lowStock, 1000);
    const vendors = [...new Set(products.map(p => p.vendor))].length;
    animateCounter('vendors', vendors, 1000);
}

function animateCounter(elementId, target, duration) {
    const element = document.getElementById(elementId);
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Create simple chart
function createChart() {
    const chartContainer = document.querySelector('.chart-container');
    const categories = ['Oils', 'Herbs', 'Supplements', 'Vitamins', 'Other'];

    categories.forEach((category, index) => {
        const count = products.filter(p => p.category === category).length;
        const maxCount = 5;
        const height = (count / maxCount) * 100;

        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.height = `${height}%`;
        bar.style.animationDelay = `${index * 0.1}s`;
        bar.title = `${category}: ${count} products`;
        chartContainer.appendChild(bar);
    });
}

// Show notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Action button handlers
function addProduct() {
    showNotification('✨ Opening add product form...');
    setTimeout(() => {
        showNotification('New product added successfully!');
    }, 1500);
}

function generateReport() {
    showNotification('📊 Generating inventory report...');
    setTimeout(() => {
        showNotification('Report generated! Check your downloads.');
    }, 2000);
}

function checkStock() {
    const lowStockItems = products.filter(p => (p.stock / p.maxStock) < 0.2);
    showNotification(`⚠️ Found ${lowStockItems.length} items with low stock!`);
}

function manageVendors() {
    const vendorCount = [...new Set(products.map(p => p.vendor))].length;
    showNotification(`🏢 Managing ${vendorCount} vendors...`);
}

function showProductDetails(product) {
    const stockPercentage = ((product.stock / product.maxStock) * 100).toFixed(1);
    showNotification(`${product.icon} ${product.name} - ${stockPercentage}% stock level`);
}

// Add some dynamic activity
function addRandomActivity() {
    const activities = [
        { icon: '✓', text: 'Product restocked', time: 'Just now' },
        { icon: '📦', text: 'New order received', time: 'Just now' },
        { icon: '🔄', text: 'Inventory updated', time: 'Just now' },
        { icon: '⚠', text: 'Low stock alert', time: 'Just now' }
    ];

    const activity = activities[Math.floor(Math.random() * activities.length)];
    const feed = document.getElementById('activity-feed');

    const item = document.createElement('div');
    item.className = 'activity-item';
    item.innerHTML = `
        <span class="activity-icon">${activity.icon}</span>
        <div class="activity-text">
            <p>${activity.text}</p>
            <small>${activity.time}</small>
        </div>
    `;

    feed.insertBefore(item, feed.firstChild);
    if (feed.children.length > 5) {
        feed.removeChild(feed.lastChild);
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initDashboard();

    // Add random activities every 10 seconds
    setInterval(addRandomActivity, 10000);

    // Welcome message
    setTimeout(() => {
        showNotification('👋 Welcome to Holistic Medical Supply Dashboard!');
    }, 500);
});
